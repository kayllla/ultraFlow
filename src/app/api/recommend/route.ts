import { NextRequest, NextResponse } from "next/server";
import {
  getTopArtists,
  getTopTracks,
  getRecentlyPlayed,
  getArtistsBatch,
  getSavedTracks,
  getFollowedArtists,
  getPlaylistArtistWeights,
  getAudioFeaturesBatch,
  getCurrentlyPlayingArtistId,
} from "@/lib/spotify";
import {
  generateRecommendations,
  mergeTopArtistLists,
  resolveUltraGenreProfile,
} from "@/lib/recommend";
import { llmMatchRecommendations } from "@/lib/llm-match";
import { enrichRecommendationsWithSpotify } from "@/lib/enrich-recommendations";
import {
  aggregateSavedArtistCounts,
  buildAudioProfileFromFeatures,
  collectTrackIdsForAudioFeatures,
} from "@/lib/user-taste-aggregate";
import { spotifyArtistIsElectronicDJ } from "@/lib/taste-profile";
import { Day, SpotifyArtist, SpotifyTrack, UserPreferences } from "@/types";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("spotify_access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const day = parseInt(searchParams.get("day") || "1") as Day;

  if (![1, 2, 3].includes(day)) {
    return NextResponse.json({ error: "Invalid day" }, { status: 400 });
  }

  try {
    const [topArtistsMedium, topArtistsShort, topTracks, recentlyPlayed]: [
      SpotifyArtist[],
      SpotifyArtist[],
      SpotifyTrack[],
      SpotifyTrack[],
    ] = await Promise.all([
      getTopArtists(token, 50, "medium_term"),
      getTopArtists(token, 20, "short_term"),
      getTopTracks(token),
      getRecentlyPlayed(token),
    ]);

    const allTrackArtistIds = topTracks.flatMap((t) => t.artistIds);
    const trackArtistIds = Array.from(new Set(allTrackArtistIds)).slice(0, 50);

    let trackArtistsBatch: Awaited<ReturnType<typeof getArtistsBatch>> = [];
    try {
      if (trackArtistIds.length > 0) {
        trackArtistsBatch = await getArtistsBatch(token, trackArtistIds);
      }
    } catch (e) {
      console.warn("getArtistsBatch failed, using top-artist genres only:", e);
    }

    const [
      savedTracksRaw,
      followedArtists,
      playlistArtistWeights,
      currentlyPlayingArtistId,
    ] = await Promise.all([
      (async () => {
        try {
          return await getSavedTracks(token);
        } catch (e) {
          console.warn("getSavedTracks failed:", e);
          return [] as Awaited<ReturnType<typeof getSavedTracks>>;
        }
      })(),
      (async () => {
        try {
          return await getFollowedArtists(token);
        } catch (e) {
          console.warn("getFollowedArtists failed:", e);
          return [] as Awaited<ReturnType<typeof getFollowedArtists>>;
        }
      })(),
      (async () => {
        try {
          return await getPlaylistArtistWeights(token);
        } catch (e) {
          console.warn("getPlaylistArtistWeights failed:", e);
          return {} as Record<string, number>;
        }
      })(),
      (async () => {
        try {
          return await getCurrentlyPlayingArtistId(token);
        } catch (e) {
          console.warn("getCurrentlyPlayingArtistId failed:", e);
          return null as string | null;
        }
      })(),
    ]);

    const savedArtistCounts = aggregateSavedArtistCounts(savedTracksRaw);

    const electronicArtistIds = new Set(
      trackArtistsBatch.filter(spotifyArtistIsElectronicDJ).map((a) => a.id)
    );
    const topTracksElectronic =
      electronicArtistIds.size > 0
        ? topTracks.filter((t) =>
            t.artistIds.some((id) => electronicArtistIds.has(id))
          )
        : topTracks;
    const topTracksForAudio =
      topTracksElectronic.length > 0 ? topTracksElectronic : topTracks;

    let audioProfile = undefined;
    try {
      const trackIdsForFeatures = collectTrackIdsForAudioFeatures(
        topTracksForAudio,
        savedTracksRaw,
        100
      );
      if (trackIdsForFeatures.length > 0) {
        const features = await getAudioFeaturesBatch(token, trackIdsForFeatures);
        audioProfile = buildAudioProfileFromFeatures(features);
      }
    } catch (e) {
      console.warn("getAudioFeaturesBatch failed:", e);
    }

    const genreProfile = resolveUltraGenreProfile(
      topArtistsMedium,
      topArtistsShort,
      trackArtistsBatch
    );

    const topArtists = mergeTopArtistLists(topArtistsMedium, topArtistsShort);

    const followedElectronic = followedArtists.filter(spotifyArtistIsElectronicDJ);

    const prefs: UserPreferences = {
      topArtists,
      topTracks,
      recentlyPlayed,
      genreProfile,
      followedArtists: followedElectronic.length ? followedElectronic : undefined,
      savedArtistCounts:
        Object.keys(savedArtistCounts).length > 0 ? savedArtistCounts : undefined,
      playlistArtistWeights:
        Object.keys(playlistArtistWeights).length > 0
          ? playlistArtistWeights
          : undefined,
      audioProfile,
      currentlyPlayingArtistId,
    };

    let recommendations;
    const hasLLM = !!process.env.OPENAI_API_KEY;

    if (hasLLM) {
      try {
        recommendations = await llmMatchRecommendations(day, prefs);
      } catch (llmErr) {
        console.warn("LLM match failed, falling back to rule-based:", llmErr);
        recommendations = generateRecommendations(day, prefs);
      }
    } else {
      recommendations = generateRecommendations(day, prefs);
    }

    try {
      recommendations = await enrichRecommendationsWithSpotify(recommendations, token);
    } catch (e) {
      console.warn("Spotify enrich (user token) failed:", e);
    }

    return NextResponse.json({
      day,
      recommendations,
      userGenreProfile: genreProfile,
    });
  } catch (err: any) {
    console.error("Recommend API error:", err);

    if (err.message?.includes("401")) {
      return NextResponse.json(
        { error: "Token expired" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
