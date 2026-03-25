import type { SpotifyArtist } from "@/types";

/** Spotify genre 关键词：与音乐节 DJ / 电子现场更相关（含 UK garage、melodic live 等） */
const ELECTRONIC_DJ_SUBSTRINGS = [
  "techno",
  "house",
  "edm",
  "electronic",
  "dance",
  "trance",
  "dubstep",
  "garage",
  "uk garage",
  "jungle",
  "bass",
  "breakbeat",
  "rave",
  "club",
  "progressive",
  "hardstyle",
  "electro",
  "idm",
  "drum and bass",
  "dnb",
  "future bass",
  "melodic techno",
  "deep house",
  "tech house",
  "stutter",
  "ambient",
  "hyperpop",
];

/** 抒情/流行慢歌等：在 Spotify 总收听里常见，但不应主导 Ultra 阵容匹配 */
const BALLAD_POP_SUBSTRINGS = [
  "ballad",
  "mandopop",
  "c-pop",
  "cantopop",
  "acoustic",
  "singer-songwriter",
  "soft rock",
  "easy listening",
  "piano",
  "sleep",
  "classical",
  "soundtrack",
  "mandarin",
  "cantonese",
  "heartbreak",
  "emo",
];

function festivalGenreMultiplier(spotifyGenreKey: string): number {
  const g = spotifyGenreKey.toLowerCase();
  for (const t of ELECTRONIC_DJ_SUBSTRINGS) {
    if (g.includes(t)) return 1.55;
  }
  for (const t of BALLAD_POP_SUBSTRINGS) {
    if (g.includes(t)) return 0.32;
  }
  return 0.9;
}

/**
 * 合并后的 Spotify genre 权重再按「音乐节 DJ」场景重标定：
 * 避免「听很多抒情歌」淹没 Techno / House / UK garage 等现场取向。
 */
export function reweightGenreProfileForFestivalDJs(
  profile: Record<string, number>
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [genre, w] of Object.entries(profile)) {
    out[genre] = w * festivalGenreMultiplier(genre);
  }
  return out;
}

/** 中长期 Top + 短期 Top + Top Tracks 批量艺人的 genre 合并为口味画像 */
export function buildTasteProfile(
  mediumTopArtists: SpotifyArtist[],
  shortTopArtists?: SpotifyArtist[],
  trackBatchArtists?: SpotifyArtist[]
): Record<string, number> {
  const profile: Record<string, number> = {};

  const addWeighted = (artists: SpotifyArtist[], listWeight: number) => {
    artists.forEach((artist, idx) => {
      const w = Math.max(1, 10 - Math.floor(idx / 5)) * listWeight;
      for (const genre of artist.genres) {
        profile[genre] = (profile[genre] || 0) + w;
      }
    });
  };

  addWeighted(mediumTopArtists, 1);
  if (shortTopArtists?.length) {
    addWeighted(shortTopArtists, 1.02);
  }
  if (trackBatchArtists?.length) {
    addWeighted(trackBatchArtists, 0.95);
  }

  return profile;
}

/** 仅 Top Artists（与旧版行为一致，用于回退或简单场景） */
export function buildGenreProfile(topArtists: SpotifyArtist[]): Record<string, number> {
  return buildTasteProfile(topArtists, undefined, undefined);
}

export function mergeTopArtistLists(
  medium: SpotifyArtist[],
  short: SpotifyArtist[]
): SpotifyArtist[] {
  const seen = new Set<string>();
  const out: SpotifyArtist[] = [];
  for (const a of medium) {
    if (!seen.has(a.id)) {
      seen.add(a.id);
      out.push(a);
    }
  }
  for (const a of short) {
    if (!seen.has(a.id)) {
      seen.add(a.id);
      out.push(a);
    }
  }
  return out;
}

export function isElectronicSpotifyGenre(genre: string): boolean {
  const g = genre.toLowerCase();
  return ELECTRONIC_DJ_SUBSTRINGS.some((t) => g.includes(t));
}

/** 用于 audio-features / 推荐：是否视为电音 DJ 相关艺人（Spotify genres） */
export function spotifyArtistIsElectronicDJ(artist: SpotifyArtist): boolean {
  return artist.genres.some((g) => isElectronicSpotifyGenre(g));
}

function profileWeightSum(profile: Record<string, number>): number {
  return Object.values(profile).reduce((a, b) => a + b, 0);
}

/**
 * 只累计 Spotify 艺人标签里「电子/舞曲」相关 genre —— 反映你听电音的类型，而不是全曲库。
 * Top Tracks 艺人权重最高，中长期 Top 最低（常被抒情/流行拉高）。
 */
export function buildElectronicOnlyTasteProfile(
  mediumTopArtists: SpotifyArtist[],
  shortTopArtists?: SpotifyArtist[],
  trackBatchArtists?: SpotifyArtist[]
): Record<string, number> {
  const profile: Record<string, number> = {};

  const addWeightedElectronic = (artists: SpotifyArtist[], listWeight: number) => {
    artists.forEach((artist, idx) => {
      const w = Math.max(1, 10 - Math.floor(idx / 5)) * listWeight;
      for (const genre of artist.genres) {
        if (!isElectronicSpotifyGenre(genre)) continue;
        profile[genre] = (profile[genre] || 0) + w;
      }
    });
  };

  addWeightedElectronic(mediumTopArtists, 0.42);
  if (shortTopArtists?.length) {
    addWeightedElectronic(shortTopArtists, 1.12);
  }
  if (trackBatchArtists?.length) {
    addWeightedElectronic(trackBatchArtists, 1.28);
  }

  return profile;
}

function mergeProfileBlend(
  a: Record<string, number>,
  b: Record<string, number>,
  weightA: number,
  weightB: number
): Record<string, number> {
  const keys = Array.from(
    new Set([...Object.keys(a), ...Object.keys(b)])
  );
  const out: Record<string, number> = {};
  for (const k of keys) {
    out[k] = (a[k] ?? 0) * weightA + (b[k] ?? 0) * weightB;
  }
  return out;
}

/**
 * Ultra 推荐用：以「只听电音子类型」为主；若 Spotify 里几乎抽不出电子标签则回退到全量 festival 重加权画像。
 */
export function resolveUltraGenreProfile(
  mediumTopArtists: SpotifyArtist[],
  shortTopArtists: SpotifyArtist[] | undefined,
  trackBatchArtists: SpotifyArtist[] | undefined
): Record<string, number> {
  const electronicOnly = buildElectronicOnlyTasteProfile(
    mediumTopArtists,
    shortTopArtists,
    trackBatchArtists
  );
  const fullReweighted = reweightGenreProfileForFestivalDJs(
    buildTasteProfile(mediumTopArtists, shortTopArtists, trackBatchArtists)
  );

  const eSum = profileWeightSum(electronicOnly);
  if (eSum < 4) {
    return fullReweighted;
  }

  /** 几乎只用 Spotify 电音子 genre，少量全量以防冷启动过窄 */
  return mergeProfileBlend(electronicOnly, fullReweighted, 0.96, 0.04);
}
