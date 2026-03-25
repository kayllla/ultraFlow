import OpenAI from "openai";
import { DJRecommendation, UserPreferences, Day } from "@/types";
import { artistMap, getSetsForDay } from "@/data/lineup";
import { stageMap } from "@/data/stages";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface LLMScore {
  score: number;
  reason: string;
  tags: string[];
}

interface CacheEntry {
  results: Record<string, LLMScore>;
  timestamp: number;
}

const llmCache = new Map<string, CacheEntry>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function buildCacheKey(day: Day, prefs: UserPreferences): string {
  const artistFingerprint = prefs.topArtists
    .slice(0, 10)
    .map((a) => a.id)
    .join(",");
  const trackFingerprint = prefs.topTracks
    .slice(0, 15)
    .map((t) => t.id)
    .join(",");
  const followFp =
    prefs.followedArtists?.slice(0, 15).map((a) => a.id).join(",") ?? "";
  const savedFp = prefs.savedArtistCounts
    ? Object.entries(prefs.savedArtistCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([k, v]) => `${k}:${v}`)
        .join("|")
    : "";
  const plFp = prefs.playlistArtistWeights
    ? Object.entries(prefs.playlistArtistWeights)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([k, v]) => `${k}:${v}`)
        .join("|")
    : "";
  const audioFp = prefs.audioProfile
    ? `e${prefs.audioProfile.energy.toFixed(2)}v${prefs.audioProfile.valence.toFixed(2)}t${prefs.audioProfile.tempo.toFixed(0)}`
    : "";
  const nowFp = prefs.currentlyPlayingArtistId ?? "";
  return `${day}:festdj-edm:${artistFingerprint}:${trackFingerprint}:${followFp}:${savedFp}:${plFp}:${audioFp}:${nowFp}`;
}

function resolveSpotifyArtistName(
  prefs: UserPreferences,
  artistId: string
): string | null {
  const fromTop = prefs.topArtists.find((a) => a.id === artistId);
  if (fromTop) return fromTop.name;
  const fromFollow = prefs.followedArtists?.find((a) => a.id === artistId);
  return fromFollow?.name ?? null;
}

function buildUserSummary(prefs: UserPreferences): string {
  const topGenres = Object.entries(prefs.genreProfile)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12)
    .map(([g, w]) => `${g}(${w})`)
    .join(", ");

  const topArtistNames = prefs.topArtists
    .slice(0, 15)
    .map((a) => a.name)
    .join(", ");

  const topTracksBlock = prefs.topTracks
    .slice(0, 20)
    .map((t) => `- "${t.name}" — ${t.artistName}`)
    .join("\n");

  const recentArtists = Array.from(new Set(prefs.recentlyPlayed.map((t) => t.artistName)))
    .slice(0, 10)
    .join(", ");

  const followBlock = prefs.followedArtists?.length
    ? prefs.followedArtists
        .slice(0, 15)
        .map((a) => a.name)
        .join(", ")
    : "(not available)";

  const savedTop = prefs.savedArtistCounts
    ? Object.entries(prefs.savedArtistCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([id, c]) => {
          const name = resolveSpotifyArtistName(prefs, id) || id;
          return `${name} (liked songs ×${c})`;
        })
        .join("; ")
    : "(not available)";

  const playlistTop = prefs.playlistArtistWeights
    ? Object.entries(prefs.playlistArtistWeights)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([id, w]) => {
          const name = resolveSpotifyArtistName(prefs, id) || id;
          return `${name} (playlist freq ${w})`;
        })
        .join("; ")
    : "(not available)";

  const audioLine = prefs.audioProfile
    ? `energy=${prefs.audioProfile.energy.toFixed(2)} danceability=${prefs.audioProfile.danceability.toFixed(2)} valence=${prefs.audioProfile.valence.toFixed(2)} tempo≈${prefs.audioProfile.tempo.toFixed(0)} BPM (from Top + Liked tracks audio features)`
    : "(not available)";

  let nowLine = "(not playing or unavailable)";
  if (prefs.currentlyPlayingArtistId) {
    const nm =
      resolveSpotifyArtistName(prefs, prefs.currentlyPlayingArtistId) ||
      prefs.currentlyPlayingArtistId;
    nowLine = `User is listening now (primary artist): ${nm}`;
  }

  return `## User Music Profile
**Top genres (PRIMARY: electronic subgenres from your listening + Top Tracks artists; blended with overall taste — NOT "all songs" equally):** ${topGenres}
**Top artists (medium & short term combined):** ${topArtistNames}
**Top tracks (songs you play most — use for taste alignment):**
${topTracksBlock || "(none)"}
**Recently played artists:** ${recentArtists}
**Followed on Spotify:** ${followBlock}
**Artists most saved in Liked Songs (approx.):** ${savedTop}
**Artists frequent in recent playlists (sample):** ${playlistTop}
**Listening profile (audio features mean):** ${audioLine}
**Now playing:** ${nowLine}

**Important:** Many listeners play both ballads and dance music. For this Ultra lineup, prioritize DJs who match **electronic / techno / house / UK garage / bass / melodic live** (e.g. Fred again..-style live electronic) — not singers who only match their ballad listening. Use Followed / Liked / playlist signals when they clearly indicate electronic taste.`;
}

function buildDJListForDay(day: Day): string {
  const daySets = getSetsForDay(day);
  const lines: string[] = [];

  for (const set of daySets) {
    const artist = artistMap[set.artistId];
    if (!artist) continue;
    const stage = stageMap[set.stageId];
    const p = artist.profile;

    const profileStr = p
      ? `| hyped:${p.hyped} | rep:${p.reputation} | vibe:"${p.vibe}" | context:"${(p.festivalContext || "").slice(0, 140)}"`
      : "";

    lines.push(
      `- ${artist.name} [${artist.genreTags.join(",")}] @ ${stage?.name ?? set.stageId} ${set.startTime}-${set.endTime} ${profileStr}`
    );
  }

  return lines.join("\n");
}

function assembleRecommendations(
  day: Day,
  results: Record<string, LLMScore>
): DJRecommendation[] {
  const daySets = getSetsForDay(day);
  const recommendations: DJRecommendation[] = [];

  for (const set of daySets) {
    const artist = artistMap[set.artistId];
    if (!artist) continue;
    const stage = stageMap[set.stageId];
    if (!stage) continue;

    const llmResult = results[artist.name];
    const score = llmResult?.score ?? 50;
    const reason = llmResult?.reason ?? "";
    const tags = llmResult?.tags ?? artist.genreTags.slice(0, 2);

    recommendations.push({
      artist,
      set,
      stage,
      score: Math.min(100, Math.max(0, score)),
      tags: tags.slice(0, 3),
      reason,
      previewTrack: null,
    });
  }

  recommendations.sort((a, b) => b.score - a.score);
  return recommendations;
}

export async function llmMatchRecommendations(
  day: Day,
  prefs: UserPreferences
): Promise<DJRecommendation[]> {
  const cacheKey = buildCacheKey(day, prefs);
  const cached = llmCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return assembleRecommendations(day, cached.results);
  }

  const userSummary = buildUserSummary(prefs);
  const djList = buildDJListForDay(day);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.5,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are UltraFlow, a festival DJ recommendation engine for Ultra Miami 2025.
Score each DJ for this specific user. You MUST use the user's top genres, top artists, AND their listed top tracks to judge taste fit — not generic festival hype alone.
Users often have mixed Spotify history (e.g. many ballads + electronic). For Ultra, **prioritize electronic / techno / house / UK garage / bass / melodic live DJ alignment** (including Fred again..-style live electronic). Do **not** highly recommend DJs who only match ballad or mandopop taste unless the DJ actually fits that niche.
This is a **high-energy festival / mainstage & club** context: favor DJs whose live sets are **electronic, driving, and crowd-energizing** when taste is ambiguous.
Dimensions:
1. Taste match (0-40): alignment with user's **electronic/dance subgenres** (from profile + tracks), not generic pop/ballad overlap
2. Hype potential (0-30): **high-energy live / festival impact** vs user's taste — big-room, peak-time, and hyped reputation should lift when fit is decent
3. Reputation & live quality (0-20): use each DJ's **hyped/rep/vibe/festivalContext** in the lineup — strong past Ultra/festival performances deserve higher scores when taste also fits
4. Schedule fit (0-10): time-of-day appropriateness
Final score = sum (0-100). Return valid JSON only.`,
      },
      {
        role: "user",
        content: `${userSummary}

## Day ${day} Lineup
${djList}

Return: { "results": { "<DJ name>": { "score": <0-100>, "reason": "<max 12 words, Chinese>", "tags": ["<tag1>", "<tag2>"] } } }
- reason: WHY this DJ fits this user, in 简体中文, vivid and personal
- tags: 2-3 from [melodic vibes, high energy, dark groove, perfect match, hidden gem, crowd favorite, late-night fit, bass heavy, trance, techno, chill vibes, underground, festival anthem]
- Be honest: differentiate clearly. Not every DJ is 70+.
- Direct artist match → taste_match near 40.
- If a DJ strongly matches the user's top tracks / genre profile, score high; if far from their listening taste, score low.
- Prefer DJs aligned with electronic/techno/house listening over ballad-only overlap.
- Use hyped/reputation/vibe/context fields in the lineup for "往届/现场口碑" when scores are close.
- Include ALL DJs.`,
      },
    ],
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No LLM response");

  const parsed = JSON.parse(content);
  const results: Record<string, LLMScore> = parsed.results || parsed;

  llmCache.set(cacheKey, { results, timestamp: Date.now() });

  return assembleRecommendations(day, results);
}
