import OpenAI from "openai";
import { readFileSync, writeFileSync } from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const artistNames = [
  "Frank Walker", "VOYD", "Worship", "Illenium", "BZRP",
  "Alesso B2B Martin Garrix", "Major Lazer", "PRADA2000", "Matty Ralph",
  "Superstrings", "Vini Vici", "Lilly Palmer",
  "Armin Van Buuren B2B Marlon Hoffstadt", "Armin Van Buuren",
  "MAR-T", "Massano", "Miss Monique", "Vintage Culture", "Eric Prydz",
  "Godtripper", "ALT8", "999999999", "Clara Cuve", "Sara Landry",
  "Afrobeta", "Shima", "Black Tiger Sex Machine", "Of The Trees",
  "Levity", "Ookay", "Nostalgix", "Jessica Audiffred", "Steve Aoki",
  "Laidback Luke", "Riot Ten", "Bloody Beetroots", "Nudos",
  "Los De La Vega", "Luca Testa",
  "Gil Glaze", "Mykris", "Halo", "Nicky Romero", "Loud Luxury",
  "Alan Walker", "Excision", "Hardwell",
  "Sebastian Ingrosso B2B Steve Angello",
  "Julian Cross", "Distinct Motive", "Sidequest", "Daniel Allan",
  "ARMNHMR", "HOL!", "BOU", "Kai Wachi", "The Outlaw B2B Trym",
  "Hamdi", "ISOXO", "Andy Pate B2B Rod B.", "Juliet Fox",
  "Alan Fitzpatrick B2B Marco Faraone", "Sasha & John Digweed",
  "Eli Brown", "Adam Beyer B2B Joseph Capriati", "Carl Cox",
  "JOA", "Olympe", "Rivo", "Kasia", "Deep Dish",
  "Colyn B2B Innellea", "Madeon", "Cassian",
  "Joris Voorn B2B Korolova", "Miss Bashful", "Confidence Man",
  "Snow Strippers", "Boys Noize", "Brutalismus 3000",
  "The Purge", "The Saints", "Coone", "Da Tweekaz", "Mish",
  "D-Sturb", "Dual Damage", "Soren", "Kaoru", "CVMRN",
  "Lucy Guo", "Wally Lopez",
  "Kapuchon", "Me N U", "R3HAB", "Maddix", "ARTBAT",
  "Marlon Hoffstadt", "Afrojack", "DJ Snake", "John Summit",
  "Big Florida", "JSTJR", "BOLO", "LAYZ", "Andy C",
  "Holy Priest", "Peekaboo", "Boris Brejcha",
  "Ray Volpe B2B Sullivan King", "Crankdat B2B Wooli",
  "Bassett B2B Christopher James", "Scenarios",
  "Argy B2B Mind Against", "Adriatique",
  "Amelie Lens B2B Sara Landry", "M.O.N.R.O.E.", "Plastik Funk",
  "Black Fancy", "Malone", "Rossi.",
  "Dennis Cruz B2B Seth Troxler", "The Martinez Brothers",
  "EERA", "BOIISH", "PARISI", "Louis The Child",
  "Deorro B2B Mike Posner B2B Morten", "ZHU",
  "Frost Children", "X Club.", "Fcukers", "MCR-T", "DJ Gigola",
];

async function generateBatch(names) {
  const artistList = names.map((n, i) => `${i + 1}. ${n}`).join("\n");

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an expert electronic music journalist and Ultra Miami festival advisor.
You deeply understand DJ culture, festival performance quality, and crowd energy dynamics.
Return valid JSON only.`,
      },
      {
        role: "user",
        content: `For each DJ below, generate a festival profile for Ultra Miami 2025.

DJs:
${artistList}

For EACH DJ return a JSON object with these exact fields:
- "hyped" (1-100): How energetic/hype their live sets are at festivals. 100 = absolute peak energy, mosh pits, crowd goes insane. 50 = chill vibes. Consider their typical festival performance style, not studio music.
- "reputation" (1-100): Their reputation/status in the festival scene based on past Ultra/major festival performances, crowd sizes, and community reviews. 100 = legendary headliner. 30 = unknown opener.
- "vibe" (string, max 15 words): A vivid one-line description of what experiencing their set FEELS like. Be specific and evocative, not generic.
- "targetAudience" (string, max 12 words): Who in the crowd would love this set most.
- "festivalContext" (string, max 20 words): When/why to catch this set at Ultra, incorporating time-of-day wisdom.

Return a JSON object where keys are the exact DJ names and values are objects with the 5 fields above.
Be honest — not every DJ is a 90+ hype. Openers and lesser-known acts should score lower.
For B2B sets, evaluate the combination, not individual artists.`,
      },
    ],
  });

  return JSON.parse(res.choices[0].message.content);
}

async function main() {
  console.log(`Generating profiles for ${artistNames.length} DJs...`);

  const batchSize = 45;
  const allProfiles = {};

  for (let i = 0; i < artistNames.length; i += batchSize) {
    const batch = artistNames.slice(i, i + batchSize);
    console.log(`Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} DJs...`);

    try {
      const profiles = await generateBatch(batch);
      Object.assign(allProfiles, profiles);
      console.log(`  ✓ Got ${Object.keys(profiles).length} profiles`);
    } catch (err) {
      console.error(`  ✗ Error:`, err.message);
    }

    if (i + batchSize < artistNames.length) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  writeFileSync(
    new URL("../src/data/dj-profiles.json", import.meta.url),
    JSON.stringify(allProfiles, null, 2)
  );

  console.log(`\nDone! Wrote ${Object.keys(allProfiles).length} profiles to src/data/dj-profiles.json`);
}

main().catch(console.error);
