import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const profilesPath = join(__dirname, "../src/data/dj-profiles.json");
const lineupPath = join(__dirname, "../src/data/lineup.ts");

const profiles = JSON.parse(readFileSync(profilesPath, "utf-8"));
let lineup = readFileSync(lineupPath, "utf-8");

const nameToProfile = new Map();
for (const [name, profile] of Object.entries(profiles)) {
  nameToProfile.set(name.toLowerCase(), profile);
}

const artistLineRe = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*spotifyArtistId:\s*(null|"[^"]*"),\s*genreTags:\s*(\[[^\]]*\])(?:,\s*profile:\s*\{[^}]*\})?\s*\}/g;

let count = 0;
lineup = lineup.replace(artistLineRe, (match, id, name, spotifyId, genreTags) => {
  const profile = nameToProfile.get(name.toLowerCase());
  if (!profile) {
    console.log(`  ⚠ No profile found for: ${name}`);
    return match;
  }
  count++;
  const p = `profile: { hyped: ${profile.hyped}, reputation: ${profile.reputation}, vibe: ${JSON.stringify(profile.vibe)}, targetAudience: ${JSON.stringify(profile.targetAudience)}, festivalContext: ${JSON.stringify(profile.festivalContext)} }`;
  return `{ id: "${id}", name: "${name}", spotifyArtistId: ${spotifyId}, genreTags: ${genreTags}, ${p} }`;
});

writeFileSync(lineupPath, lineup);
console.log(`✓ Injected ${count} profiles into lineup.ts`);
