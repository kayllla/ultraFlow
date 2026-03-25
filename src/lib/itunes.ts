/**
 * iTunes Search API — free, no auth, provides 30s AAC preview URLs
 * that play natively in all modern browsers.
 */

export interface iTunesPreview {
  trackName: string;
  previewUrl: string;
  trackViewUrl: string;
  artworkUrl: string | null;
}

const ITUNES_BASE = "https://itunes.apple.com/search";

export async function getiTunesPreview(
  artistName: string
): Promise<iTunesPreview | null> {
  // Strip B2B / "B2B" collaborations — use only the first artist
  const primary = artistName.split(/\s+b2b\s+/i)[0].trim();

  const url = `${ITUNES_BASE}?term=${encodeURIComponent(primary)}&entity=song&limit=10&media=music`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();

    // Pick the first result that actually has a preview clip
    const track = (data.results ?? []).find(
      (r: any) => r.previewUrl && r.artistName
    );
    if (!track) return null;

    // Replace 100x100 thumbnail with 300x300 for better quality
    const artwork: string | null = track.artworkUrl100
      ? (track.artworkUrl100 as string).replace("100x100", "300x300")
      : null;

    return {
      trackName: track.trackName,
      previewUrl: track.previewUrl,
      trackViewUrl: track.trackViewUrl ?? "",
      artworkUrl: artwork,
    };
  } catch {
    return null;
  }
}
