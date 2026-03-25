export type Day = 1 | 2 | 3;
export type PlanStatus = "kept" | "removed";

export interface Stage {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

export interface DJProfile {
  hyped: number;
  reputation: number;
  vibe: string;
  targetAudience: string;
  festivalContext: string;
}

export interface Artist {
  id: string;
  name: string;
  spotifyArtistId: string | null;
  genreTags: string[];
  imageUrl?: string;
  profile?: DJProfile;
}

export interface PreviewTrack {
  name: string;
  previewUrl: string | null;
  spotifyUrl: string;
  coverUrl?: string | null;
}

export interface SetSlot {
  id: string;
  day: Day;
  artistId: string;
  stageId: string;
  startTime: string;
  endTime: string;
}

export interface DJRecommendation {
  artist: Artist;
  set: SetSlot;
  stage: Stage;
  score: number;
  tags: string[];
  reason?: string;
  previewTrack: PreviewTrack | null;
}

export interface RouteNode {
  artist: Artist;
  set: SetSlot;
  stage: Stage;
  order: number;
  arriveBy?: string;
  leaveBy?: string;
  partial?: boolean;
  walkFromPrev?: number;
}

export interface SpotifyUserProfile {
  id: string;
  displayName: string;
  imageUrl: string | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  imageUrl: string | null;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artistName: string;
  /** 曲目关联的 Spotify 艺人 id（含 feat. 时可能有多个） */
  artistIds: string[];
  previewUrl: string | null;
  spotifyUrl: string;
}

/** 用户常听歌单的 audio-features 均值（0–1；tempo 为 BPM） */
export interface UserAudioProfile {
  energy: number;
  danceability: number;
  valence: number;
  tempo: number;
}

export interface UserPreferences {
  topArtists: SpotifyArtist[];
  topTracks: SpotifyTrack[];
  recentlyPlayed: SpotifyTrack[];
  genreProfile: Record<string, number>;
  /** 关注的艺人（需 user-follow-read） */
  followedArtists?: SpotifyArtist[];
  /** 喜欢歌曲里各 Spotify 艺人 id 出现次数（需 user-library-read） */
  savedArtistCounts?: Record<string, number>;
  /** 歌单抽样聚合的艺人权重（需 playlist-read-*） */
  playlistArtistWeights?: Record<string, number>;
  /** Top + Saved 曲目 audio-features 均值（无需额外 scope，需 track id） */
  audioProfile?: UserAudioProfile;
  /** 正在播放曲目的主艺人 id（需 user-read-currently-playing） */
  currentlyPlayingArtistId?: string | null;
}
