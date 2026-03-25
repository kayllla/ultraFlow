"use client";

import { DJRecommendation, PlanStatus } from "@/types";
import { TAG_COLORS } from "@/lib/constants";
import AudioPreview from "./AudioPreview";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

interface DJCardProps {
  rec: DJRecommendation;
  status: PlanStatus | undefined;
  onToggle: () => void;
  onSelect?: () => void;
  index: number;
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 && h < 24 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

function listenSpotifyUrl(rec: DJRecommendation): string {
  if (rec.previewTrack?.spotifyUrl) return rec.previewTrack.spotifyUrl;
  if (rec.artist.spotifyArtistId)
    return `https://open.spotify.com/artist/${rec.artist.spotifyArtistId}`;
  return `https://open.spotify.com/search/${encodeURIComponent(rec.artist.name)}`;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/** Animated level bars shown when this card's track is playing */
function LevelBars() {
  return (
    <div className="flex items-end gap-[2px] h-[14px] shrink-0">
      {[0.3, 0.7, 1, 0.5, 0.85, 0.4, 0.9].map((delay, i) => (
        <div
          key={i}
          className="w-[3px] rounded-[1px] bg-[#39FF14] origin-bottom animate-level-bar"
          style={{
            height: "100%",
            animationDelay: `${delay * 0.4}s`,
            animationDuration: `${0.4 + delay * 0.25}s`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

export default function DJCard({
  rec,
  status,
  onToggle,
  onSelect,
  index,
}: DJCardProps) {
  const isSelected = status === "kept";
  const { activePlaybackId } = useAudioPlayer();
  const isPlaying = activePlaybackId === rec.set.id;
  const img = rec.artist.imageUrl;

  return (
    <div
      className={`
        group relative animate-slide-up overflow-hidden transition-all duration-300 cursor-pointer
        cut-corner
        ${
          isSelected
            ? "bg-[rgba(57,255,20,0.08)]"
            : "bg-[rgba(14,14,14,0.92)] hover:bg-[rgba(20,20,20,0.96)]"
        }
      `}
      style={{
        animationDelay: `${index * 45}ms`,
        animationFillMode: "backwards",
        border: isSelected
          ? "1px solid rgba(57,255,20,0.45)"
          : "1px solid rgba(184,184,184,0.12)",
        boxShadow: isSelected
          ? "0 0 22px rgba(57,255,20,0.14), inset 0 0 24px rgba(57,255,20,0.06)"
          : isPlaying
          ? "0 0 12px rgba(57,255,20,0.08)"
          : "0 4px 24px rgba(0,0,0,0.6)",
        filter: isSelected ? "brightness(1.06)" : "brightness(1)",
      }}
      onClick={() => {
        onToggle();
        onSelect?.();
      }}
    >
      {/* Chrome cut-corner accent lines */}
      <div
        className="absolute top-0 left-0 w-[12px] h-[1px] pointer-events-none"
        style={{ background: isSelected ? "#39FF14" : "rgba(184,184,184,0.5)" }}
      />
      <div
        className="absolute top-0 left-0 w-[1px] h-[12px] pointer-events-none"
        style={{ background: isSelected ? "#39FF14" : "rgba(184,184,184,0.5)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[12px] h-[1px] pointer-events-none"
        style={{ background: isSelected ? "#39FF14" : "rgba(184,184,184,0.3)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[1px] h-[12px] pointer-events-none"
        style={{ background: isSelected ? "#39FF14" : "rgba(184,184,184,0.3)" }}
      />

      {/* Playing indicator — left edge bar */}
      {isPlaying && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] animate-led-pulse"
          style={{
            background:
              "linear-gradient(180deg, transparent, #39FF14, #39FF14, transparent)",
          }}
        />
      )}

      <div className="p-3 md:p-4">
        <div className="flex gap-3">
          {/* Square avatar with cut corner */}
          <div className="relative shrink-0">
            <div
              className="cut-corner-sm overflow-hidden"
              style={{
                width: 72,
                height: 72,
                border: isPlaying
                  ? "1px solid rgba(57,255,20,0.6)"
                  : "1px solid rgba(184,184,184,0.2)",
                boxShadow: isPlaying
                  ? "0 0 14px rgba(57,255,20,0.25)"
                  : undefined,
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center font-display font-black text-base tracking-widest"
                  style={{
                    background: "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
                    color: "rgba(184,184,184,0.5)",
                  }}
                >
                  {initials(rec.artist.name)}
                </div>
              )}
            </div>
            {isPlaying && (
              <div
                className="absolute bottom-1 right-1 w-2 h-2 rounded-full animate-led-pulse"
                style={{
                  background: "#39FF14",
                  boxShadow: "0 0 8px rgba(57,255,20,0.9)",
                }}
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={`font-display text-sm font-bold tracking-widest uppercase truncate ${
                      isSelected
                        ? "text-[#39FF14]"
                        : isPlaying
                        ? "text-chrome-shimmer"
                        : "text-[#d0d0d0]"
                    }`}
                    style={
                      isSelected
                        ? {
                            textShadow:
                              "0 0 10px rgba(57,255,20,0.5)",
                          }
                        : undefined
                    }
                  >
                    {rec.artist.name}
                  </h3>
                  <span
                    className="shrink-0 font-display text-[10px] tabular-nums tracking-widest px-1.5 py-0.5 cut-corner-sm"
                    style={{
                      color: "rgba(57,255,20,0.9)",
                      border: "1px solid rgba(57,255,20,0.25)",
                      background: "rgba(57,255,20,0.06)",
                    }}
                    title="推荐匹配度（列表已按此从高到低排序）"
                  >
                    {Math.round(rec.score)}%
                  </span>
                  {isPlaying && <LevelBars />}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <span
                    className="cut-corner-sm text-[9px] font-display uppercase tracking-widest px-2 py-0.5"
                    style={{
                      background: `${rec.stage.color}12`,
                      color: rec.stage.color,
                      border: `1px solid ${rec.stage.color}30`,
                    }}
                  >
                    {rec.stage.name}
                  </span>
                  <span className="text-[10px] font-display text-[rgba(184,184,184,0.4)] tracking-wider">
                    {formatTime(rec.set.startTime)} – {formatTime(rec.set.endTime)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {rec.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[9px] px-2 py-0.5 font-display uppercase tracking-wide ${
                        TAG_COLORS[tag] ||
                        "bg-white/5 text-white/40 border-white/10"
                      } border`}
                      style={{ clipPath: "none" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {rec.reason && (
                  <p className="mt-2 text-[10px] text-[rgba(184,184,184,0.55)] leading-relaxed italic">
                    {rec.reason}
                  </p>
                )}
              </div>
            </div>

            <AudioPreview
              previewUrl={rec.previewTrack?.previewUrl ?? null}
              spotifyUrl={listenSpotifyUrl(rec)}
              trackName={rec.previewTrack?.name ?? "Play preview"}
              artistName={rec.artist.name}
              coverUrl={rec.previewTrack?.coverUrl}
              playbackId={rec.set.id}
              variant="whiplash"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
