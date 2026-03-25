/** 新增 scope 后需重新连接 Spotify 授权。 */
export const SPOTIFY_SCOPES = [
  "user-top-read",
  "user-read-recently-played",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-follow-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
].join(" ");

export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
export const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export const DAY_LABELS: Record<number, string> = {
  1: "FRI MAR 28",
  2: "SAT MAR 29",
  3: "SUN MAR 30",
};

export const TAG_COLORS: Record<string, string> = {
  "perfect match": "bg-neon-green/20 text-neon-green border-neon-green/40",
  "melodic vibes": "bg-neon-blue/20 text-neon-blue border-neon-blue/40",
  "dark groove": "bg-neon-purple/20 text-neon-purple border-neon-purple/40",
  "late-night fit": "bg-neon-pink/20 text-neon-pink border-neon-pink/40",
  "high energy": "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  "bass heavy": "bg-orange-500/20 text-orange-400 border-orange-500/40",
  "progressive vibe": "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
  "techno": "bg-neon-purple/20 text-neon-purple border-neon-purple/40",
  "trance": "bg-blue-500/20 text-blue-400 border-blue-500/40",
  "hidden gem": "bg-amber-500/20 text-amber-400 border-amber-500/40",
  "crowd favorite": "bg-rose-500/20 text-rose-400 border-rose-500/40",
  "festival anthem": "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40",
  "underground": "bg-slate-500/20 text-slate-300 border-slate-500/40",
  "chill vibes": "bg-teal-500/20 text-teal-400 border-teal-500/40",
};
