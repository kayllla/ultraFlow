import { DJRecommendation } from "@/types";
import { mergeDjMediaIntoRecommendations } from "@/lib/dj-media-merge";
import { getArtistsBatch } from "@/lib/spotify";

export async function enrichRecommendationsWithSpotify(
  recs: DJRecommendation[],
  accessToken?: string
): Promise<DJRecommendation[]> {
  // Start with cached iTunes media (covers + previews)
  let enriched = mergeDjMediaIntoRecommendations(recs);

  if (!accessToken) return enriched;

  // Collect Spotify artist IDs for artists that still lack a proper photo
  const needPhoto = enriched.filter(
    (r) =>
      r.artist.spotifyArtistId &&
      !r.artist.imageUrl
  );

  if (needPhoto.length === 0) return enriched;

  try {
    const ids = [...new Set(needPhoto.map((r) => r.artist.spotifyArtistId!))]
      .slice(0, 50);

    const spotifyArtists = await getArtistsBatch(accessToken, ids);
    const imageBySpotifyId = new Map(
      spotifyArtists
        .filter((a) => a.imageUrl)
        .map((a) => [a.id, a.imageUrl!])
    );

    if (imageBySpotifyId.size === 0) return enriched;

    enriched = enriched.map((r) => {
      const sid = r.artist.spotifyArtistId;
      if (!sid || r.artist.imageUrl) return r;
      const photo = imageBySpotifyId.get(sid);
      if (!photo) return r;
      return { ...r, artist: { ...r.artist, imageUrl: photo } };
    });
  } catch (e) {
    console.warn("Spotify artist image fetch failed:", e);
  }

  return enriched;
}
