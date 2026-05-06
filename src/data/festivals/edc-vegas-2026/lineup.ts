import { Artist, SetSlot } from "@/types";

export const artists: Artist[] = [
  // === DAY 1 ARTISTS ===
  // Kinetic Field
  { id: "edc-laidback-luke-chuckie", name: "Laidback Luke B2B Chuckie", spotifyArtistId: "4GrQCNFmSNclbOiPbSvSB7", genreTags: ["electro house", "house", "high energy"], profile: { hyped: 82, reputation: 85, vibe: "Legendary b2b session blending classic electro house with infectious crowd energy.", targetAudience: "House music veterans and festival die-hards.", festivalContext: "Perfect opener to warm up the main stage for the night ahead." } },
  { id: "edc-korolova", name: "Korolova", spotifyArtistId: "2bkY1HgMUTEV3b0Aa2SVUR", genreTags: ["melodic techno", "progressive house", "dark"], profile: { hyped: 78, reputation: 75, vibe: "Deep, hypnotic sets with dark melodic textures and immersive soundscapes.", targetAudience: "Melodic techno fans and deep groove seekers.", festivalContext: "Builds perfectly into the peak-time headliners with dark, evolving sets." } },
  { id: "edc-argy", name: "Argy", spotifyArtistId: "40sMQK3RVVT9IwTX6MWzJy", genreTags: ["melodic techno", "progressive", "dark techno"], profile: { hyped: 80, reputation: 78, vibe: "Driving melodic techno with a dark, mysterious edge.", targetAudience: "Progressive techno fans and night owls.", festivalContext: "Prime-time melodic techno set to get the crowd in a trance." } },
  { id: "edc-chris-lorenzo", name: "Chris Lorenzo", spotifyArtistId: "5I6VW1tFaGRs5jm9B2BpJE", genreTags: ["house", "bass house", "tech house"], profile: { hyped: 83, reputation: 80, vibe: "Bass-heavy house with funky, infectious grooves.", targetAudience: "Bass house and tech house lovers.", festivalContext: "Late-night energy with relentless house grooves." } },
  { id: "edc-sofi-tukker", name: "Sofi Tukker", spotifyArtistId: "6qqNVTkFNwA7Pkdrha5AkO", genreTags: ["dance pop", "house", "tropical house"], profile: { hyped: 88, reputation: 86, vibe: "Infectious beats with Brazilian flair and irresistible sing-along energy.", targetAudience: "Dance pop lovers and feel-good seekers.", festivalContext: "Guaranteed crowd pleaser with high energy vocals and dance moves." } },
  { id: "edc-chainsmokers", name: "The Chainsmokers", spotifyArtistId: "69GGBxA162lTqCwzJG5jLp", genreTags: ["edm", "dance pop", "electro house", "high energy"], profile: { hyped: 92, reputation: 93, vibe: "Massive pop-infused EDM anthems with incredible stage presence.", targetAudience: "Mainstage EDM fans and pop lovers.", festivalContext: "After-midnight headliner that unites the crowd in massive singalongs." } },
  { id: "edc-fisher", name: "Fisher", spotifyArtistId: "7IMNa4CCQZ8cq89pcZ5q4y", genreTags: ["tech house", "house", "high energy"], profile: { hyped: 90, reputation: 88, vibe: "Fun, cheeky tech house with raw energy and relentless grooves.", targetAudience: "Tech house lovers and party animals.", festivalContext: "Late-night beast mode with unstoppable house energy." } },
  { id: "edc-porter-robinson", name: "Porter Robinson", spotifyArtistId: "3HqSZZd53oq5ALTERNATING", genreTags: ["future bass", "melodic", "electronic", "emotional"], profile: { hyped: 93, reputation: 95, vibe: "Emotional, cinematic electronic music that transcends genres.", targetAudience: "Melodic electronic fans and emotional ravers.", festivalContext: "A once-in-a-lifetime audio-visual journey in the early morning hours." } },
  { id: "edc-charlotte-de-witte", name: "Charlotte de Witte", spotifyArtistId: "6p7YmGF31AQPrpqAmTJj5l", genreTags: ["techno", "dark techno", "rave"], profile: { hyped: 94, reputation: 96, vibe: "Relentless, industrial dark techno that dominates the dancefloor.", targetAudience: "Techno purists and rave warriors.", festivalContext: "The closing techno juggernaut that takes the night into dawn." } },

  // Circuit Grounds
  { id: "edc-1991", name: "1991", spotifyArtistId: null, genreTags: ["bass", "dubstep", "electronic"], profile: { hyped: 72, reputation: 68, vibe: "Raw, gritty bass music with explosive energy.", targetAudience: "Bass music lovers and underground enthusiasts.", festivalContext: "High-energy opener for the Circuit Grounds crowd." } },
  { id: "edc-bou", name: "Bou", spotifyArtistId: "6ghtFQ4hbMYPHRmXCkMJ0r", genreTags: ["drum and bass", "dnb", "jump up"], profile: { hyped: 80, reputation: 72, vibe: "Infectious jump-up drum and bass with relentless energy.", targetAudience: "DNB fans and jump-up enthusiasts.", festivalContext: "Gets the crowd bouncing with high-octane DNB energy." } },
  { id: "edc-nico-moreno", name: "Nico Moreno", spotifyArtistId: null, genreTags: ["techno", "industrial techno", "dark"], profile: { hyped: 82, reputation: 78, vibe: "Dark, industrial techno with relentless beats and underground grit.", targetAudience: "Hard techno and industrial enthusiasts.", festivalContext: "Underground techno journey in a massive outdoor venue." } },
  { id: "edc-i-hate-models", name: "I Hate Models", spotifyArtistId: null, genreTags: ["techno", "dark techno", "industrial"], profile: { hyped: 88, reputation: 85, vibe: "Visionary dark techno sets with a unique, underground vision.", targetAudience: "Techno visionaries and underground ravers.", festivalContext: "Peak-time techno that pushes into experimental territory." } },
  { id: "edc-levity", name: "Levity", spotifyArtistId: null, genreTags: ["bass", "melodic bass", "electronic"], profile: { hyped: 65, reputation: 60, vibe: "Uplifting melodic bass with a light, airy quality.", targetAudience: "Melodic bass fans and chill-out seekers.", festivalContext: "Smooth transition into the late-night circuit grounds lineup." } },
  { id: "edc-wooli", name: "Wooli", spotifyArtistId: "0RiHX6J3E2oH1WDm4NlOIC", genreTags: ["dubstep", "bass", "heavy"], profile: { hyped: 84, reputation: 80, vibe: "Heavy-hitting dubstep with anthemic drops and relentless bass.", targetAudience: "Bassheads and dubstep lovers.", festivalContext: "Crushing bass sets in the early morning hours." } },
  { id: "edc-the-outlaw", name: "The Outlaw", spotifyArtistId: null, genreTags: ["techno", "hard techno", "rave"], profile: { hyped: 76, reputation: 70, vibe: "Raw, underground hard techno with pounding beats.", targetAudience: "Hard techno heads and underground warriors.", festivalContext: "Late-night hard techno for the dedicated." } },
  { id: "edc-holy-priest", name: "Holy Priest", spotifyArtistId: null, genreTags: ["techno", "hard techno"], profile: { hyped: 68, reputation: 62, vibe: "Hard-hitting techno with spiritual energy and depth.", targetAudience: "Techno devotees and rave enthusiasts.", festivalContext: "Dawn techno sets for the survivors." } },
  { id: "edc-ray-volpe", name: "Ray Volpe", spotifyArtistId: "4gQPyWOGPBJjCqC9GWoTEj", genreTags: ["dubstep", "bass", "heavy dubstep"], profile: { hyped: 88, reputation: 82, vibe: "Face-melting dubstep with innovative drops and raw bass power.", targetAudience: "Dubstep fans and bass music addicts.", festivalContext: "Sunrise bass assault for the true believers." } },
  { id: "edc-level-up", name: "Level Up", spotifyArtistId: null, genreTags: ["bass", "electronic", "high energy"], profile: { hyped: 65, reputation: 58, vibe: "Energetic electronic sets to close out the night.", targetAudience: "Energy seekers and late-night party people.", festivalContext: "Closing set that takes the crowd to dawn." } },

  // Cosmic Meadow
  { id: "edc-jackie-hollander", name: "Jackie Hollander", spotifyArtistId: null, genreTags: ["house", "tech house"], profile: { hyped: 68, reputation: 62, vibe: "Groovy tech house with a fresh, modern approach.", targetAudience: "Tech house fans and groove lovers.", festivalContext: "Warm-up set for the Cosmic Meadow crowd." } },
  { id: "edc-roddy-lima", name: "Roddy Lima", spotifyArtistId: null, genreTags: ["bass house", "house", "tech house"], profile: { hyped: 72, reputation: 65, vibe: "Bass-infused house with funky, danceable grooves.", targetAudience: "House music fans and dance floor enthusiasts.", festivalContext: "Building energy through the early evening." } },
  { id: "edc-westend", name: "WESTEND", spotifyArtistId: null, genreTags: ["house", "tech house", "melodic house"], profile: { hyped: 75, reputation: 70, vibe: "Melodic house music with a sophisticated, polished sound.", targetAudience: "Melodic house and tech house lovers.", festivalContext: "Peak-time house set driving the Cosmic Meadow energy." } },
  { id: "edc-walker-boyce-vnssa", name: "Walker & Royce B2B VNSSA", spotifyArtistId: null, genreTags: ["house", "tech house", "melodic house"], profile: { hyped: 84, reputation: 80, vibe: "Playful, genre-blending house music with infectious energy.", targetAudience: "House lovers and eclectic music fans.", festivalContext: "A must-see b2b that blends diverse house sounds." } },
  { id: "edc-underworld", name: "Underworld", spotifyArtistId: "1CR3HZbJrfDUk9pGBOdxF5", genreTags: ["electronic", "techno", "rave", "acid house"], profile: { hyped: 88, reputation: 96, vibe: "Legendary electronic pioneers with anthems spanning decades.", targetAudience: "Electronic music veterans and rave history enthusiasts.", festivalContext: "An iconic moment — Underworld live at EDC." } },
  { id: "edc-meduza", name: "Meduza", spotifyArtistId: "3oUmnGRDRMxGmJGAHMnSmb", genreTags: ["house", "dance pop", "deep house"], profile: { hyped: 86, reputation: 84, vibe: "Euphoric house anthems that blur the line between pop and underground.", targetAudience: "House music fans and dance pop lovers.", festivalContext: "After-midnight house magic with massive hit records." } },
  { id: "edc-notion", name: "Notion", spotifyArtistId: null, genreTags: ["house", "tech house", "melodic"], profile: { hyped: 72, reputation: 65, vibe: "Groovy, melodic house with a late-night sensibility.", targetAudience: "House music lovers and dance floor devotees.", festivalContext: "Late-night groove session in the early morning hours." } },
  { id: "edc-mph", name: "MPH", spotifyArtistId: null, genreTags: ["bass house", "house", "electronic"], profile: { hyped: 68, reputation: 62, vibe: "High-energy bass house with relentless speed and groove.", targetAudience: "Bass house and tech house enthusiasts.", festivalContext: "Dawn house music for the dedicated party people." } },
  { id: "edc-san-pacho", name: "San Pacho", spotifyArtistId: null, genreTags: ["house", "tech house", "latin house"], profile: { hyped: 78, reputation: 72, vibe: "Latin-infused tech house with a vibrant, tropical energy.", targetAudience: "Latin house and tech house fans.", festivalContext: "Sunrise closing set with infectious tropical grooves." } },

  // Basspod
  { id: "edc-max-dean-luke-dean", name: "Max Dean B2B Luke Dean", spotifyArtistId: null, genreTags: ["bass", "dubstep", "electronic"], profile: { hyped: 70, reputation: 65, vibe: "Early evening bass warm-up with a brotherly energy.", targetAudience: "Bass music fans and early arrivals.", festivalContext: "Sets the tone for an epic night in the Basspod." } },
  { id: "edc-riot", name: "Riot", spotifyArtistId: null, genreTags: ["dubstep", "bass", "heavy"], profile: { hyped: 76, reputation: 70, vibe: "Hard-hitting dubstep with aggressive, face-melting drops.", targetAudience: "Bassheads and dubstep fans.", festivalContext: "Starts the Basspod mayhem with heavy bass energy." } },
  { id: "edc-heyz", name: "HEYZ", spotifyArtistId: null, genreTags: ["bass", "dubstep", "electronic"], profile: { hyped: 72, reputation: 65, vibe: "High-energy bass music with creative sound design.", targetAudience: "Bass lovers and electronic music explorers.", festivalContext: "Building the Basspod energy with creative bass drops." } },
  { id: "edc-muzz", name: "MUZZ", spotifyArtistId: null, genreTags: ["bass", "dubstep", "heavy"], profile: { hyped: 74, reputation: 68, vibe: "Intense bass drops with crushing energy and dark vibes.", targetAudience: "Bassheads and heavy music fans.", festivalContext: "Takes the Basspod into darker territory." } },
  { id: "edc-ghengar", name: "Ghengar", spotifyArtistId: null, genreTags: ["bass", "dubstep", "experimental"], profile: { hyped: 70, reputation: 63, vibe: "Experimental bass music blending dark atmospheres with crushing drops.", targetAudience: "Experimental bass fans and dubstep enthusiasts.", festivalContext: "Deep bass exploration in the Basspod." } },
  { id: "edc-deathpact", name: "Deathpact", spotifyArtistId: null, genreTags: ["bass", "dubstep", "industrial", "dark"], profile: { hyped: 89, reputation: 82, vibe: "Mysterious, high-concept bass performances with cinematic dark energy.", targetAudience: "Dark bass and industrial electronic fans.", festivalContext: "One of the most anticipated mystery acts — a must-see." } },
  { id: "edc-atliens", name: "ATLiens", spotifyArtistId: "6REjsS1vQFcxJeOmjNb0Qk", genreTags: ["bass", "dubstep", "trap", "dark"], profile: { hyped: 84, reputation: 78, vibe: "Alien-themed bass music with cosmic visuals and heavy drops.", targetAudience: "Bass music fans and extraterrestrial vibes seekers.", festivalContext: "After-midnight alien bass invasion in the Basspod." } },
  { id: "edc-kai-wachi", name: "Kai Wachi", spotifyArtistId: "0YeNT5GACVHCZN2oTIePJq", genreTags: ["dubstep", "melodic dubstep", "bass"], profile: { hyped: 88, reputation: 83, vibe: "Raw, face-melting dubstep with primal energy and crushing bass.", targetAudience: "Hardcore bassheads and heavy music lovers.", festivalContext: "Late-night Basspod destruction — not for the faint of heart." } },
  { id: "edc-adventure-club", name: "Adventure Club", spotifyArtistId: "4nBfOgKH8YAz9pPFVQdtiv", genreTags: ["future bass", "dubstep", "melodic dubstep"], profile: { hyped: 82, reputation: 80, vibe: "Iconic future bass and dubstep with emotional melodies and heavy drops.", targetAudience: "Melodic bass fans and future bass lovers.", festivalContext: "Pre-dawn emotional bass journey in the Basspod." } },
  { id: "edc-culture-shock", name: "Culture Shock", spotifyArtistId: null, genreTags: ["drum and bass", "dnb", "liquid dnb"], profile: { hyped: 75, reputation: 72, vibe: "High-octane drum and bass with a liquid, melodic touch.", targetAudience: "DNB fans and drum and bass enthusiasts.", festivalContext: "Sunrise DNB to close out the night." } },
  { id: "edc-cyclops", name: "Cyclops", spotifyArtistId: null, genreTags: ["bass", "dubstep", "electronic"], profile: { hyped: 70, reputation: 62, vibe: "Heavy, cyclopic bass with one-eyed precision and power.", targetAudience: "Bass music aficionados and final set die-hards.", festivalContext: "Dawn closing set for the last soldiers in the Basspod." } },

  // Neon Garden
  { id: "edc-anastazia", name: "Anastazia", spotifyArtistId: null, genreTags: ["techno", "house", "melodic"], profile: { hyped: 65, reputation: 58, vibe: "Smooth electronic transitions warming up the Neon Garden.", targetAudience: "Techno fans and early evening goers.", festivalContext: "Gentle opener for the underground techno crowd." } },
  { id: "edc-matty-ralph", name: "Matty Ralph", spotifyArtistId: null, genreTags: ["house", "melodic house", "deep house"], profile: { hyped: 68, reputation: 62, vibe: "Feel-good melodic house with soothing grooves.", targetAudience: "Melodic house fans and chill seekers.", festivalContext: "Afternoon house session in the Neon Garden." } },
  { id: "edc-mestiza", name: "Mestiza", spotifyArtistId: null, genreTags: ["techno", "house", "melodic techno"], profile: { hyped: 72, reputation: 66, vibe: "Genre-blending electronic with a fusion of techno and house.", targetAudience: "Eclectic electronic fans.", festivalContext: "Building the Neon Garden energy through dusk." } },
  { id: "edc-dj-tennis-chloe-caillet", name: "DJ Tennis B2B Chloe Caillet", spotifyArtistId: null, genreTags: ["house", "melodic house", "deep house"], profile: { hyped: 84, reputation: 80, vibe: "Sophisticated b2b house session with deep, evolving textures.", targetAudience: "Deep house and melodic house aficionados.", festivalContext: "Peak-time Neon Garden house journey." } },
  { id: "edc-peggy-gou", name: "Peggy Gou", spotifyArtistId: "4Dv1oGDJFuFzCGPnlRvnRC", genreTags: ["house", "tech house", "disco house"], profile: { hyped: 93, reputation: 92, vibe: "Iconic DJ and producer delivering feel-good house anthems with global flair.", targetAudience: "House fans, disco lovers, and electronic enthusiasts worldwide.", festivalContext: "A festival highlight — Peggy Gou is always a highlight of any lineup." } },
  { id: "edc-cosmic-gate", name: "Cosmic Gate", spotifyArtistId: "3TrjfKJRfh1qXGSdlkNvqD", genreTags: ["trance", "progressive trance", "uplifting"], profile: { hyped: 84, reputation: 87, vibe: "Iconic trance duo delivering emotional, euphoric journeys.", targetAudience: "Trance fans and melodic progressive lovers.", festivalContext: "After-midnight trance euphoria in the Neon Garden." } },
  { id: "edc-gareth-emery", name: "Gareth Emery", spotifyArtistId: "3HEFHjcz4eY3ALTERNATING", genreTags: ["trance", "progressive trance", "melodic"], profile: { hyped: 82, reputation: 84, vibe: "Melodic trance anthems with heartfelt emotion and technical mastery.", targetAudience: "Trance lovers and melodic electronic fans.", festivalContext: "Emotional trance set in the late night hours." } },
  { id: "edc-adriatique", name: "Adriatique", spotifyArtistId: "7g0t4U0kADpLHCXZC78SrY", genreTags: ["melodic techno", "progressive house", "deep"], profile: { hyped: 82, reputation: 86, vibe: "Sophisticated, evolving melodic techno with a cinematic quality.", targetAudience: "Melodic techno enthusiasts and deep music lovers.", festivalContext: "Pre-dawn melodic techno journey in the Neon Garden." } },
  { id: "edc-joseph-capriati", name: "Joseph Capriati", spotifyArtistId: "1bJTqVQfC1lGF2a9mJp3Qk", genreTags: ["techno", "tech house", "dark"], profile: { hyped: 87, reputation: 88, vibe: "High-energy Italian techno with relentless rhythmic intensity.", targetAudience: "Techno devotees and tech house fans.", festivalContext: "Hard-hitting dawn techno set for the survivors." } },
  { id: "edc-paul-van-dyk", name: "Paul van Dyk", spotifyArtistId: "3lQOLLceh7hDq9zzL4ALTERNATING", genreTags: ["trance", "progressive trance", "uplifting"], profile: { hyped: 86, reputation: 95, vibe: "Legendary trance icon delivering timeless anthems and massive productions.", targetAudience: "Trance veterans and classic electronic fans.", festivalContext: "A legendary presence — Paul van Dyk never disappoints." } },
  { id: "edc-eli-brown", name: "Eli Brown", spotifyArtistId: "5uOPgiswaLGXCbFZkMhzlq", genreTags: ["techno", "tech house", "rave"], profile: { hyped: 82, reputation: 78, vibe: "Energetic tech house with infectious grooves and driving beats.", targetAudience: "Tech house fans and groove seekers.", festivalContext: "Sunrise closer bringing the Neon Garden to a triumphant end." } },

  // Quantum Valley
  { id: "edc-sarah-de-warren", name: "Sarah de Warren", spotifyArtistId: null, genreTags: ["trance", "progressive trance", "melodic"], profile: { hyped: 75, reputation: 70, vibe: "Melodic trance with emotional depth and uplifting energy.", targetAudience: "Trance fans and melodic electronic lovers.", festivalContext: "Beautiful trance opener for the Quantum Valley stage." } },
  { id: "edc-slamm", name: "SLAMM", spotifyArtistId: null, genreTags: ["trance", "hard trance", "uplifting"], profile: { hyped: 70, reputation: 65, vibe: "High-energy trance with driving beats and euphoric builds.", targetAudience: "Trance enthusiasts and uplifting music fans.", festivalContext: "Building trance energy through the early evening." } },
  { id: "edc-cold-blue-van-dijk", name: "Cold Blue Van Dijk", spotifyArtistId: null, genreTags: ["trance", "progressive trance", "melodic"], profile: { hyped: 78, reputation: 74, vibe: "Uplifting trance with emotional melodies and powerful builds.", targetAudience: "Trance lovers and melodic electronic fans.", festivalContext: "Peak-time trance in the Quantum Valley." } },
  { id: "edc-omar-plus", name: "Omar+", spotifyArtistId: null, genreTags: ["trance", "melodic techno", "progressive"], profile: { hyped: 76, reputation: 70, vibe: "Progressive trance with a modern, evolved sound.", targetAudience: "Trance and progressive electronic fans.", festivalContext: "Progressive trance evolution in the Quantum Valley." } },
  { id: "edc-darude", name: "Darude", spotifyArtistId: "4KXp3xtaz1wWXnu5scAAd0", genreTags: ["trance", "eurodance", "edm"], profile: { hyped: 84, reputation: 90, vibe: "The iconic producer of Sandstorm — a certified dance music legend.", targetAudience: "Classic EDM fans and anyone who loves dance music.", festivalContext: "A nostalgic peak-time moment that unites the entire festival." } },
  { id: "edc-luke-dean", name: "Luke Dean", spotifyArtistId: null, genreTags: ["trance", "melodic trance", "progressive"], profile: { hyped: 72, reputation: 66, vibe: "Soaring trance melodies with technical precision.", targetAudience: "Trance fans and melodic lovers.", festivalContext: "Late-night trance energy in the Quantum Valley." } },
  { id: "edc-josh-baker", name: "Josh Baker", spotifyArtistId: null, genreTags: ["trance", "progressive", "melodic techno"], profile: { hyped: 74, reputation: 68, vibe: "Modern trance with progressive influences and melodic depth.", targetAudience: "Progressive trance and melodic techno fans.", festivalContext: "After-midnight trance journey in Quantum Valley." } },
  { id: "edc-ilan-bluestone", name: "Ilan Bluestone", spotifyArtistId: "3ALTERNATING", genreTags: ["trance", "progressive trance", "melodic"], profile: { hyped: 80, reputation: 76, vibe: "Emotional, melodic trance with powerful basslines and anthemic builds.", targetAudience: "Trance fans and emotional music lovers.", festivalContext: "Pre-dawn trance for those still standing." } },
  { id: "edc-max-dean", name: "Max Dean", spotifyArtistId: null, genreTags: ["trance", "melodic", "progressive"], profile: { hyped: 68, reputation: 62, vibe: "Driving progressive trance with powerful melodic layers.", targetAudience: "Progressive trance enthusiasts.", festivalContext: "Dawn progressive trance in Quantum Valley." } },
  { id: "edc-dyen", name: "DYEN", spotifyArtistId: null, genreTags: ["trance", "melodic", "electronic"], profile: { hyped: 70, reputation: 64, vibe: "Uplifting trance with high energy and euphoric peaks.", targetAudience: "Trance fans and melodic electronic lovers.", festivalContext: "Early morning trance energy to close out the night." } },
  { id: "edc-darren-porter", name: "Darren Porter", spotifyArtistId: null, genreTags: ["trance", "uplifting trance", "high energy"], profile: { hyped: 76, reputation: 72, vibe: "Relentless uplifting trance with massive anthems and emotional peaks.", targetAudience: "Uplifting trance lovers and energy seekers.", festivalContext: "Sunrise trance closing the Quantum Valley." } },

  // Stereo Bloom
  { id: "edc-domina", name: "Domina", spotifyArtistId: null, genreTags: ["techno", "dark techno", "industrial"], profile: { hyped: 72, reputation: 66, vibe: "Dark, commanding techno with an industrial edge.", targetAudience: "Dark techno fans and underground enthusiasts.", festivalContext: "Sets the dark tone for Stereo Bloom." } },
  { id: "edc-serafina", name: "Serafina", spotifyArtistId: null, genreTags: ["techno", "melodic techno", "dark"], profile: { hyped: 68, reputation: 62, vibe: "Melodic dark techno with hypnotic, evolving textures.", targetAudience: "Melodic techno fans.", festivalContext: "Building the Stereo Bloom atmosphere." } },
  { id: "edc-paramida", name: "Paramida", spotifyArtistId: null, genreTags: ["house", "disco", "deep house"], profile: { hyped: 78, reputation: 80, vibe: "Eclectic house and disco sets with a warm, personal touch.", targetAudience: "House music lovers and disco enthusiasts.", festivalContext: "A unique, warm set in the intimate Stereo Bloom stage." } },
  { id: "edc-kuko", name: "Kuko", spotifyArtistId: null, genreTags: ["techno", "dark techno", "industrial"], profile: { hyped: 74, reputation: 68, vibe: "Hard-hitting techno with punishing rhythms.", targetAudience: "Hard techno devotees.", festivalContext: "After-midnight techno assault in Stereo Bloom." } },
  { id: "edc-robert-hood", name: "Robert Hood", spotifyArtistId: "6dqNOTBK7glJkSoMLCePbv", genreTags: ["techno", "minimal techno", "detroit techno"], profile: { hyped: 88, reputation: 96, vibe: "Detroit techno legend — minimal, spiritual, and deeply influential.", targetAudience: "Techno purists and Detroit music historians.", festivalContext: "A sacred dawn moment with a techno pioneer." } },
  { id: "edc-avalon-emerson", name: "Avalon Emerson", spotifyArtistId: "4ALTERNATING", genreTags: ["techno", "house", "experimental"], profile: { hyped: 84, reputation: 87, vibe: "Innovative, genre-defying electronic music with technical mastery.", targetAudience: "Electronic music innovators and techno fans.", festivalContext: "Sunrise experimental electronic closing the Stereo Bloom." } },

  // Wasteland
  { id: "edc-stacy-christiane", name: "Stacy Christiane", spotifyArtistId: null, genreTags: ["techno", "dark techno"], profile: { hyped: 66, reputation: 60, vibe: "Dark, atmospheric techno with powerful presence.", targetAudience: "Dark techno fans.", festivalContext: "Early Wasteland techno set." } },
  { id: "edc-the-carry-nation", name: "The Carry Nation", spotifyArtistId: null, genreTags: ["house", "deep house", "club"], profile: { hyped: 74, reputation: 76, vibe: "New York underground house legends with decades of club experience.", targetAudience: "Underground house fans and club culture enthusiasts.", festivalContext: "Underground house masterclass in the Wasteland." } },
  { id: "edc-johannes-schuster", name: "Johannes Schuster", spotifyArtistId: null, genreTags: ["techno", "minimal techno"], profile: { hyped: 68, reputation: 64, vibe: "Precise minimal techno with subtle, hypnotic progressions.", targetAudience: "Minimal techno fans.", festivalContext: "Underground techno exploration in the Wasteland." } },
  { id: "edc-adrian-mills", name: "Adrian Mills", spotifyArtistId: null, genreTags: ["techno", "hard techno"], profile: { hyped: 70, reputation: 65, vibe: "High-energy techno with a hard, driving edge.", targetAudience: "Hard techno enthusiasts.", festivalContext: "Late night Wasteland techno energy." } },
  { id: "edc-cloudy", name: "Cloudy", spotifyArtistId: null, genreTags: ["techno", "dark techno", "experimental"], profile: { hyped: 65, reputation: 60, vibe: "Atmospheric experimental techno with cloudy, ethereal textures.", targetAudience: "Experimental techno fans.", festivalContext: "Otherworldly techno in the Wasteland." } },
  { id: "edc-graveor", name: "GRAVEOR", spotifyArtistId: null, genreTags: ["techno", "industrial", "dark"], profile: { hyped: 72, reputation: 65, vibe: "Dark industrial techno with grave, heavy energy.", targetAudience: "Industrial techno fans.", festivalContext: "After-midnight industrial darkness in the Wasteland." } },
  { id: "edc-rebekah", name: "Rebekah", spotifyArtistId: null, genreTags: ["techno", "industrial techno", "EBM"], profile: { hyped: 82, reputation: 85, vibe: "Powerful industrial techno and EBM with commanding stage presence.", targetAudience: "Industrial techno fans and EBM enthusiasts.", festivalContext: "Late-night industrial techno domination." } },

  // Bionic Jungle
  { id: "edc-heidi-juliet-masha", name: "Heidi Lawden B2B Juliet Mendoza B2B Masha Mar", spotifyArtistId: null, genreTags: ["house", "tech house", "melodic house"], profile: { hyped: 76, reputation: 70, vibe: "Three-way b2b session blending diverse house sounds.", targetAudience: "House music fans and b2b session lovers.", festivalContext: "A unique early-evening triple b2b to kick off the Bionic Jungle." } },
  { id: "edc-massibeland-paojara", name: "Massibeland B2B Paojara", spotifyArtistId: null, genreTags: ["techno", "dark techno", "industrial"], profile: { hyped: 70, reputation: 65, vibe: "Collaborative dark techno session with industrial undertones.", targetAudience: "Dark techno fans.", festivalContext: "Underground techno journey in the Bionic Jungle." } },
  { id: "edc-salute-chloe-caillet", name: "Salute B2B Chloe Caillet", spotifyArtistId: null, genreTags: ["house", "deep house", "bass house"], profile: { hyped: 78, reputation: 72, vibe: "Deep, soulful house music blending UK bass with French house aesthetics.", targetAudience: "House and bass music fans.", festivalContext: "Late-night house magic in the Bionic Jungle." } },

  // === DAY 2 ARTISTS ===
  // Kinetic Field
  { id: "edc-arco", name: "AR/CO", spotifyArtistId: null, genreTags: ["house", "tech house", "melodic"], profile: { hyped: 72, reputation: 65, vibe: "Smooth melodic house with a warm, inviting sound.", targetAudience: "House music fans and melodic lovers.", festivalContext: "Warm-up for an incredible Saturday night at Kinetic Field." } },
  { id: "edc-hayla", name: "HAYLA", spotifyArtistId: null, genreTags: ["house", "dance pop", "melodic"], profile: { hyped: 78, reputation: 72, vibe: "Soulful electronic vocals with infectious house production.", targetAudience: "Vocal house fans and melodic dance lovers.", festivalContext: "Beautiful vocal house to open the Kinetic Field on Saturday." } },
  { id: "edc-steve-aoki", name: "Steve Aoki", spotifyArtistId: "5WUlDfRSoLAfcVSX1WnrxN", genreTags: ["edm", "electro house", "high energy"], profile: { hyped: 92, reputation: 92, vibe: "The cake-throwing king of EDM with non-stop party energy.", targetAudience: "Party animals and festival veterans.", festivalContext: "Steve Aoki brings the madness to Saturday's Kinetic Field." } },
  { id: "edc-hardwell", name: "Hardwell", spotifyArtistId: "6hsHiqHB2NHfFaGOQIWBNL", genreTags: ["big room", "progressive house", "edm", "high energy"], profile: { hyped: 92, reputation: 93, vibe: "The world's top DJ delivering euphoric big room anthems.", targetAudience: "Mainstage EDM fans and big room lovers.", festivalContext: "A massive Saturday night headliner set at Kinetic Field." } },
  { id: "edc-john-summit-d2", name: "John Summit", spotifyArtistId: "4Qq3bBrlUjSXjsFbUVLAiO", genreTags: ["tech house", "house", "dance"], profile: { hyped: 90, reputation: 88, vibe: "Vibrant tech house with infectious grooves and radio-friendly anthems.", targetAudience: "Tech house fans and house music lovers.", festivalContext: "After-midnight tech house takeover at Kinetic Field." } },
  { id: "edc-peggy-gou-kiki", name: "Peggy Gou B2B KI/KI", spotifyArtistId: "4Dv1oGDJFuFzCGPnlRvnRC", genreTags: ["house", "tech house", "disco house"], profile: { hyped: 94, reputation: 93, vibe: "Two legendary selectors colliding in an iconic b2b session.", targetAudience: "House music aficionados and festival die-hards.", festivalContext: "One of the most anticipated b2b sets of the weekend." } },
  { id: "edc-subtronics", name: "Subtronics", spotifyArtistId: "3ALTERNATING", genreTags: ["dubstep", "bass", "riddim", "heavy"], profile: { hyped: 92, reputation: 88, vibe: "The riddim king with face-melting drops and innovative bass design.", targetAudience: "Bassheads and riddim fans.", festivalContext: "A devastating Kinetic Field bass takeover in the early morning." } },
  { id: "edc-kaskade", name: "Kaskade", spotifyArtistId: "6lhl3s9XMCjFhE5E9FpYfp", genreTags: ["progressive house", "edm", "melodic"], profile: { hyped: 88, reputation: 93, vibe: "Legendary progressive house icon delivering emotional, soaring anthems.", targetAudience: "Progressive house fans and EDM veterans.", festivalContext: "An emotional dawn performance — Kaskade at EDC is transcendent." } },
  { id: "edc-above-beyond", name: "Above & Beyond", spotifyArtistId: "4c0hJlHMXIBrOjCPYF9Srt", genreTags: ["trance", "progressive trance", "uplifting", "emotional"], profile: { hyped: 93, reputation: 97, vibe: "The most emotional trance group in the world — a spiritual experience.", targetAudience: "Trance family and emotional music seekers.", festivalContext: "The perfect closing performance for Saturday at Kinetic Field." } },

  // Circuit Grounds Day 2
  { id: "edc-dj-mandy", name: "DJ Mandy", spotifyArtistId: null, genreTags: ["techno", "house"], profile: { hyped: 65, reputation: 60, vibe: "Consistent, high-energy techno and house.", targetAudience: "Techno fans.", festivalContext: "Solid opener for Circuit Grounds on Saturday." } },
  { id: "edc-roz", name: "ROZ", spotifyArtistId: null, genreTags: ["bass", "dubstep", "electronic"], profile: { hyped: 70, reputation: 64, vibe: "Hard-hitting bass with creative sound design.", targetAudience: "Bass music fans.", festivalContext: "Bass energy building in the Circuit Grounds." } },
  { id: "edc-kettama", name: "KETTAMA", spotifyArtistId: null, genreTags: ["house", "tech house"], profile: { hyped: 75, reputation: 70, vibe: "Infectious tech house with underground flair.", targetAudience: "Tech house fans.", festivalContext: "Groovy tech house in the Circuit Grounds." } },
  { id: "edc-vtss", name: "VTSS", spotifyArtistId: null, genreTags: ["techno", "hard techno", "rave"], profile: { hyped: 84, reputation: 80, vibe: "Hard, relentless techno with a rebellious punk spirit.", targetAudience: "Hard techno fans and rave warriors.", festivalContext: "A ferocious techno set in the Circuit Grounds." } },
  { id: "edc-the-prodigy", name: "The Prodigy", spotifyArtistId: "4OR7F1OLGDKQM7ALTERNATING", genreTags: ["electronic", "big beat", "rave", "industrial"], profile: { hyped: 96, reputation: 98, vibe: "The legendary rave icons — Firestarter, Breathe, Smack My Bitch Up. Pure chaos.", targetAudience: "Rave veterans, rock lovers, and anyone who loves controlled chaos.", festivalContext: "The most electrifying live act on the entire lineup — do not miss." } },
  { id: "edc-bunt", name: "BUNT.", spotifyArtistId: null, genreTags: ["house", "afro house", "melodic"], profile: { hyped: 74, reputation: 68, vibe: "Warm, melodic house with afro-influenced rhythms.", targetAudience: "Melodic house fans.", festivalContext: "Post-Prodigy house cool-down." } },
  { id: "edc-boys-noize", name: "Boys Noize", spotifyArtistId: "1gMzFMJRkBkiOEn0Y8bnKV", genreTags: ["electro", "techno", "electronic"], profile: { hyped: 88, reputation: 86, vibe: "Raw industrial electro with a rebellious, punk spirit.", targetAudience: "Electro fans and industrial music lovers.", festivalContext: "Midnight electro destruction at Circuit Grounds." } },
  { id: "edc-malugi", name: "Malugi", spotifyArtistId: null, genreTags: ["techno", "hard techno"], profile: { hyped: 68, reputation: 62, vibe: "Hard-hitting techno with industrial precision.", targetAudience: "Hard techno fans.", festivalContext: "Pre-dawn techno in the Circuit Grounds." } },
  { id: "edc-lilly-palmer", name: "Lilly Palmer", spotifyArtistId: "2bkY1HgMUTEV3b0Aa2SVUR", genreTags: ["techno", "dark techno"], profile: { hyped: 80, reputation: 77, vibe: "Driving dark techno with deep, hypnotic basslines.", targetAudience: "Underground techno fans and night owls.", festivalContext: "Sunrise dark techno closing the Circuit Grounds on Saturday." } },

  // Basspod Day 2
  { id: "edc-fallen-mc-dino", name: "Fallen With MC Dino", spotifyArtistId: null, genreTags: ["drum and bass", "dnb", "liquid dnb"], profile: { hyped: 72, reputation: 66, vibe: "Liquid drum and bass with MC energy and crowd interaction.", targetAudience: "DNB fans and MC culture enthusiasts.", festivalContext: "Opening the Basspod with DNB energy on Saturday." } },
  { id: "edc-hybrid-minds", name: "Hybrid Minds", spotifyArtistId: "6LgVFPTHhXoQVDu2qiYmNF", genreTags: ["drum and bass", "liquid dnb", "melodic dnb"], profile: { hyped: 82, reputation: 80, vibe: "Liquid, melodic drum and bass that moves both body and soul.", targetAudience: "Liquid DNB fans and melodic music lovers.", festivalContext: "Beautiful, emotional DNB in the Basspod on Saturday." } },
  { id: "edc-ahmed-spins", name: "Ahmed Spins", spotifyArtistId: null, genreTags: ["house", "tech house", "electronic"], profile: { hyped: 76, reputation: 70, vibe: "High-energy electronic with diverse, global influences.", targetAudience: "Electronic music explorers.", festivalContext: "Eclectic Saturday night energy in the Basspod." } },
  { id: "edc-delta-heavy", name: "Delta Heavy", spotifyArtistId: "6ALTERNATING", genreTags: ["drum and bass", "dnb", "neurofunk"], profile: { hyped: 80, reputation: 76, vibe: "Heavy, neurofunk DNB with precise engineering and massive drops.", targetAudience: "DNB fans and neurofunk enthusiasts.", festivalContext: "Late-night DNB engineering in the Basspod." } },
  { id: "edc-getter", name: "Getter", spotifyArtistId: "5V1ALTERNATING", genreTags: ["dubstep", "bass", "heavy"], profile: { hyped: 84, reputation: 80, vibe: "Heavy dubstep and trap with genre-defying creativity.", targetAudience: "Bass fans and experimental music lovers.", festivalContext: "Midnight bass mayhem at the Basspod." } },
  { id: "edc-eptic-space-laces", name: "Eptic B2B Space Laces", spotifyArtistId: null, genreTags: ["dubstep", "bass", "heavy"], profile: { hyped: 84, reputation: 78, vibe: "Two heavy bass forces colliding in an explosive b2b session.", targetAudience: "Bassheads and dubstep enthusiasts.", festivalContext: "After-midnight bass destruction in the Basspod." } },
  { id: "edc-hol", name: "HOL!", spotifyArtistId: null, genreTags: ["bass", "dubstep", "experimental"], profile: { hyped: 74, reputation: 68, vibe: "Experimental bass music with creative sound design and energy.", targetAudience: "Bass music explorers.", festivalContext: "Experimental bass in the early morning Basspod." } },

  // Neon Garden Day 2
  { id: "edc-mink", name: "MINK", spotifyArtistId: null, genreTags: ["house", "melodic house", "deep house"], profile: { hyped: 68, reputation: 62, vibe: "Elegant, melodic house with a refined, underground sensibility.", targetAudience: "Melodic house fans.", festivalContext: "Sophisticated opening for Neon Garden on Saturday." } },
  { id: "edc-silvie-loto", name: "Silvie Loto", spotifyArtistId: null, genreTags: ["techno", "house", "melodic"], profile: { hyped: 72, reputation: 66, vibe: "Melodic techno and house with a sophisticated, Euro flair.", targetAudience: "European techno and house fans.", festivalContext: "Building the Neon Garden momentum on Saturday." } },
  { id: "edc-paul-oakenfold", name: "Paul Oakenfold", spotifyArtistId: "19ALTERNATING", genreTags: ["trance", "progressive house", "classic"], profile: { hyped: 84, reputation: 95, vibe: "A true pioneer of electronic music — atmospheric trance and progressive house.", targetAudience: "Electronic music historians and trance fans.", festivalContext: "A legendary set from one of the founding fathers of EDM." } },
  { id: "edc-luciano", name: "Luciano", spotifyArtistId: "3ALTERNATING", genreTags: ["house", "tech house", "minimal"], profile: { hyped: 82, reputation: 86, vibe: "Deep, hypnotic house and minimal techno with legendary Ibiza status.", targetAudience: "Underground house fans and Ibiza club culture enthusiasts.", festivalContext: "A deep house masterclass from a true Ibiza legend." } },
  { id: "edc-maddix", name: "Maddix", spotifyArtistId: "3OAZK5O9vBDlBvIJwrJtj5", genreTags: ["big room", "techno", "edm"], profile: { hyped: 80, reputation: 72, vibe: "High-energy big room sounds with a modern techno edge.", targetAudience: "Big room fans and techno enthusiasts.", festivalContext: "Powerful Neon Garden Saturday energy." } },
  { id: "edc-prospa", name: "Prospa", spotifyArtistId: null, genreTags: ["house", "melodic house", "electronic"], profile: { hyped: 74, reputation: 68, vibe: "Joyful, life-affirming house music with soulful influences.", targetAudience: "Feel-good house fans.", festivalContext: "Uplifting Saturday night house in the Neon Garden." } },
  { id: "edc-wax-motif", name: "Wax Motif", spotifyArtistId: null, genreTags: ["house", "bass house", "tech house"], profile: { hyped: 80, reputation: 75, vibe: "Bass-heavy house with funky, head-nodding grooves.", targetAudience: "Bass house and tech house fans.", festivalContext: "Late-night bass house energy in the Neon Garden." } },
  { id: "edc-cid", name: "CID", spotifyArtistId: null, genreTags: ["house", "tech house", "melodic"], profile: { hyped: 78, reputation: 72, vibe: "Funky tech house with a Los Angeles underground edge.", targetAudience: "Tech house fans and groove seekers.", festivalContext: "After-midnight house groove in the Neon Garden." } },
  { id: "edc-hntr", name: "HNTR", spotifyArtistId: null, genreTags: ["bass", "electronic", "house"], profile: { hyped: 65, reputation: 58, vibe: "Bass-forward electronic with hunting precision and energy.", targetAudience: "Bass music fans.", festivalContext: "Pre-dawn bass in the Neon Garden." } },
  { id: "edc-t78", name: "T78", spotifyArtistId: null, genreTags: ["techno", "tech house"], profile: { hyped: 72, reputation: 68, vibe: "Driving techno with precise, mechanical energy.", targetAudience: "Techno fans.", festivalContext: "Sunrise techno closing the Neon Garden on Saturday." } },

  // Quantum Valley Day 2
  { id: "edc-maria-healy", name: "Maria Healy", spotifyArtistId: null, genreTags: ["trance", "melodic trance", "progressive"], profile: { hyped: 76, reputation: 70, vibe: "Uplifting trance with emotional depth and technical precision.", targetAudience: "Trance fans and melodic music lovers.", festivalContext: "Beautiful trance opening for Saturday's Quantum Valley." } },
  { id: "edc-dreya-v", name: "Dreya V", spotifyArtistId: null, genreTags: ["trance", "progressive trance"], profile: { hyped: 70, reputation: 64, vibe: "Progressive trance with evolving, emotional soundscapes.", targetAudience: "Progressive trance fans.", festivalContext: "Building the Quantum Valley energy on Saturday." } },
  { id: "edc-andrew-rayel", name: "Andrew Rayel", spotifyArtistId: "3ALTERNATING", genreTags: ["trance", "uplifting trance", "melodic"], profile: { hyped: 84, reputation: 82, vibe: "Emotional, powerful trance with incredible technical production.", targetAudience: "Trance fans and uplifting music lovers.", festivalContext: "Peak-time emotional trance in the Quantum Valley." } },
  { id: "edc-mathame", name: "Mathame", spotifyArtistId: null, genreTags: ["melodic techno", "progressive", "dark melodic"], profile: { hyped: 80, reputation: 78, vibe: "Italian duo delivering cinematic melodic techno with dark, epic textures.", targetAudience: "Melodic techno fans.", festivalContext: "Late-night cinematic melodic techno in Quantum Valley." } },
  { id: "edc-lady-faith-lny-tnz", name: "Lady Faith B2B LNY TNZ", spotifyArtistId: null, genreTags: ["hardstyle", "euphoric hardstyle", "hard dance"], profile: { hyped: 80, reputation: 76, vibe: "Euphoric hardstyle b2b with uplifting energy and powerful kicks.", targetAudience: "Hardstyle fans and hard dance enthusiasts.", festivalContext: "Hardstyle takeover in the Quantum Valley on Saturday." } },
  { id: "edc-da-tweekaz", name: "Da Tweekaz", spotifyArtistId: "3pEm6V4C0dVMFEFXDpSsTJ", genreTags: ["hardstyle", "happy hardstyle"], profile: { hyped: 84, reputation: 80, vibe: "Energetic happy hardstyle with playful, catchy melodies.", targetAudience: "Hardstyle fans and those seeking a joyful twist.", festivalContext: "Playful hardstyle energy in the Quantum Valley." } },
  { id: "edc-lil-texas", name: "Lil Texas", spotifyArtistId: null, genreTags: ["hardstyle", "hard dance", "rave"], profile: { hyped: 82, reputation: 76, vibe: "Fast, hard-hitting DJ with relentless energy and crowd interaction.", targetAudience: "Hardstyle and hard dance fans.", festivalContext: "After-midnight hardstyle rampage in Quantum Valley." } },
  { id: "edc-mish", name: "MISH", spotifyArtistId: null, genreTags: ["hardstyle", "euphoric hardstyle"], profile: { hyped: 78, reputation: 72, vibe: "Melodic hardstyle with euphoric peaks and powerful kicks.", targetAudience: "Euphoric hardstyle fans.", festivalContext: "Pre-dawn hardstyle euphoria in Quantum Valley." } },
  { id: "edc-alyssa-jolee", name: "Alyssa Jolee", spotifyArtistId: null, genreTags: ["hardstyle", "euphoric hardstyle"], profile: { hyped: 72, reputation: 65, vibe: "Emotional euphoric hardstyle with powerful, uplifting builds.", targetAudience: "Euphoric hardstyle fans.", festivalContext: "Sunrise hardstyle to close Quantum Valley on Saturday." } },

  // === DAY 3 ARTISTS ===
  // Kinetic Field
  { id: "edc-trace", name: "TRACE", spotifyArtistId: null, genreTags: ["drum and bass", "dnb"], profile: { hyped: 78, reputation: 80, vibe: "Veteran DNB artist with a deep catalog and precise mixing.", targetAudience: "DNB fans and drum machine enthusiasts.", festivalContext: "Sunday opener at Kinetic Field with drum and bass class." } },
  { id: "edc-ship-wrek", name: "Ship Wrek", spotifyArtistId: null, genreTags: ["edm", "house", "electronic"], profile: { hyped: 80, reputation: 75, vibe: "High-energy EDM and house with passionate crowd connection.", targetAudience: "EDM fans and house music lovers.", festivalContext: "Building Sunday's Kinetic Field energy with feel-good EDM." } },
  { id: "edc-layton-giordani", name: "Layton Giordani", spotifyArtistId: null, genreTags: ["techno", "melodic techno", "progressive"], profile: { hyped: 82, reputation: 78, vibe: "Deep, melodic techno with a progressive, evolving sound.", targetAudience: "Melodic techno fans.", festivalContext: "Peak-time melodic techno as Sunday night heats up." } },
  { id: "edc-funk-tribu", name: "Funk Tribu", spotifyArtistId: null, genreTags: ["house", "afro house", "tribal"], profile: { hyped: 74, reputation: 68, vibe: "Tribal, afro-influenced house with infectious rhythms.", targetAudience: "Afro house fans and tribal music lovers.", festivalContext: "Afro house energy in the Kinetic Field on Sunday." } },
  { id: "edc-griz-wooli", name: "Griz B2B Wooli", spotifyArtistId: "6pP7LWMHNGRPLQxhHxPfim", genreTags: ["electronic", "bass", "dubstep", "festival"], profile: { hyped: 86, reputation: 82, vibe: "Two beloved festival acts in an explosive b2b session.", targetAudience: "Festival veterans and bass music fans.", festivalContext: "A legendary b2b that brings the Sunday festival vibe to a peak." } },
  { id: "edc-zedd", name: "Zedd", spotifyArtistId: "2qxJFvFYMEDqd7ui9kx2w6", genreTags: ["edm", "electro house", "progressive house", "melodic"], profile: { hyped: 94, reputation: 96, vibe: "Grammy-winning producer with massive anthems and stunning production.", targetAudience: "EDM fans, pop lovers, and electronic music enthusiasts worldwide.", festivalContext: "The Sunday headliner that unites everyone at Kinetic Field." } },
  { id: "edc-martin-garrix", name: "Martin Garrix", spotifyArtistId: "60d24wfXkVkFJzIpAihY4V", genreTags: ["progressive house", "big room", "edm", "high energy"], profile: { hyped: 95, reputation: 97, vibe: "One of the world's greatest DJs delivering euphoric progressive house.", targetAudience: "Mainstage EDM fans and festival die-hards.", festivalContext: "Martin Garrix at EDC is an unmissable Sunday night moment." } },
  { id: "edc-armin-van-buuren", name: "Armin van Buuren", spotifyArtistId: "0MlOPi3zIDMVrfA9R04Ya3", genreTags: ["trance", "progressive trance", "uplifting", "emotional"], profile: { hyped: 97, reputation: 100, vibe: "The undisputed king of trance — legendary, emotional, transcendent.", targetAudience: "Trance family, electronic music fans, and anyone with a pulse.", festivalContext: "Closing EDC on Sunday night with Armin van Buuren is a once-in-a-lifetime experience." } },

  // Circuit Grounds Day 3
  { id: "edc-linska", name: "Linska", spotifyArtistId: null, genreTags: ["house", "tech house"], profile: { hyped: 65, reputation: 60, vibe: "Fresh, groovy house with a modern underground sensibility.", targetAudience: "House music fans.", festivalContext: "Sunday Circuit Grounds opener." } },
  { id: "edc-nostalgix", name: "Nostalgix", spotifyArtistId: "4pFcKDCGBbECJXfbPIpNFv", genreTags: ["bass house", "house", "bass"], profile: { hyped: 74, reputation: 70, vibe: "Bass-heavy house with a nostalgic, throwback vibe.", targetAudience: "Bass house fans.", festivalContext: "Building Circuit Grounds energy on Sunday." } },
  { id: "edc-anna", name: "ANNA", spotifyArtistId: null, genreTags: ["techno", "melodic techno", "dark"], profile: { hyped: 85, reputation: 83, vibe: "Brazilian techno artist with deep, dark, and melodic sounds.", targetAudience: "Techno fans and melodic music lovers.", festivalContext: "Intense techno energy in the Circuit Grounds on Sunday." } },
  { id: "edc-beltran", name: "Beltran", spotifyArtistId: null, genreTags: ["techno", "house", "progressive"], profile: { hyped: 72, reputation: 66, vibe: "Driving techno and house with a fresh, progressive approach.", targetAudience: "Techno and progressive house fans.", festivalContext: "Building Sunday's Circuit Grounds momentum." } },
  { id: "edc-dabin", name: "Dabin", spotifyArtistId: "6ALTERNATING", genreTags: ["melodic bass", "future bass", "emotional"], profile: { hyped: 78, reputation: 74, vibe: "Live guitar-infused future bass with emotional, melodic layers.", targetAudience: "Melodic bass fans and live electronic enthusiasts.", festivalContext: "Emotional melodic bass in Circuit Grounds on Sunday night." } },
  { id: "edc-chris-stussy", name: "Chris Stussy", spotifyArtistId: null, genreTags: ["house", "deep house", "melodic house"], profile: { hyped: 78, reputation: 74, vibe: "Deep, melodic house from the Dutch underground.", targetAudience: "Deep house fans and melodic music lovers.", festivalContext: "Late-night deep house in the Circuit Grounds." } },
  { id: "edc-solomun", name: "Solomun", spotifyArtistId: "2ALTERNATING", genreTags: ["house", "melodic house", "deep house"], profile: { hyped: 93, reputation: 97, vibe: "The undisputed king of melodic house — a transcendent DJ experience.", targetAudience: "House music lovers and dance music connoisseurs.", festivalContext: "Solomun at Circuit Grounds is one of the most special Sunday night moments." } },
  { id: "edc-vintage-culture", name: "Vintage Culture", spotifyArtistId: "0h4ALExZSMg69niHrXdBPT", genreTags: ["house", "deep house", "melodic house"], profile: { hyped: 87, reputation: 86, vibe: "Brazilian house icon with warm, uplifting house music.", targetAudience: "House music fans and dance floor enthusiasts.", festivalContext: "Late-night house warmth from one of Brazil's finest." } },
  { id: "edc-kevin-de-vries", name: "Kevin de Vries", spotifyArtistId: null, genreTags: ["techno", "melodic techno", "progressive"], profile: { hyped: 82, reputation: 78, vibe: "Rising techno talent with powerful, melodic sets.", targetAudience: "Melodic techno fans.", festivalContext: "Sunrise techno closing Circuit Grounds on Sunday." } },

  // Neon Garden Day 3
  { id: "edc-bad-beat", name: "Bad Beat", spotifyArtistId: null, genreTags: ["house", "tech house"], profile: { hyped: 65, reputation: 58, vibe: "Energetic opener with feel-good house grooves.", targetAudience: "House music fans.", festivalContext: "Opening Neon Garden for the final day." } },
  { id: "edc-frankie-bones", name: "Frankie Bones", spotifyArtistId: null, genreTags: ["techno", "rave", "classic"], profile: { hyped: 78, reputation: 88, vibe: "A rave pioneer — Frankie Bones helped define electronic music in the US.", targetAudience: "Rave historians and electronic music veterans.", festivalContext: "A legendary presence paying tribute to the roots of rave culture." } },
  { id: "edc-rebuke", name: "Rebuke", spotifyArtistId: null, genreTags: ["techno", "house", "melodic techno"], profile: { hyped: 80, reputation: 76, vibe: "Innovative techno and house from the Irish underground.", targetAudience: "Techno and house fans.", festivalContext: "Sunday night techno energy in the Neon Garden." } },
  { id: "edc-adiel", name: "Adiel", spotifyArtistId: null, genreTags: ["techno", "industrial techno", "EBM"], profile: { hyped: 83, reputation: 80, vibe: "Italian techno artist with an industrial, powerful sound.", targetAudience: "Industrial techno fans.", festivalContext: "Intense Sunday techno in the Neon Garden." } },
  { id: "edc-eli-fur", name: "Eli & Fur", spotifyArtistId: "4ALTERNATING", genreTags: ["melodic techno", "house", "electronic"], profile: { hyped: 82, reputation: 80, vibe: "UK duo delivering melodic, emotional electronic music.", targetAudience: "Melodic house and electronic fans.", festivalContext: "Emotional melodic techno and house in the Sunday Neon Garden." } },
  { id: "edc-tinlicker", name: "Tinlicker", spotifyArtistId: "6yNhHJV5ALTERNATING", genreTags: ["melodic house", "progressive house", "emotional"], profile: { hyped: 80, reputation: 78, vibe: "Dutch duo with warm, emotional melodic house.", targetAudience: "Melodic house fans and emotional electronic lovers.", festivalContext: "Post-midnight emotional house journey in the Neon Garden." } },
  { id: "edc-cassian", name: "Cassian", spotifyArtistId: "0HS3BHXhN7xgbXsTfyQDcH", genreTags: ["house", "melodic house", "indie dance"], profile: { hyped: 76, reputation: 72, vibe: "Smooth, melodic house with a touch of indie and nostalgia.", targetAudience: "Melodic house fans.", festivalContext: "Late-night house in the Neon Garden to close out Sunday." } },
  { id: "edc-kiki", name: "KI/KI", spotifyArtistId: null, genreTags: ["house", "tech house", "dark house"], profile: { hyped: 80, reputation: 76, vibe: "Dark, sophisticated house music with underground Ibiza flair.", targetAudience: "Underground house fans.", festivalContext: "Dark house energy in the dawn Neon Garden on Sunday." } },

  // Quantum Valley Day 3
  { id: "edc-klo", name: "KLO", spotifyArtistId: null, genreTags: ["trance", "melodic", "progressive"], profile: { hyped: 72, reputation: 66, vibe: "Melodic trance with uplifting energy and soaring builds.", targetAudience: "Trance fans.", festivalContext: "Trance opening for Sunday's Quantum Valley." } },
  { id: "edc-shingo-nakamura", name: "Shingo Nakamura", spotifyArtistId: null, genreTags: ["trance", "melodic trance", "progressive"], profile: { hyped: 78, reputation: 82, vibe: "Japanese trance producer with emotional, cinematic sounds.", targetAudience: "Melodic trance fans and Japanese music enthusiasts.", festivalContext: "A beautiful trance journey from Japan to EDC." } },
  { id: "edc-cristoph", name: "Cristoph", spotifyArtistId: null, genreTags: ["techno", "melodic techno", "progressive"], profile: { hyped: 80, reputation: 76, vibe: "UK techno talent with driving, evolving progressive sounds.", targetAudience: "Progressive techno fans.", festivalContext: "Driving Sunday night techno in Quantum Valley." } },
  { id: "edc-skream", name: "Skream", spotifyArtistId: "6ALTERNATING", genreTags: ["dubstep", "house", "electronic"], profile: { hyped: 86, reputation: 90, vibe: "Dubstep originator turned house DJ — a true electronic music legend.", targetAudience: "Dubstep fans and house music lovers.", festivalContext: "A legendary set from one of UK bass music's founding figures." } },
  { id: "edc-hamdi", name: "Hamdi", spotifyArtistId: "3FIcBX7Wvv0YCCIbQOc1Tc", genreTags: ["dubstep", "bass", "middle eastern"], profile: { hyped: 78, reputation: 74, vibe: "Bass music with Middle Eastern influences and cultural depth.", targetAudience: "Bass music fans and global electronic lovers.", festivalContext: "Unique cultural bass music in Sunday's Quantum Valley." } },
  { id: "edc-silva-bumpa", name: "Silva Bumpa", spotifyArtistId: null, genreTags: ["bass", "electronic", "club"], profile: { hyped: 68, reputation: 62, vibe: "Bass-heavy club music with infectious rhythms.", targetAudience: "Club music fans.", festivalContext: "Early morning bass in the Quantum Valley on Sunday." } },
  { id: "edc-massano", name: "Massano", spotifyArtistId: "4Jd9BLMAvNQOFPOaUMg6Bw", genreTags: ["melodic techno", "techno"], profile: { hyped: 68, reputation: 64, vibe: "Melodic techno with a deep, emotional core.", targetAudience: "Melodic techno enthusiasts.", festivalContext: "Late-night melodic techno in Sunday's Quantum Valley." } },
  { id: "edc-lu-re", name: "LU.RE", spotifyArtistId: null, genreTags: ["techno", "melodic techno"], profile: { hyped: 70, reputation: 65, vibe: "Evolving melodic techno with a modern, progressive approach.", targetAudience: "Melodic techno fans.", festivalContext: "Sunrise closing for the Quantum Valley on Sunday." } },

  // Cosmic Meadow Day 3
  { id: "edc-graverz", name: "GRAVERZ", spotifyArtistId: null, genreTags: ["bass", "electronic", "dubstep"], profile: { hyped: 68, reputation: 62, vibe: "Gritty bass music with dark, underground energy.", targetAudience: "Bass music fans.", festivalContext: "Opening the Cosmic Meadow for the final day." } },
  { id: "edc-william-black", name: "William Black", spotifyArtistId: "2ALTERNATING", genreTags: ["future bass", "melodic", "electronic", "emotional"], profile: { hyped: 80, reputation: 76, vibe: "Emotional future bass with cinematic, heartfelt productions.", targetAudience: "Future bass and emotional electronic fans.", festivalContext: "Beautiful emotional electronic to open Sunday at Cosmic Meadow." } },
  { id: "edc-san-holo", name: "San Holo", spotifyArtistId: "7Gv4ALTERNATING", genreTags: ["future bass", "melodic", "electronic"], profile: { hyped: 82, reputation: 80, vibe: "Guitar-infused future bass with joyful, emotional energy.", targetAudience: "Future bass fans and indie electronic lovers.", festivalContext: "Live guitar future bass joy in Sunday's Cosmic Meadow." } },
  { id: "edc-virtual-riot", name: "Virtual Riot", spotifyArtistId: "0jlNxIHBFMkpWEHXBR5ALTERNATING", genreTags: ["dubstep", "bass", "electronic"], profile: { hyped: 86, reputation: 82, vibe: "Technically brilliant bass music with incredible sound design.", targetAudience: "Bass music fans and production enthusiasts.", festivalContext: "Technical bass masterclass in the Cosmic Meadow." } },
  { id: "edc-alison-wonderland", name: "Alison Wonderland", spotifyArtistId: "2ALTERNATING", genreTags: ["bass", "electronic", "future bass", "emotional"], profile: { hyped: 88, reputation: 86, vibe: "Australian bass music powerhouse with raw, emotional sets.", targetAudience: "Bass music fans and emotional electronic lovers.", festivalContext: "After-midnight emotional bass in Sunday's Cosmic Meadow." } },
  { id: "edc-whethan", name: "Whethan", spotifyArtistId: "6ALTERNATING", genreTags: ["future bass", "electronic", "indie dance"], profile: { hyped: 76, reputation: 72, vibe: "Indie-infused future bass with youthful energy and melodic sensibility.", targetAudience: "Future bass fans and indie electronic lovers.", festivalContext: "Pre-dawn future bass in the Sunday Cosmic Meadow." } },

  // Basspod Day 3
  { id: "edc-sippy", name: "Sippy", spotifyArtistId: null, genreTags: ["bass", "dubstep", "electronic"], profile: { hyped: 74, reputation: 68, vibe: "Hard-hitting bass music with creative production and energy.", targetAudience: "Bass music fans.", festivalContext: "Sunday Basspod energy." } },
  { id: "edc-ezybaked", name: "Ezybaked", spotifyArtistId: null, genreTags: ["bass", "experimental bass", "electronic"], profile: { hyped: 70, reputation: 64, vibe: "Experimental, creative bass with an easygoing approach.", targetAudience: "Experimental bass fans.", festivalContext: "Creative bass exploration in Sunday's Basspod." } },
  { id: "edc-infekt-samplifire", name: "Infekt B2B Samplifire", spotifyArtistId: null, genreTags: ["dubstep", "bass", "heavy"], profile: { hyped: 80, reputation: 75, vibe: "Heavy dubstep b2b with crushing bass and relentless energy.", targetAudience: "Bassheads and dubstep fans.", festivalContext: "Devastating Sunday bass b2b in the Basspod." } },
  { id: "edc-peekaboo", name: "Peekaboo", spotifyArtistId: "3WBVxQVmzC3rJiNfN2ufni", genreTags: ["bass", "dubstep", "experimental bass"], profile: { hyped: 87, reputation: 80, vibe: "Dark, heavy bass that rattles your core with innovative sound design.", targetAudience: "Bass enthusiasts and headbangers.", festivalContext: "Prime-time Sunday Basspod destruction." } },
  { id: "edc-999999999", name: "999999999", spotifyArtistId: "6ThivdtzBpKPMJnlqirski", genreTags: ["techno", "industrial techno", "hard techno"], profile: { hyped: 92, reputation: 85, vibe: "Relentless industrial techno with pounding beats and hypnotic rhythms.", targetAudience: "Hard techno lovers and rave warriors.", festivalContext: "A devastating industrial techno set in the Sunday Basspod." } },
  { id: "edc-black-tiger-sex-machine", name: "Black Tiger Sex Machine", spotifyArtistId: "6GGOIqFCqnOCQVWdBdW8Wy", genreTags: ["electro", "bass", "dubstep", "sci-fi"], profile: { hyped: 88, reputation: 84, vibe: "High-intensity sci-fi bass music with futuristic visuals and energy.", targetAudience: "Bassheads and sci-fi music fans.", festivalContext: "Post-midnight sci-fi bass invasion in the Sunday Basspod." } },
  { id: "edc-indira-paganotto", name: "Indira Paganotto", spotifyArtistId: null, genreTags: ["techno", "hard techno", "industrial"], profile: { hyped: 86, reputation: 82, vibe: "Ferocious techno from one of the hardest working artists in the genre.", targetAudience: "Hard techno fans.", festivalContext: "Intense Sunday techno in the Basspod." } },

  // Wasteland & Bionic Jungle Day 3
  { id: "edc-sihk", name: "SIHK", spotifyArtistId: null, genreTags: ["techno", "industrial", "EBM"], profile: { hyped: 74, reputation: 68, vibe: "Industrial electronic with a dark, commanding presence.", targetAudience: "Industrial music fans.", festivalContext: "Dark industrial opener for Sunday at Wasteland." } },
  { id: "edc-kream", name: "KREAM", spotifyArtistId: null, genreTags: ["house", "electronic", "melodic"], profile: { hyped: 72, reputation: 66, vibe: "Smooth electronic and house with cream-of-the-crop production.", targetAudience: "House music fans.", festivalContext: "Sunrise house in the Wasteland on Sunday." } },
  { id: "edc-alves", name: "Alves", spotifyArtistId: null, genreTags: ["techno", "house", "electronic"], profile: { hyped: 65, reputation: 58, vibe: "Clean, precise electronic music with a fresh approach.", targetAudience: "Electronic music fans.", festivalContext: "Opening Bionic Jungle on Sunday." } },
  { id: "edc-vieze-asbak", name: "Vieze Asbak", spotifyArtistId: null, genreTags: ["hardstyle", "hard dance", "gabber"], profile: { hyped: 76, reputation: 70, vibe: "Raw, uncompromising hard dance with Dutch hardcore roots.", targetAudience: "Hardcore and hard dance fans.", festivalContext: "Hard-hitting Dutch hardcore in the Sunday venue." } },
  { id: "edc-warface", name: "Warface", spotifyArtistId: null, genreTags: ["hardstyle", "raw hardstyle", "hard dance"], profile: { hyped: 82, reputation: 78, vibe: "Aggressive rawstyle with military precision and relentless energy.", targetAudience: "Rawstyle fans and hardcore enthusiasts.", festivalContext: "Warface brings the weapons-grade rawstyle to Sunday." } },
  { id: "edc-morgan-seatree", name: "Morgan Seatree", spotifyArtistId: null, genreTags: ["techno", "house", "melodic"], profile: { hyped: 68, reputation: 62, vibe: "Melodic electronic with a thoughtful, artistic approach.", targetAudience: "Melodic techno and house fans.", festivalContext: "Late-night electronic in Sunday's Quantum Valley area." } },
  { id: "edc-dj-gigola", name: "DJ Gigola", spotifyArtistId: null, genreTags: ["trance", "hard trance", "rave"], profile: { hyped: 70, reputation: 64, vibe: "Hard trance with relentless energy and rave culture roots.", targetAudience: "Hard trance fans.", festivalContext: "Hard trance energy in Sunday's Neon Garden." } },
  { id: "edc-cloonee", name: "Cloonee", spotifyArtistId: null, genreTags: ["house", "tech house", "bass house"], profile: { hyped: 78, reputation: 72, vibe: "Irish tech house with infectious, driving grooves.", targetAudience: "Tech house fans.", festivalContext: "Pre-dawn tech house in Sunday's Kinetic Field." } },
  { id: "edc-armin-de-vries", name: "Armin de Vries", spotifyArtistId: null, genreTags: ["trance", "melodic trance"], profile: { hyped: 70, reputation: 65, vibe: "Melodic trance with a fresh, modern approach.", targetAudience: "Trance fans.", festivalContext: "Pre-Armin van Buuren trance warm-up at Kinetic Field." } },
];

export const artistMap = Object.fromEntries(artists.map((a) => [a.id, a]));

export const sets: SetSlot[] = [
  // ============ DAY 1 — FRIDAY MAY 15 ============

  // Kinetic Field
  { id: "e1-kf-1", day: 1, artistId: "edc-laidback-luke-chuckie", stageId: "kinetic-field", startTime: "19:00", endTime: "20:00" },
  { id: "e1-kf-2", day: 1, artistId: "edc-korolova", stageId: "kinetic-field", startTime: "20:00", endTime: "21:00" },
  { id: "e1-kf-3", day: 1, artistId: "edc-argy", stageId: "kinetic-field", startTime: "21:00", endTime: "22:07" },
  { id: "e1-kf-4", day: 1, artistId: "edc-chris-lorenzo", stageId: "kinetic-field", startTime: "22:07", endTime: "23:19" },
  { id: "e1-kf-5", day: 1, artistId: "edc-sofi-tukker", stageId: "kinetic-field", startTime: "23:19", endTime: "00:32" },
  { id: "e1-kf-6", day: 1, artistId: "edc-chainsmokers", stageId: "kinetic-field", startTime: "00:32", endTime: "01:47" },
  { id: "e1-kf-7", day: 1, artistId: "edc-fisher", stageId: "kinetic-field", startTime: "01:47", endTime: "03:01" },
  { id: "e1-kf-8", day: 1, artistId: "edc-porter-robinson", stageId: "kinetic-field", startTime: "03:01", endTime: "04:14" },
  { id: "e1-kf-9", day: 1, artistId: "edc-charlotte-de-witte", stageId: "kinetic-field", startTime: "04:14", endTime: "05:00" },

  // Circuit Grounds
  { id: "e1-cg-1", day: 1, artistId: "edc-1991", stageId: "circuit-grounds", startTime: "19:00", endTime: "20:00" },
  { id: "e1-cg-2", day: 1, artistId: "edc-bou", stageId: "circuit-grounds", startTime: "20:00", endTime: "21:00" },
  { id: "e1-cg-3", day: 1, artistId: "edc-nico-moreno", stageId: "circuit-grounds", startTime: "21:00", endTime: "22:00" },
  { id: "e1-cg-4", day: 1, artistId: "edc-i-hate-models", stageId: "circuit-grounds", startTime: "22:00", endTime: "23:15" },
  { id: "e1-cg-5", day: 1, artistId: "edc-levity", stageId: "circuit-grounds", startTime: "23:15", endTime: "00:25" },
  { id: "e1-cg-6", day: 1, artistId: "edc-wooli", stageId: "circuit-grounds", startTime: "00:25", endTime: "01:35" },
  { id: "e1-cg-7", day: 1, artistId: "edc-the-outlaw", stageId: "circuit-grounds", startTime: "01:35", endTime: "02:35" },
  { id: "e1-cg-8", day: 1, artistId: "edc-holy-priest", stageId: "circuit-grounds", startTime: "02:35", endTime: "03:30" },
  { id: "e1-cg-9", day: 1, artistId: "edc-ray-volpe", stageId: "circuit-grounds", startTime: "03:30", endTime: "04:30" },
  { id: "e1-cg-10", day: 1, artistId: "edc-level-up", stageId: "circuit-grounds", startTime: "04:30", endTime: "05:00" },

  // Cosmic Meadow
  { id: "e1-cm-1", day: 1, artistId: "edc-jackie-hollander", stageId: "cosmic-meadow", startTime: "19:00", endTime: "19:55" },
  { id: "e1-cm-2", day: 1, artistId: "edc-roddy-lima", stageId: "cosmic-meadow", startTime: "19:55", endTime: "20:55" },
  { id: "e1-cm-3", day: 1, artistId: "edc-westend", stageId: "cosmic-meadow", startTime: "20:55", endTime: "21:55" },
  { id: "e1-cm-4", day: 1, artistId: "edc-walker-boyce-vnssa", stageId: "cosmic-meadow", startTime: "21:55", endTime: "23:10" },
  { id: "e1-cm-5", day: 1, artistId: "edc-underworld", stageId: "cosmic-meadow", startTime: "23:10", endTime: "00:25" },
  { id: "e1-cm-6", day: 1, artistId: "edc-meduza", stageId: "cosmic-meadow", startTime: "00:25", endTime: "01:47" },
  { id: "e1-cm-7", day: 1, artistId: "edc-notion", stageId: "cosmic-meadow", startTime: "01:47", endTime: "02:47" },
  { id: "e1-cm-8", day: 1, artistId: "edc-mph", stageId: "cosmic-meadow", startTime: "02:47", endTime: "03:30" },
  { id: "e1-cm-9", day: 1, artistId: "edc-san-pacho", stageId: "cosmic-meadow", startTime: "03:30", endTime: "04:30" },

  // Basspod
  { id: "e1-bp-1", day: 1, artistId: "edc-max-dean-luke-dean", stageId: "basspod", startTime: "17:00", endTime: "19:00" },
  { id: "e1-bp-2", day: 1, artistId: "edc-riot", stageId: "basspod", startTime: "19:00", endTime: "19:50" },
  { id: "e1-bp-3", day: 1, artistId: "edc-heyz", stageId: "basspod", startTime: "19:50", endTime: "20:40" },
  { id: "e1-bp-4", day: 1, artistId: "edc-muzz", stageId: "basspod", startTime: "20:40", endTime: "21:30" },
  { id: "e1-bp-5", day: 1, artistId: "edc-ghengar", stageId: "basspod", startTime: "21:30", endTime: "22:30" },
  { id: "e1-bp-6", day: 1, artistId: "edc-deathpact", stageId: "basspod", startTime: "23:30", endTime: "00:30" },
  { id: "e1-bp-7", day: 1, artistId: "edc-atliens", stageId: "basspod", startTime: "00:30", endTime: "01:30" },
  { id: "e1-bp-8", day: 1, artistId: "edc-kai-wachi", stageId: "basspod", startTime: "01:30", endTime: "02:30" },
  { id: "e1-bp-9", day: 1, artistId: "edc-adventure-club", stageId: "basspod", startTime: "02:30", endTime: "03:30" },
  { id: "e1-bp-10", day: 1, artistId: "edc-culture-shock", stageId: "basspod", startTime: "03:30", endTime: "04:02" },
  { id: "e1-bp-11", day: 1, artistId: "edc-cyclops", stageId: "basspod", startTime: "04:02", endTime: "05:00" },

  // Neon Garden
  { id: "e1-ng-1", day: 1, artistId: "edc-anastazia", stageId: "neon-garden", startTime: "19:00", endTime: "20:00" },
  { id: "e1-ng-2", day: 1, artistId: "edc-matty-ralph", stageId: "neon-garden", startTime: "20:00", endTime: "21:00" },
  { id: "e1-ng-3", day: 1, artistId: "edc-mestiza", stageId: "neon-garden", startTime: "21:00", endTime: "22:00" },
  { id: "e1-ng-4", day: 1, artistId: "edc-dj-tennis-chloe-caillet", stageId: "neon-garden", startTime: "22:00", endTime: "23:00" },
  { id: "e1-ng-5", day: 1, artistId: "edc-peggy-gou", stageId: "neon-garden", startTime: "23:30", endTime: "00:30" },
  { id: "e1-ng-6", day: 1, artistId: "edc-cosmic-gate", stageId: "neon-garden", startTime: "00:30", endTime: "01:30" },
  { id: "e1-ng-7", day: 1, artistId: "edc-gareth-emery", stageId: "neon-garden", startTime: "01:30", endTime: "02:30" },
  { id: "e1-ng-8", day: 1, artistId: "edc-adriatique", stageId: "neon-garden", startTime: "02:30", endTime: "03:30" },
  { id: "e1-ng-9", day: 1, artistId: "edc-joseph-capriati", stageId: "neon-garden", startTime: "03:30", endTime: "04:30" },
  { id: "e1-ng-10", day: 1, artistId: "edc-paul-van-dyk", stageId: "neon-garden", startTime: "04:30", endTime: "05:00" },

  // Quantum Valley
  { id: "e1-qv-1", day: 1, artistId: "edc-sarah-de-warren", stageId: "quantum-valley", startTime: "19:00", endTime: "20:00" },
  { id: "e1-qv-2", day: 1, artistId: "edc-slamm", stageId: "quantum-valley", startTime: "20:00", endTime: "21:00" },
  { id: "e1-qv-3", day: 1, artistId: "edc-cold-blue-van-dijk", stageId: "quantum-valley", startTime: "21:00", endTime: "22:00" },
  { id: "e1-qv-4", day: 1, artistId: "edc-omar-plus", stageId: "quantum-valley", startTime: "22:00", endTime: "23:00" },
  { id: "e1-qv-5", day: 1, artistId: "edc-darude", stageId: "quantum-valley", startTime: "23:00", endTime: "00:00" },
  { id: "e1-qv-6", day: 1, artistId: "edc-luke-dean", stageId: "quantum-valley", startTime: "00:00", endTime: "01:00" },
  { id: "e1-qv-7", day: 1, artistId: "edc-josh-baker", stageId: "quantum-valley", startTime: "01:00", endTime: "02:00" },
  { id: "e1-qv-8", day: 1, artistId: "edc-ilan-bluestone", stageId: "quantum-valley", startTime: "02:00", endTime: "03:00" },
  { id: "e1-qv-9", day: 1, artistId: "edc-max-dean", stageId: "quantum-valley", startTime: "03:00", endTime: "04:00" },
  { id: "e1-qv-10", day: 1, artistId: "edc-dyen", stageId: "quantum-valley", startTime: "04:00", endTime: "05:00" },

  // Stereo Bloom
  { id: "e1-sb-1", day: 1, artistId: "edc-domina", stageId: "stereo-bloom", startTime: "19:00", endTime: "20:30" },
  { id: "e1-sb-2", day: 1, artistId: "edc-serafina", stageId: "stereo-bloom", startTime: "20:30", endTime: "22:00" },
  { id: "e1-sb-3", day: 1, artistId: "edc-paramida", stageId: "stereo-bloom", startTime: "22:00", endTime: "23:30" },
  { id: "e1-sb-4", day: 1, artistId: "edc-kuko", stageId: "stereo-bloom", startTime: "00:30", endTime: "02:00" },
  { id: "e1-sb-5", day: 1, artistId: "edc-robert-hood", stageId: "stereo-bloom", startTime: "02:30", endTime: "04:00" },
  { id: "e1-sb-6", day: 1, artistId: "edc-avalon-emerson", stageId: "stereo-bloom", startTime: "04:00", endTime: "05:00" },

  // Wasteland
  { id: "e1-wl-1", day: 1, artistId: "edc-stacy-christiane", stageId: "wasteland", startTime: "19:00", endTime: "20:30" },
  { id: "e1-wl-2", day: 1, artistId: "edc-the-carry-nation", stageId: "wasteland", startTime: "20:30", endTime: "22:00" },
  { id: "e1-wl-3", day: 1, artistId: "edc-johannes-schuster", stageId: "wasteland", startTime: "22:00", endTime: "23:30" },
  { id: "e1-wl-4", day: 1, artistId: "edc-adrian-mills", stageId: "wasteland", startTime: "23:30", endTime: "01:00" },
  { id: "e1-wl-5", day: 1, artistId: "edc-cloudy", stageId: "wasteland", startTime: "01:00", endTime: "02:30" },
  { id: "e1-wl-6", day: 1, artistId: "edc-graveor", stageId: "wasteland", startTime: "02:30", endTime: "04:00" },
  { id: "e1-wl-7", day: 1, artistId: "edc-rebekah", stageId: "wasteland", startTime: "04:00", endTime: "05:00" },

  // Bionic Jungle
  { id: "e1-bj-1", day: 1, artistId: "edc-heidi-juliet-masha", stageId: "bionic-jungle", startTime: "17:00", endTime: "19:00" },
  { id: "e1-bj-2", day: 1, artistId: "edc-massibeland-paojara", stageId: "bionic-jungle", startTime: "21:30", endTime: "23:30" },
  { id: "e1-bj-3", day: 1, artistId: "edc-salute-chloe-caillet", stageId: "bionic-jungle", startTime: "00:30", endTime: "02:30" },

  // ============ DAY 2 — SATURDAY MAY 16 ============

  // Kinetic Field
  { id: "e2-kf-1", day: 2, artistId: "edc-arco", stageId: "kinetic-field", startTime: "19:00", endTime: "20:00" },
  { id: "e2-kf-2", day: 2, artistId: "edc-hayla", stageId: "kinetic-field", startTime: "20:00", endTime: "21:00" },
  { id: "e2-kf-3", day: 2, artistId: "edc-steve-aoki", stageId: "kinetic-field", startTime: "21:15", endTime: "22:30" },
  { id: "e2-kf-4", day: 2, artistId: "edc-hardwell", stageId: "kinetic-field", startTime: "23:19", endTime: "00:32" },
  { id: "e2-kf-5", day: 2, artistId: "edc-john-summit-d2", stageId: "kinetic-field", startTime: "00:32", endTime: "01:47" },
  { id: "e2-kf-6", day: 2, artistId: "edc-peggy-gou-kiki", stageId: "kinetic-field", startTime: "01:47", endTime: "03:01" },
  { id: "e2-kf-7", day: 2, artistId: "edc-subtronics", stageId: "kinetic-field", startTime: "03:01", endTime: "04:14" },
  { id: "e2-kf-8", day: 2, artistId: "edc-kaskade", stageId: "kinetic-field", startTime: "04:14", endTime: "05:00" },

  // Circuit Grounds
  { id: "e2-cg-1", day: 2, artistId: "edc-dj-mandy", stageId: "circuit-grounds", startTime: "19:00", endTime: "20:00" },
  { id: "e2-cg-2", day: 2, artistId: "edc-roz", stageId: "circuit-grounds", startTime: "20:00", endTime: "21:00" },
  { id: "e2-cg-3", day: 2, artistId: "edc-kettama", stageId: "circuit-grounds", startTime: "21:00", endTime: "22:00" },
  { id: "e2-cg-4", day: 2, artistId: "edc-vtss", stageId: "circuit-grounds", startTime: "22:15", endTime: "23:35" },
  { id: "e2-cg-5", day: 2, artistId: "edc-the-prodigy", stageId: "circuit-grounds", startTime: "23:35", endTime: "00:45" },
  { id: "e2-cg-6", day: 2, artistId: "edc-bunt", stageId: "circuit-grounds", startTime: "00:45", endTime: "01:45" },
  { id: "e2-cg-7", day: 2, artistId: "edc-boys-noize", stageId: "circuit-grounds", startTime: "01:45", endTime: "03:00" },
  { id: "e2-cg-8", day: 2, artistId: "edc-malugi", stageId: "circuit-grounds", startTime: "03:15", endTime: "04:30" },
  { id: "e2-cg-9", day: 2, artistId: "edc-lilly-palmer", stageId: "circuit-grounds", startTime: "04:30", endTime: "05:00" },

  // Basspod
  { id: "e2-bp-1", day: 2, artistId: "edc-fallen-mc-dino", stageId: "basspod", startTime: "19:00", endTime: "20:00" },
  { id: "e2-bp-2", day: 2, artistId: "edc-hybrid-minds", stageId: "basspod", startTime: "21:30", endTime: "22:30" },
  { id: "e2-bp-3", day: 2, artistId: "edc-ahmed-spins", stageId: "basspod", startTime: "22:30", endTime: "23:30" },
  { id: "e2-bp-4", day: 2, artistId: "edc-delta-heavy", stageId: "basspod", startTime: "23:30", endTime: "00:30" },
  { id: "e2-bp-5", day: 2, artistId: "edc-getter", stageId: "basspod", startTime: "00:30", endTime: "01:30" },
  { id: "e2-bp-6", day: 2, artistId: "edc-eptic-space-laces", stageId: "basspod", startTime: "01:30", endTime: "02:30" },
  { id: "e2-bp-7", day: 2, artistId: "edc-hol", stageId: "basspod", startTime: "03:30", endTime: "04:30" },

  // Neon Garden
  { id: "e2-ng-1", day: 2, artistId: "edc-mink", stageId: "neon-garden", startTime: "19:00", endTime: "20:00" },
  { id: "e2-ng-2", day: 2, artistId: "edc-silvie-loto", stageId: "neon-garden", startTime: "20:00", endTime: "21:00" },
  { id: "e2-ng-3", day: 2, artistId: "edc-paul-oakenfold", stageId: "neon-garden", startTime: "22:30", endTime: "23:30" },
  { id: "e2-ng-4", day: 2, artistId: "edc-luciano", stageId: "neon-garden", startTime: "23:30", endTime: "00:30" },
  { id: "e2-ng-5", day: 2, artistId: "edc-maddix", stageId: "neon-garden", startTime: "00:30", endTime: "01:30" },
  { id: "e2-ng-6", day: 2, artistId: "edc-prospa", stageId: "neon-garden", startTime: "01:30", endTime: "02:30" },
  { id: "e2-ng-7", day: 2, artistId: "edc-wax-motif", stageId: "neon-garden", startTime: "00:30", endTime: "01:30" },
  { id: "e2-ng-8", day: 2, artistId: "edc-cid", stageId: "neon-garden", startTime: "02:30", endTime: "03:30" },
  { id: "e2-ng-9", day: 2, artistId: "edc-hntr", stageId: "neon-garden", startTime: "03:30", endTime: "04:30" },
  { id: "e2-ng-10", day: 2, artistId: "edc-t78", stageId: "neon-garden", startTime: "04:30", endTime: "05:00" },

  // Quantum Valley Day 2 - Hardstyle / Trance
  { id: "e2-qv-1", day: 2, artistId: "edc-maria-healy", stageId: "quantum-valley", startTime: "19:00", endTime: "20:00" },
  { id: "e2-qv-2", day: 2, artistId: "edc-dreya-v", stageId: "quantum-valley", startTime: "20:00", endTime: "21:00" },
  { id: "e2-qv-3", day: 2, artistId: "edc-andrew-rayel", stageId: "quantum-valley", startTime: "23:15", endTime: "00:15" },
  { id: "e2-qv-4", day: 2, artistId: "edc-mathame", stageId: "quantum-valley", startTime: "01:30", endTime: "02:30" },
  { id: "e2-qv-5", day: 2, artistId: "edc-lady-faith-lny-tnz", stageId: "quantum-valley", startTime: "23:15", endTime: "00:15" },
  { id: "e2-qv-6", day: 2, artistId: "edc-da-tweekaz", stageId: "quantum-valley", startTime: "01:30", endTime: "02:30" },
  { id: "e2-qv-7", day: 2, artistId: "edc-lil-texas", stageId: "quantum-valley", startTime: "02:30", endTime: "03:30" },
  { id: "e2-qv-8", day: 2, artistId: "edc-mish", stageId: "quantum-valley", startTime: "03:30", endTime: "04:30" },
  { id: "e2-qv-9", day: 2, artistId: "edc-alyssa-jolee", stageId: "quantum-valley", startTime: "04:30", endTime: "05:00" },

  // Cosmic Meadow Day 2
  { id: "e2-cm-1", day: 2, artistId: "edc-arco", stageId: "cosmic-meadow", startTime: "19:00", endTime: "20:00" },

  // ============ DAY 3 — SUNDAY MAY 17 ============

  // Kinetic Field
  { id: "e3-kf-1", day: 3, artistId: "edc-trace", stageId: "kinetic-field", startTime: "19:00", endTime: "20:00" },
  { id: "e3-kf-2", day: 3, artistId: "edc-ship-wrek", stageId: "kinetic-field", startTime: "20:00", endTime: "21:00" },
  { id: "e3-kf-3", day: 3, artistId: "edc-layton-giordani", stageId: "kinetic-field", startTime: "21:00", endTime: "22:00" },
  { id: "e3-kf-4", day: 3, artistId: "edc-funk-tribu", stageId: "kinetic-field", startTime: "22:00", endTime: "23:00" },
  { id: "e3-kf-5", day: 3, artistId: "edc-griz-wooli", stageId: "kinetic-field", startTime: "23:19", endTime: "00:32" },
  { id: "e3-kf-6", day: 3, artistId: "edc-zedd", stageId: "kinetic-field", startTime: "00:32", endTime: "01:47" },
  { id: "e3-kf-7", day: 3, artistId: "edc-martin-garrix", stageId: "kinetic-field", startTime: "01:47", endTime: "03:01" },
  { id: "e3-kf-8", day: 3, artistId: "edc-cloonee", stageId: "kinetic-field", startTime: "03:01", endTime: "04:14" },
  { id: "e3-kf-9", day: 3, artistId: "edc-armin-van-buuren", stageId: "kinetic-field", startTime: "04:14", endTime: "05:00" },

  // Circuit Grounds
  { id: "e3-cg-1", day: 3, artistId: "edc-linska", stageId: "circuit-grounds", startTime: "19:00", endTime: "20:00" },
  { id: "e3-cg-2", day: 3, artistId: "edc-nostalgix", stageId: "circuit-grounds", startTime: "20:00", endTime: "21:00" },
  { id: "e3-cg-3", day: 3, artistId: "edc-anna", stageId: "circuit-grounds", startTime: "20:30", endTime: "21:30" },
  { id: "e3-cg-4", day: 3, artistId: "edc-beltran", stageId: "circuit-grounds", startTime: "22:00", endTime: "23:00" },
  { id: "e3-cg-5", day: 3, artistId: "edc-dabin", stageId: "circuit-grounds", startTime: "23:00", endTime: "00:00" },
  { id: "e3-cg-6", day: 3, artistId: "edc-chris-stussy", stageId: "circuit-grounds", startTime: "23:30", endTime: "00:30" },
  { id: "e3-cg-7", day: 3, artistId: "edc-solomun", stageId: "circuit-grounds", startTime: "00:05", endTime: "01:30" },
  { id: "e3-cg-8", day: 3, artistId: "edc-vintage-culture", stageId: "circuit-grounds", startTime: "02:30", endTime: "03:30" },
  { id: "e3-cg-9", day: 3, artistId: "edc-kevin-de-vries", stageId: "circuit-grounds", startTime: "04:00", endTime: "05:00" },

  // Cosmic Meadow
  { id: "e3-cm-1", day: 3, artistId: "edc-graverz", stageId: "cosmic-meadow", startTime: "19:00", endTime: "20:00" },
  { id: "e3-cm-2", day: 3, artistId: "edc-william-black", stageId: "cosmic-meadow", startTime: "20:00", endTime: "21:00" },
  { id: "e3-cm-3", day: 3, artistId: "edc-san-holo", stageId: "cosmic-meadow", startTime: "21:30", endTime: "22:30" },
  { id: "e3-cm-4", day: 3, artistId: "edc-virtual-riot", stageId: "cosmic-meadow", startTime: "23:30", endTime: "00:30" },
  { id: "e3-cm-5", day: 3, artistId: "edc-alison-wonderland", stageId: "cosmic-meadow", startTime: "00:20", endTime: "01:30" },
  { id: "e3-cm-6", day: 3, artistId: "edc-whethan", stageId: "cosmic-meadow", startTime: "02:20", endTime: "03:30" },

  // Basspod
  { id: "e3-bp-1", day: 3, artistId: "edc-sippy", stageId: "basspod", startTime: "19:00", endTime: "19:50" },
  { id: "e3-bp-2", day: 3, artistId: "edc-ezybaked", stageId: "basspod", startTime: "19:50", endTime: "20:40" },
  { id: "e3-bp-3", day: 3, artistId: "edc-infekt-samplifire", stageId: "basspod", startTime: "21:30", endTime: "22:30" },
  { id: "e3-bp-4", day: 3, artistId: "edc-peekaboo", stageId: "basspod", startTime: "22:30", endTime: "23:30" },
  { id: "e3-bp-5", day: 3, artistId: "edc-999999999", stageId: "basspod", startTime: "23:30", endTime: "00:30" },
  { id: "e3-bp-6", day: 3, artistId: "edc-indira-paganotto", stageId: "basspod", startTime: "01:30", endTime: "02:50" },
  { id: "e3-bp-7", day: 3, artistId: "edc-black-tiger-sex-machine", stageId: "basspod", startTime: "02:50", endTime: "04:30" },

  // Neon Garden
  { id: "e3-ng-1", day: 3, artistId: "edc-bad-beat", stageId: "neon-garden", startTime: "19:00", endTime: "20:00" },
  { id: "e3-ng-2", day: 3, artistId: "edc-frankie-bones", stageId: "neon-garden", startTime: "20:00", endTime: "21:15" },
  { id: "e3-ng-3", day: 3, artistId: "edc-rebuke", stageId: "neon-garden", startTime: "21:00", endTime: "22:00" },
  { id: "e3-ng-4", day: 3, artistId: "edc-adiel", stageId: "neon-garden", startTime: "22:30", endTime: "23:30" },
  { id: "e3-ng-5", day: 3, artistId: "edc-eli-fur", stageId: "neon-garden", startTime: "23:00", endTime: "00:00" },
  { id: "e3-ng-6", day: 3, artistId: "edc-tinlicker", stageId: "neon-garden", startTime: "00:00", endTime: "01:00" },
  { id: "e3-ng-7", day: 3, artistId: "edc-dj-gigola", stageId: "neon-garden", startTime: "22:50", endTime: "23:50" },
  { id: "e3-ng-8", day: 3, artistId: "edc-cassian", stageId: "neon-garden", startTime: "01:00", endTime: "02:15" },
  { id: "e3-ng-9", day: 3, artistId: "edc-kiki", stageId: "neon-garden", startTime: "02:15", endTime: "03:30" },

  // Quantum Valley Day 3
  { id: "e3-qv-1", day: 3, artistId: "edc-klo", stageId: "quantum-valley", startTime: "19:00", endTime: "20:00" },
  { id: "e3-qv-2", day: 3, artistId: "edc-shingo-nakamura", stageId: "quantum-valley", startTime: "20:00", endTime: "21:00" },
  { id: "e3-qv-3", day: 3, artistId: "edc-cristoph", stageId: "quantum-valley", startTime: "22:00", endTime: "23:00" },
  { id: "e3-qv-4", day: 3, artistId: "edc-skream", stageId: "quantum-valley", startTime: "23:00", endTime: "00:00" },
  { id: "e3-qv-5", day: 3, artistId: "edc-hamdi", stageId: "quantum-valley", startTime: "23:45", endTime: "00:45" },
  { id: "e3-qv-6", day: 3, artistId: "edc-silva-bumpa", stageId: "quantum-valley", startTime: "01:00", endTime: "02:15" },
  { id: "e3-qv-7", day: 3, artistId: "edc-massano", stageId: "quantum-valley", startTime: "02:15", endTime: "03:30" },
  { id: "e3-qv-8", day: 3, artistId: "edc-lu-re", stageId: "quantum-valley", startTime: "03:30", endTime: "05:00" },

  // Wasteland / Bionic Jungle Day 3
  { id: "e3-wl-1", day: 3, artistId: "edc-sihk", stageId: "wasteland", startTime: "19:00", endTime: "20:30" },
  { id: "e3-wl-2", day: 3, artistId: "edc-vieze-asbak", stageId: "wasteland", startTime: "00:30", endTime: "02:00" },
  { id: "e3-wl-3", day: 3, artistId: "edc-warface", stageId: "wasteland", startTime: "02:30", endTime: "04:00" },
  { id: "e3-wl-4", day: 3, artistId: "edc-kream", stageId: "wasteland", startTime: "04:00", endTime: "05:00" },

  { id: "e3-bj-1", day: 3, artistId: "edc-alves", stageId: "bionic-jungle", startTime: "19:00", endTime: "20:30" },
  { id: "e3-bj-2", day: 3, artistId: "edc-morgan-seatree", stageId: "bionic-jungle", startTime: "01:30", endTime: "03:00" },
];

export function getSetsForDay(day: 1 | 2 | 3): SetSlot[] {
  return sets.filter((s) => s.day === day);
}
