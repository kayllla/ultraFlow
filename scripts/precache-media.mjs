/**
 * Pre-fetch all DJ media. Strategy:
 *   - Spotify: ONE search per artist (skip direct ID lookup to halve API calls)
 *   - 3s delay between Spotify calls to respect dev-mode rate limits
 *   - iTunes: no rate issues, fetch all previews
 *   - Resumes from existing dj-media.json
 */
import { writeFileSync, readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API = "https://api.spotify.com/v1";
const ITUNES_API = "https://itunes.apple.com/search";

const lineupSrc = readFileSync(join(__dirname, "../src/data/lineup.ts"), "utf-8");
const artistRe = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*spotifyArtistId:\s*(null|"([^"]*)")/g;
const allArtists = [];
let m;
while ((m = artistRe.exec(lineupSrc)) !== null) {
  allArtists.push({ id: m[1], name: m[2], spotifyId: m[3] === "null" ? null : m[4] });
}
const seen = new Set();
const uniqueArtists = allArtists.filter((a) => { if (seen.has(a.id)) return false; seen.add(a.id); return true; });

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function getSpotifyToken() {
  const res = await fetch(SPOTIFY_TOKEN_URL, {
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

async function spotifySearch(name, token) {
  const primary = name.split(/\s+b2b\s+/i)[0].trim();
  const url = `${SPOTIFY_API}/search?q=${encodeURIComponent(primary)}&type=artist&limit=1`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 429) {
    const wait = Math.min(parseInt(res.headers.get("Retry-After") || "10", 10), 10);
    console.log(`    429 → wait ${wait}s`);
    await sleep(wait * 1000);
    // One retry
    const r2 = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!r2.ok) return null;
    const d2 = await r2.json();
    return d2?.artists?.items?.[0]?.images?.[0]?.url || null;
  }
  if (!res.ok) return null;
  const data = await res.json();
  return data?.artists?.items?.[0]?.images?.[0]?.url || null;
}

async function getItunesPreview(name) {
  const primary = name.split(/\s+b2b\s+/i)[0].trim();
  try {
    const res = await fetch(`${ITUNES_API}?term=${encodeURIComponent(primary)}&entity=song&limit=10&media=music`);
    if (!res.ok) return null;
    const data = await res.json();
    const track = (data.results ?? []).find((r) => r.previewUrl && r.artistName);
    if (!track) return null;
    return {
      name: track.trackName,
      previewUrl: track.previewUrl,
      spotifyUrl: track.trackViewUrl || "",
      coverUrl: track.artworkUrl100 ? track.artworkUrl100.replace("100x100", "300x300") : null,
    };
  } catch { return null; }
}

async function main() {
  const token = await getSpotifyToken();
  if (!token) { console.error("No token"); process.exit(1); }

  const outPath = join(__dirname, "../src/data/dj-media.json");
  let media = {};
  if (existsSync(outPath)) {
    try { media = JSON.parse(readFileSync(outPath, "utf-8")); } catch {}
  }
  const existing = Object.keys(media).length;
  if (existing > 0) console.log(`Resuming from ${existing} cached\n`);

  // Phase 1: iTunes previews for all (fast, no rate limit)
  console.log("Phase 1: iTunes previews...");
  for (let i = 0; i < uniqueArtists.length; i++) {
    const a = uniqueArtists[i];
    if (media[a.id]?.previewTrack !== undefined) continue;
    const pt = await getItunesPreview(a.name);
    if (!media[a.id]) media[a.id] = { imageUrl: null, previewTrack: null };
    media[a.id].previewTrack = pt;
    process.stdout.write(`  [${i + 1}] ${a.name} → ${pt ? "✓" : "✗"}\n`);
  }
  writeFileSync(outPath, JSON.stringify(media, null, 2));
  console.log("  Saved iTunes data\n");

  // Phase 2: Spotify images (slow, rate limited)
  console.log("Phase 2: Spotify artist photos (3s between calls)...");
  const needImage = uniqueArtists.filter((a) => !media[a.id]?.imageUrl);
  console.log(`  ${needImage.length} artists need photos\n`);

  for (let i = 0; i < needImage.length; i++) {
    const a = needImage[i];
    process.stdout.write(`  [${i + 1}/${needImage.length}] ${a.name} ... `);
    const img = await spotifySearch(a.name, token);
    media[a.id].imageUrl = img;
    console.log(img ? "✓" : "✗");

    if (i % 10 === 9) writeFileSync(outPath, JSON.stringify(media, null, 2));
    if (i < needImage.length - 1) await sleep(3000);
  }

  writeFileSync(outPath, JSON.stringify(media, null, 2));

  const total = Object.keys(media).length;
  const withImg = Object.values(media).filter((m) => m.imageUrl).length;
  const withAud = Object.values(media).filter((m) => m.previewTrack?.previewUrl).length;
  console.log(`\nDone! ${total} artists: ${withImg} photos, ${withAud} previews`);
}

main().catch(console.error);
