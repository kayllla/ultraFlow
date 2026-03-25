/**
 * Fetch missing DJ photos via multiple sources:
 *   1. iTunes artist lookup (free, no rate limit)
 *   2. Spotify search (5s delay, as backup)
 */
import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/data/dj-media.json");
const media = JSON.parse(readFileSync(outPath, "utf-8"));

const lineupSrc = readFileSync(join(__dirname, "../src/data/lineup.ts"), "utf-8");
const artistRe = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g;
const allArtists = [];
let m;
while ((m = artistRe.exec(lineupSrc)) !== null) allArtists.push({ id: m[1], name: m[2] });
const seen = new Set();
const uniqueArtists = allArtists.filter((a) => { if (seen.has(a.id)) return false; seen.add(a.id); return true; });

const needImage = uniqueArtists.filter((a) => !media[a.id]?.imageUrl);
console.log(`${needImage.length} artists need photos\n`);

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// iTunes artist lookup — returns artist image (not album art)
async function iTunesArtistImage(name) {
  const primary = name.split(/\s+b2b\s+/i)[0].trim();
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(primary)}&entity=musicArtist&limit=3&media=music`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    // musicArtist entity doesn't always have images, but let's try
    // Try allArtist entity with different approach
    for (const r of data.results ?? []) {
      if (r.artistLinkUrl) {
        // Apple Music artist pages have og:image, but we can't scrape easily.
        // Try artistId lookup for hi-res image
        const artId = r.artistId;
        if (artId) {
          const lookupUrl = `https://itunes.apple.com/lookup?id=${artId}&entity=musicArtist`;
          const lookupRes = await fetch(lookupUrl);
          if (lookupRes.ok) {
            const lookupData = await lookupRes.json();
            // Sometimes has artworkUrl
          }
        }
      }
    }
    return null;
  } catch { return null; }
}

// Deezer API — free, no auth needed, has artist images!
async function deezerArtistImage(name) {
  const primary = name.split(/\s+b2b\s+/i)[0].trim();
  try {
    const url = `https://api.deezer.com/search/artist?q=${encodeURIComponent(primary)}&limit=1`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const artist = data?.data?.[0];
    if (!artist) return null;
    // picture_xl is the highest quality artist photo
    return artist.picture_xl || artist.picture_big || artist.picture_medium || null;
  } catch { return null; }
}

// Spotify search as last resort (with long delay)
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
let spotifyToken = null;

async function getSpotifyToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });
  const data = await res.json();
  return data.access_token;
}

async function spotifyArtistImage(name) {
  if (!spotifyToken) spotifyToken = await getSpotifyToken();
  const primary = name.split(/\s+b2b\s+/i)[0].trim();
  try {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(primary)}&type=artist&limit=1`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${spotifyToken}` } });
    if (res.status === 429) return null;
    if (!res.ok) return null;
    const data = await res.json();
    return data?.artists?.items?.[0]?.images?.[0]?.url || null;
  } catch { return null; }
}

async function main() {
  for (let i = 0; i < needImage.length; i++) {
    const a = needImage[i];
    process.stdout.write(`[${i + 1}/${needImage.length}] ${a.name} ... `);

    if (!media[a.id]) media[a.id] = { imageUrl: null, previewTrack: null };

    // Try Deezer first (free, no auth, has artist photos)
    let img = await deezerArtistImage(a.name);
    if (img) {
      media[a.id].imageUrl = img;
      console.log(`✓ (deezer)`);
    } else {
      // Try Spotify with delay
      img = await spotifyArtistImage(a.name);
      if (img) {
        media[a.id].imageUrl = img;
        console.log(`✓ (spotify)`);
        await sleep(5000);
      } else {
        console.log(`✗`);
      }
    }

    if (i % 20 === 19) writeFileSync(outPath, JSON.stringify(media, null, 2));
    await sleep(200);
  }

  writeFileSync(outPath, JSON.stringify(media, null, 2));
  const withImg = Object.values(media).filter((m) => m.imageUrl).length;
  console.log(`\nDone! ${withImg}/${Object.keys(media).length} have photos`);
}

main().catch(console.error);
