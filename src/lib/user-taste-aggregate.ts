import type { SpotifyTrack, UserAudioProfile } from "@/types";
import type { SpotifyAudioFeatures } from "@/lib/spotify";

export function buildAudioProfileFromFeatures(
  features: SpotifyAudioFeatures[]
): UserAudioProfile | undefined {
  const usable = features.filter(
    (f) => f.energy != null && f.danceability != null && f.valence != null && f.tempo != null
  );
  if (usable.length === 0) return undefined;
  const n = usable.length;
  const sum = (get: (f: SpotifyAudioFeatures) => number) =>
    usable.reduce((s, f) => s + get(f), 0) / n;
  return {
    energy: sum((f) => f.energy!),
    danceability: sum((f) => f.danceability!),
    valence: sum((f) => f.valence!),
    tempo: sum((f) => f.tempo!),
  };
}

/** 优先 Top Tracks，再补足 Saved，最多 max 个唯一 id */
export function collectTrackIdsForAudioFeatures(
  topTracks: SpotifyTrack[],
  savedTracks: { id: string }[],
  max = 100
): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const t of topTracks) {
    if (t.id && !seen.has(t.id)) {
      seen.add(t.id);
      ids.push(t.id);
    }
  }
  for (const t of savedTracks) {
    if (ids.length >= max) break;
    if (t.id && !seen.has(t.id)) {
      seen.add(t.id);
      ids.push(t.id);
    }
  }
  return ids.slice(0, max);
}

export function aggregateSavedArtistCounts(
  saved: { artistIds: string[] }[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const row of saved) {
    for (const id of row.artistIds) {
      counts[id] = (counts[id] || 0) + 1;
    }
  }
  return counts;
}
