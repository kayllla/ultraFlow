import { Artist, DJRecommendation, SetSlot, Day, UserPreferences, SpotifyArtist } from "@/types";
import { artistMap, getSetsForDay } from "@/data/lineup";
import { stageMap } from "@/data/stages";
import { mergeDjMediaIntoRecommendations } from "@/lib/dj-media-merge";

export {
  buildGenreProfile,
  buildTasteProfile,
  mergeTopArtistLists,
  reweightGenreProfileForFestivalDJs,
  resolveUltraGenreProfile,
} from "@/lib/taste-profile";

function normalizeText(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isDirectMatch(lineupArtist: Artist, spotifyArtists: SpotifyArtist[]): boolean {
  const normalized = normalizeText(lineupArtist.name);
  return spotifyArtists.some((sa) => {
    const saNorm = normalizeText(sa.name);
    return saNorm === normalized || saNorm.includes(normalized) || normalized.includes(saNorm);
  });
}

function genreOverlap(lineupTags: string[], userGenres: Record<string, number>): number {
  let score = 0;
  let maxWeight = 0;

  for (const tag of lineupTags) {
    const tagWords = tag.toLowerCase().split(/\s+/);
    for (const [genre, weight] of Object.entries(userGenres)) {
      const genreWords = genre.toLowerCase().split(/\s+/);
      for (const tw of tagWords) {
        for (const gw of genreWords) {
          if (tw === gw || tw.includes(gw) || gw.includes(tw)) {
            score += weight;
            maxWeight = Math.max(maxWeight, weight);
          }
        }
      }
    }
  }

  return Math.min(score, 70);
}

function recentlyPlayedBonus(
  lineupArtist: Artist,
  prefs: UserPreferences
): number {
  const normalized = normalizeText(lineupArtist.name);
  const recentIds = prefs.recentlyPlayed.flatMap((t) => t.artistIds || []);
  if (
    lineupArtist.spotifyArtistId &&
    recentIds.includes(lineupArtist.spotifyArtistId)
  ) {
    return 15;
  }
  const recentArtists = prefs.recentlyPlayed.map((t) =>
    normalizeText(t.artistName)
  );

  if (recentArtists.some((ra) => ra === normalized || ra.includes(normalized) || normalized.includes(ra))) {
    return 15;
  }

  return 0;
}

/** 阵容内 DJ 口碑 / 往届现场（lineup profile）；略偏「嗨」以贴合音乐节现场 */
function profileReputationBonus(artist: Artist): number {
  const p = artist.profile;
  if (!p) return 0;
  const mix = p.hyped * 0.58 + p.reputation * 0.42;
  return Math.round(Math.min(24, (mix / 100) * 24));
}

function topTrackArtistBonus(artist: Artist, prefs: UserPreferences): number {
  const ids = prefs.topTracks.flatMap((t) => t.artistIds || []);
  if (artist.spotifyArtistId && ids.includes(artist.spotifyArtistId)) {
    return 12;
  }
  const normalized = normalizeText(artist.name);
  return prefs.topTracks.some((t) => {
    const tn = normalizeText(t.artistName);
    return tn === normalized || tn.includes(normalized) || normalized.includes(tn);
  })
    ? 12
    : 0;
}

function followedArtistBonus(artist: Artist, prefs: UserPreferences): number {
  const id = artist.spotifyArtistId;
  if (!id || !prefs.followedArtists?.length) return 0;
  return prefs.followedArtists.some((a) => a.id === id) ? 12 : 0;
}

function savedLibraryBonus(artist: Artist, prefs: UserPreferences): number {
  const id = artist.spotifyArtistId;
  if (!id || !prefs.savedArtistCounts) return 0;
  const c = prefs.savedArtistCounts[id] || 0;
  if (c === 0) return 0;
  return Math.min(12, Math.round(4 + Math.log2(1 + c) * 3));
}

function playlistArtistBonus(artist: Artist, prefs: UserPreferences): number {
  const id = artist.spotifyArtistId;
  if (!id || !prefs.playlistArtistWeights) return 0;
  const w = prefs.playlistArtistWeights[id] || 0;
  if (w === 0) return 0;
  return Math.min(10, Math.round(2 + Math.log2(1 + w) * 2.5));
}

/** 0–1：阵容 DJ 的「现场能量」代理，无 profile 时用 genre 启发式 */
function djEnergyProxy(artist: Artist): number {
  if (artist.profile) return artist.profile.hyped / 100;
  const tags = artist.genreTags.join(" ").toLowerCase();
  if (
    tags.includes("big room") ||
    tags.includes("high energy") ||
    tags.includes("hardstyle") ||
    tags.includes("hard techno")
  ) {
    return 0.88;
  }
  if (tags.includes("downtempo") || tags.includes("chill")) return 0.45;
  return 0.65;
}

function audioAlignmentBonus(artist: Artist, prefs: UserPreferences): number {
  const ap = prefs.audioProfile;
  if (!ap) return 0;
  const djE = djEnergyProxy(artist);
  const align = 1 - Math.abs(ap.energy - djE);
  return Math.round(Math.max(0, align) * 8);
}

function nowPlayingBonus(artist: Artist, prefs: UserPreferences): number {
  const id = artist.spotifyArtistId;
  if (!id || prefs.currentlyPlayingArtistId == null) return 0;
  return prefs.currentlyPlayingArtistId === id ? 5 : 0;
}

function generateTags(artist: Artist, score: number, set: SetSlot): string[] {
  const tags: string[] = [];
  const tagsLower = artist.genreTags.map((t) => t.toLowerCase()).join(" ");

  if (score >= 90) tags.push("perfect match");

  if (tagsLower.includes("melodic") || tagsLower.includes("progressive")) {
    tags.push("melodic vibes");
  }
  if (tagsLower.includes("techno") && (tagsLower.includes("dark") || tagsLower.includes("industrial"))) {
    tags.push("dark groove");
  }
  if (tagsLower.includes("high energy") || tagsLower.includes("big room") || tagsLower.includes("hardstyle")) {
    tags.push("high energy");
  }
  if (tagsLower.includes("bass") || tagsLower.includes("dubstep")) {
    tags.push("bass heavy");
  }
  if (tagsLower.includes("trance")) {
    tags.push("trance");
  }
  if (tagsLower.includes("techno") && !tags.includes("dark groove")) {
    tags.push("techno");
  }

  const hour = parseInt(set.startTime.split(":")[0]);
  if (hour >= 22 || hour < 4) {
    tags.push("late-night fit");
  }

  return tags.slice(0, 3);
}

export function generateRecommendations(
  day: Day,
  prefs: UserPreferences
): DJRecommendation[] {
  const daySets = getSetsForDay(day);
  const recommendations: DJRecommendation[] = [];

  for (const set of daySets) {
    const artist = artistMap[set.artistId];
    if (!artist) continue;

    const stage = stageMap[set.stageId];
    if (!stage) continue;

    let score = 0;

    if (isDirectMatch(artist, prefs.topArtists)) {
      score = 100;
    }

    const genreScore = genreOverlap(artist.genreTags, prefs.genreProfile);
    score = Math.max(score, genreScore);

    score += recentlyPlayedBonus(artist, prefs);
    score += topTrackArtistBonus(artist, prefs);
    score += followedArtistBonus(artist, prefs);
    score += savedLibraryBonus(artist, prefs);
    score += playlistArtistBonus(artist, prefs);
    score += audioAlignmentBonus(artist, prefs);
    score += nowPlayingBonus(artist, prefs);

    if (score < 100) {
      score += profileReputationBonus(artist);
    }

    score = Math.min(score, 100);

    const tags = generateTags(artist, score, set);

    recommendations.push({
      artist,
      set,
      stage,
      score,
      tags,
      previewTrack: null,
    });
  }

  recommendations.sort((a, b) => b.score - a.score);

  return mergeDjMediaIntoRecommendations(recommendations);
}

export function generateDemoRecommendations(day: Day): DJRecommendation[] {
  const daySets = getSetsForDay(day);
  const recommendations: DJRecommendation[] = [];

  for (const set of daySets) {
    const artist = artistMap[set.artistId];
    if (!artist) continue;
    const stage = stageMap[set.stageId];
    if (!stage) continue;

    const p = artist.profile;
    const score = p
      ? Math.min(100, Math.round(p.hyped * 0.4 + p.reputation * 0.4 + Math.random() * 20))
      : Math.floor(Math.random() * 60) + 40;

    const tags = generateTags(artist, score, set);
    const reason = p?.vibe ?? "";

    recommendations.push({
      artist,
      set,
      stage,
      score,
      tags,
      reason,
      previewTrack: null,
    });
  }

  recommendations.sort((a, b) => b.score - a.score);
  return mergeDjMediaIntoRecommendations(recommendations);
}
