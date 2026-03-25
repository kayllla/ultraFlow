import { DJRecommendation, PreviewTrack } from "@/types";
import djMedia from "@/data/dj-media.json";

export const djMediaMap = djMedia as Record<
  string,
  { imageUrl: string | null; previewTrack: PreviewTrack | null }
>;

/** 同一艺人在不同天可能用 id 后缀区分；缓存可能只存了其中一天 */
function lookupMediaEntry(artistId: string) {
  const direct = djMediaMap[artistId];
  if (direct) return direct;

  const base = artistId.replace(/-d[123]$/, "");
  if (base !== artistId) {
    const fromBase = djMediaMap[base];
    if (fromBase) return fromBase;
    for (const day of ["1", "2", "3"] as const) {
      const alt = `${base}-d${day}`;
      if (djMediaMap[alt]) return djMediaMap[alt];
    }
  }

  return undefined;
}

export function mergeDjMediaIntoRecommendation(
  rec: DJRecommendation
): DJRecommendation {
  const cached = lookupMediaEntry(rec.artist.id);
  if (!cached) return rec;

  const previewTrack = cached.previewTrack ?? rec.previewTrack;
  const mergedImg =
    cached.imageUrl ?? rec.artist.imageUrl ?? previewTrack?.coverUrl;
  const imageUrl = mergedImg == null ? undefined : mergedImg;

  return {
    ...rec,
    artist: {
      ...rec.artist,
      imageUrl,
    },
    previewTrack,
  };
}

export function mergeDjMediaIntoRecommendations(
  recs: DJRecommendation[]
): DJRecommendation[] {
  return recs.map(mergeDjMediaIntoRecommendation);
}
