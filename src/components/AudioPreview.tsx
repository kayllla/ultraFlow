"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import {
  getGlobalAudioElement,
  isGlobalPlayback,
  startGlobalPreviewPlayback,
  stopGlobalPreviewPlayback,
} from "@/lib/audio-preview-player";

interface AudioPreviewProps {
  previewUrl: string | null;
  spotifyUrl?: string;
  trackName: string;
  artistName?: string;
  coverUrl?: string | null;
  playbackId?: string;
  variant?: "default" | "whiplash";
}

/** Fetch a 30-second iTunes preview URL client-side as fallback */
async function fetchITunesPreview(
  artistName: string
): Promise<{ previewUrl: string; trackName: string } | null> {
  const primary = artistName.split(/\s+b2b\s+/i)[0].trim();
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(primary)}&entity=song&limit=10&media=music`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const track = (data.results ?? []).find((r: any) => r.previewUrl);
    if (!track) return null;
    return { previewUrl: track.previewUrl, trackName: track.trackName };
  } catch {
    return null;
  }
}

export default function AudioPreview({
  previewUrl: initialPreviewUrl,
  spotifyUrl,
  trackName: initialTrackName,
  artistName,
  coverUrl,
  playbackId,
  variant = "default",
}: AudioPreviewProps) {
  const { setActivePlaybackId } = useAudioPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(initialPreviewUrl);
  const [resolvedTrack, setResolvedTrack] = useState(initialTrackName);
  const [isResolving, setIsResolving] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // If the parent re-sends a real URL later (after server enrichment), adopt it
  useEffect(() => {
    if (initialPreviewUrl && !resolvedUrl) {
      setResolvedUrl(initialPreviewUrl);
      setResolvedTrack(initialTrackName);
    }
  }, [initialPreviewUrl, initialTrackName, resolvedUrl]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (playbackId && isGlobalPlayback(playbackId)) {
        setActivePlaybackId(null);
      }
    };
  }, [playbackId, setActivePlaybackId]);

  const startPlayback = useCallback(
    async (url: string) => {
      await startGlobalPreviewPlayback({
        url,
        playbackId,
        setActivePlaybackId,
        onOwnerPlayingChange: setIsPlaying,
        onOwnerClearDeck: () => setActivePlaybackId(null),
      });

      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const audio = getGlobalAudioElement();
        if (!audio) return;
        const p = (audio.currentTime / audio.duration) * 100;
        setProgress(isNaN(p) ? 0 : p);
      }, 100);
    },
    [playbackId, setActivePlaybackId]
  );

  const handlePlay = useCallback(async () => {
    // ── Already playing → pause ──────────────────────────────────────────
    if (isPlaying && isGlobalPlayback(playbackId)) {
      stopGlobalPreviewPlayback(setActivePlaybackId, playbackId);
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // ── Have a resolved URL → play directly ──────────────────────────────
    if (resolvedUrl) {
      await startPlayback(resolvedUrl);
      return;
    }

    // ── No URL yet → try iTunes on-demand ────────────────────────────────
    if (artistName) {
      setIsResolving(true);
      const result = await fetchITunesPreview(artistName);
      setIsResolving(false);
      if (result) {
        setResolvedUrl(result.previewUrl);
        setResolvedTrack(result.trackName);
        await startPlayback(result.previewUrl);
        return;
      }
    }

    // ── Absolute fallback → open Apple Music / Spotify link ──────────────
    if (spotifyUrl) {
      window.open(spotifyUrl, "_blank");
    }
  }, [
    isPlaying,
    resolvedUrl,
    artistName,
    spotifyUrl,
    playbackId,
    setActivePlaybackId,
    startPlayback,
  ]);

  const isWhiplash = variant === "whiplash";
  const hasAudio = !!resolvedUrl || !!artistName;

  return (
    <div
      className={`flex items-center gap-2.5 min-w-0 ${
        isWhiplash ? "mt-3 pt-2.5 border-t border-[rgba(184,184,184,0.08)]" : ""
      }`}
    >
      {/* Album cover with play button overlay */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePlay();
        }}
        disabled={isResolving}
        className="shrink-0 relative group/play cursor-pointer active:scale-95 disabled:opacity-60"
        style={{ width: 40, height: 40 }}
        title={isPlaying ? "Pause" : "Play preview"}
      >
        {/* Cover art or placeholder */}
        {coverUrl ? (
          <img
            src={coverUrl}
            alt="cover"
            width={40}
            height={40}
            className="w-10 h-10 object-cover"
            style={{
              outline: isPlaying
                ? "1px solid rgba(57,255,20,0.6)"
                : "1px solid rgba(184,184,184,0.12)",
              filter: isPlaying ? "brightness(0.55)" : "brightness(0.75)",
              transition: "filter 0.2s, outline 0.2s",
            }}
          />
        ) : (
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{
              background: isPlaying
                ? "rgba(57,255,20,0.08)"
                : "rgba(28,28,28,0.9)",
              outline: isPlaying
                ? "1px solid rgba(57,255,20,0.4)"
                : "1px solid rgba(184,184,184,0.15)",
            }}
          />
        )}

        {/* Icon overlay */}
        <span
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
          style={{ opacity: coverUrl ? (isPlaying ? 1 : 0.85) : 1 }}
        >
          {isResolving ? (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#39FF14"
              strokeWidth="2.5"
              className="animate-spin"
            >
              <circle cx="12" cy="12" r="10" strokeDasharray="40" strokeDashoffset="20" />
            </svg>
          ) : isPlaying ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#39FF14">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : hasAudio ? (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill={coverUrl ? "rgba(255,255,255,0.9)" : "rgba(184,184,184,0.55)"}
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#39FF14">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          )}
        </span>
      </button>

      {/* Track name + progress */}
      <div className="flex-1 min-w-0">
        <p
          className={`truncate ${
            isWhiplash
              ? "text-[10px] uppercase tracking-widest font-display"
              : "text-[11px] text-white/40"
          }`}
          style={
            isWhiplash
              ? { color: isPlaying ? "rgba(57,255,20,0.75)" : "rgba(184,184,184,0.45)" }
              : undefined
          }
        >
          {isResolving ? "Loading…" : resolvedTrack}
        </p>

        {isPlaying && (
          <div
            className="h-[2px] mt-1.5 rounded-full overflow-hidden"
            style={{
              background: isWhiplash
                ? "rgba(57,255,20,0.12)"
                : "rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: isWhiplash
                  ? "linear-gradient(90deg, #22990c, #39FF14)"
                  : "#00f0ff",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
