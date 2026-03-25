import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
  SPOTIFY_API_BASE,
  SPOTIFY_SCOPES,
} from "./constants";

let clientCredentialsCache: { token: string; expiresAt: number } | null = null;

/** App-only token for public catalog (search, artist top tracks). */
export async function getClientCredentialsToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  if (clientCredentialsCache && Date.now() < clientCredentialsCache.expiresAt - 30_000) {
    return clientCredentialsCache.token;
  }

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  clientCredentialsCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return clientCredentialsCache.token;
}

/**
 * OAuth redirect_uri 必须与当前访问的站点一致。始终用本次请求的 URL 推导 origin，
 * 这样 Vercel 线上不依赖 NEXT_PUBLIC_BASE_URL，也不会被误配成 localhost。
 * 本机请用 http://127.0.0.1:3000 打开（不要用 localhost），并在 Spotify 登记对应 callback。
 */
export function getOAuthAppOrigin(requestUrl: string): string {
  return new URL(requestUrl).origin;
}

export function getSpotifyAuthUrl(appOrigin: string): string {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const redirectUri = `${appOrigin}/api/auth/callback`;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: SPOTIFY_SCOPES,
    redirect_uri: redirectUri,
    show_dialog: "true",
  });

  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string, redirectUri: string) {
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.statusText}`);
  }

  return res.json();
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.statusText}`);
  }

  return res.json();
}

async function spotifyGet(
  endpoint: string,
  token: string,
  retries = 1
): Promise<any> {
  const res = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 429) {
    if (retries > 0) {
      const retryAfter = parseInt(res.headers.get("Retry-After") || "1", 10);
      await new Promise((r) => setTimeout(r, Math.min(retryAfter * 1000, 3000)));
      return spotifyGet(endpoint, token, retries - 1);
    }
    return null;
  }

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/** 用于可选 scope：403/401/204 等返回 null，不抛错 */
async function spotifyGetJsonOrNull(
  endpoint: string,
  token: string,
  retries = 1
): Promise<any | null> {
  const res = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) return null;

  if (res.status === 429) {
    if (retries > 0) {
      const retryAfter = parseInt(res.headers.get("Retry-After") || "1", 10);
      await new Promise((r) => setTimeout(r, Math.min(retryAfter * 1000, 3000)));
      return spotifyGetJsonOrNull(endpoint, token, retries - 1);
    }
    return null;
  }

  if (!res.ok) return null;

  return res.json();
}

export interface SpotifyAudioFeatures {
  id: string;
  energy: number | null;
  danceability: number | null;
  valence: number | null;
  tempo: number | null;
}

export async function getTopArtists(
  token: string,
  limit = 50,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term"
) {
  const data = await spotifyGet(
    `/me/top/artists?limit=${limit}&time_range=${timeRange}`,
    token
  );
  return data.items.map((a: any) => ({
    id: a.id,
    name: a.name,
    genres: a.genres || [],
    popularity: a.popularity,
    imageUrl: a.images?.[0]?.url || null,
  }));
}

/** 批量获取艺人（每请求最多 50 个 id） */
export async function getArtistsBatch(
  token: string,
  ids: string[]
): Promise<
  {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    imageUrl: string | null;
  }[]
> {
  const unique = Array.from(new Set(ids.filter(Boolean)));
  if (unique.length === 0) return [];

  const out: {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    imageUrl: string | null;
  }[] = [];

  for (let i = 0; i < unique.length; i += 50) {
    const chunk = unique.slice(i, i + 50);
    const data = await spotifyGet(`/artists?ids=${chunk.join(",")}`, token);
    if (!data?.artists) continue;
    for (const a of data.artists) {
      if (!a?.id) continue;
      out.push({
        id: a.id,
        name: a.name,
        genres: a.genres || [],
        popularity: a.popularity,
        imageUrl: a.images?.[0]?.url || null,
      });
    }
  }

  return out;
}

export async function getTopTracks(token: string, limit = 50) {
  const data = await spotifyGet(
    `/me/top/tracks?limit=${limit}&time_range=medium_term`,
    token
  );
  return data.items.map((t: any) => ({
    id: t.id,
    name: t.name,
    artistName: t.artists?.[0]?.name || "",
    artistIds: (t.artists || []).map((a: { id: string }) => a.id).filter(Boolean),
    previewUrl: t.preview_url,
    spotifyUrl: t.external_urls?.spotify || "",
  }));
}

export async function getRecentlyPlayed(token: string, limit = 50) {
  const data = await spotifyGet(
    `/me/player/recently-played?limit=${limit}`,
    token
  );
  return data.items.map((item: any) => ({
    id: item.track.id,
    name: item.track.name,
    artistName: item.track.artists?.[0]?.name || "",
    artistIds: (item.track.artists || [])
      .map((a: { id: string }) => a.id)
      .filter(Boolean),
    previewUrl: item.track.preview_url,
    spotifyUrl: item.track.external_urls?.spotify || "",
  }));
}

export async function getUserProfile(token: string) {
  const data = await spotifyGet("/me", token);
  return {
    id: data.id,
    displayName: data.display_name,
    imageUrl: data.images?.[0]?.url || null,
  };
}

export async function searchArtist(token: string, name: string) {
  const data = await spotifyGet(
    `/search?q=${encodeURIComponent(name)}&type=artist&limit=1`,
    token
  );
  if (!data) return null;
  const artist = data.artists?.items?.[0];
  if (!artist) return null;
  return {
    id: artist.id,
    name: artist.name,
    genres: artist.genres || [],
    popularity: artist.popularity,
    imageUrl: artist.images?.[0]?.url || null,
  };
}

export async function getArtistById(token: string, artistId: string) {
  const data = await spotifyGet(`/artists/${artistId}`, token);
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    genres: data.genres || [],
    popularity: data.popularity,
    imageUrl: data.images?.[0]?.url || null,
  };
}

export async function getArtistTopTracks(token: string, artistId: string) {
  const data = await spotifyGet(
    `/artists/${artistId}/top-tracks?market=US`,
    token
  );
  if (!data) return [];
  return data.tracks.slice(0, 3).map((t: any) => ({
    name: t.name,
    previewUrl: t.preview_url,
    spotifyUrl: t.external_urls?.spotify || "",
  }));
}

const SAVED_TRACKS_PAGE = 50;
const SAVED_TRACKS_MAX = 100;
const FOLLOWED_ARTISTS_PAGE = 50;
const FOLLOWED_ARTISTS_MAX = 100;
const USER_PLAYLISTS_MAX = 5;
const PLAYLIST_TRACKS_SAMPLE = 30;

/** 喜欢歌曲中的曲目（含 artist ids），最多约 100 首 */
export async function getSavedTracks(token: string): Promise<
  { id: string; artistIds: string[] }[]
> {
  const out: { id: string; artistIds: string[] }[] = [];
  let offset = 0;

  while (out.length < SAVED_TRACKS_MAX) {
    const data = await spotifyGetJsonOrNull(
      `/me/tracks?limit=${SAVED_TRACKS_PAGE}&offset=${offset}`,
      token
    );
    if (!data?.items?.length) break;

    for (const row of data.items) {
      const t = row.track;
      if (!t?.id || t.is_local) continue;
      const artistIds = (t.artists || [])
        .map((a: { id?: string }) => a.id)
        .filter(Boolean);
      out.push({ id: t.id, artistIds });
    }

    if (data.items.length < SAVED_TRACKS_PAGE) break;
    offset += SAVED_TRACKS_PAGE;
    if (out.length >= SAVED_TRACKS_MAX) break;
  }

  return out.slice(0, SAVED_TRACKS_MAX);
}

/** 关注的艺人 */
export async function getFollowedArtists(token: string): Promise<
  {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    imageUrl: string | null;
  }[]
> {
  const out: {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    imageUrl: string | null;
  }[] = [];
  let after: string | undefined;

  while (out.length < FOLLOWED_ARTISTS_MAX) {
    const q = new URLSearchParams({
      type: "artist",
      limit: String(FOLLOWED_ARTISTS_PAGE),
    });
    if (after) q.set("after", after);

    const data = await spotifyGetJsonOrNull(
      `/me/following?${q.toString()}`,
      token
    );
    if (!data?.artists?.items?.length) break;

    for (const a of data.artists.items) {
      out.push({
        id: a.id,
        name: a.name,
        genres: a.genres || [],
        popularity: a.popularity ?? 0,
        imageUrl: a.images?.[0]?.url || null,
      });
    }

    after = data.artists.cursors?.after;
    if (!after) break;
  }

  return out.slice(0, FOLLOWED_ARTISTS_MAX);
}

/**
 * 从前 N 个用户歌单各抽样 M 条曲目，聚合艺人出现次数（跳过本地/无效曲目）
 */
export async function getPlaylistArtistWeights(
  token: string
): Promise<Record<string, number>> {
  const weights: Record<string, number> = {};

  const listData = await spotifyGetJsonOrNull(
    `/me/playlists?limit=${USER_PLAYLISTS_MAX}&offset=0`,
    token
  );
  if (!listData?.items?.length) return weights;

  for (const pl of listData.items) {
    const pid = pl.id;
    if (!pid) continue;

    const tracksData = await spotifyGetJsonOrNull(
      `/playlists/${pid}/tracks?limit=${PLAYLIST_TRACKS_SAMPLE}`,
      token
    );
    if (!tracksData?.items?.length) continue;

    for (const row of tracksData.items) {
      const t = row.track;
      if (!t || t.is_local) continue;
      for (const ar of t.artists || []) {
        if (ar?.id) weights[ar.id] = (weights[ar.id] || 0) + 1;
      }
    }
  }

  return weights;
}

/** 批量 audio-features，每批最多 100 个 track id */
export async function getAudioFeaturesBatch(
  token: string,
  trackIds: string[]
): Promise<SpotifyAudioFeatures[]> {
  const unique = Array.from(new Set(trackIds.filter(Boolean))).slice(0, 200);
  if (unique.length === 0) return [];

  const out: SpotifyAudioFeatures[] = [];

  for (let i = 0; i < unique.length; i += 100) {
    const chunk = unique.slice(i, i + 100);
    const data = await spotifyGetJsonOrNull(
      `/audio-features?ids=${chunk.join(",")}`,
      token
    );
    if (!data?.audio_features) continue;
    for (const f of data.audio_features) {
      if (!f?.id) continue;
      out.push({
        id: f.id,
        energy: f.energy ?? null,
        danceability: f.danceability ?? null,
        valence: f.valence ?? null,
        tempo: f.tempo ?? null,
      });
    }
  }

  return out;
}

/** 当前播放曲目的第一个艺人 id；无播放或 204 返回 null */
export async function getCurrentlyPlayingArtistId(
  token: string
): Promise<string | null> {
  const data = await spotifyGetJsonOrNull(`/me/player/currently-playing`, token);
  if (!data?.item?.artists?.length) return null;
  const id = data.item.artists[0]?.id;
  return id || null;
}
