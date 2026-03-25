"use client";

import { useEffect, useMemo, useState } from "react";
import type { DJRecommendation } from "@/types";
import type { Stage } from "@/types";
import {
  buildStageGridTimeline,
  DEFAULT_TIMELINE_PX_PER_MIN,
  MOBILE_TIMELINE_PX_PER_MIN,
} from "@/lib/day-timeline";
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatArrivalClock, getNowFestivalMinutes } from "@/lib/now-recommend";
import { isTimelinePreviewMode } from "@/lib/festival-dates";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { startGlobalPreviewPlayback } from "@/lib/audio-preview-player";

interface DayTimelineProps {
  recommendations: DJRecommendation[];
  nowMinutes: number;
  onPickRec: (rec: DJRecommendation) => void;
  stages: Stage[];
}

async function fetchITunesPreview(
  artistName: string
): Promise<{ previewUrl: string } | null> {
  const primary = artistName.split(/\s+b2b\s+/i)[0].trim();
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(primary)}&entity=song&limit=10&media=music`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const track = (data.results ?? []).find((r: { previewUrl?: string }) => r.previewUrl);
    if (!track?.previewUrl) return null;
    return { previewUrl: track.previewUrl };
  } catch {
    return null;
  }
}

function formatSetTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 && h < 24 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export default function DayTimeline({
  recommendations,
  nowMinutes,
  onPickRec,
  stages,
}: DayTimelineProps) {
  const isMobile = useIsMobile();
  const labelW = isMobile ? 56 : 64;
  const colW = isMobile ? 112 : 102;
  const pxPerMin = isMobile ? MOBILE_TIMELINE_PX_PER_MIN : DEFAULT_TIMELINE_PX_PER_MIN;

  const { setActivePlaybackId, activePlaybackId } = useAudioPlayer();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [liveNowMinutes, setLiveNowMinutes] = useState(nowMinutes);

  const previewMode = isTimelinePreviewMode();

  useEffect(() => {
    setLiveNowMinutes(nowMinutes);
  }, [nowMinutes]);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveNowMinutes(getNowFestivalMinutes());
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const grid = useMemo(
    () =>
      buildStageGridTimeline(
        recommendations,
        stages,
        liveNowMinutes,
        previewMode,
        pxPerMin
      ),
    [recommendations, stages, liveNowMinutes, previewMode, pxPerMin]
  );

  const handlePlay = async (rec: DJRecommendation) => {
    onPickRec(rec);
    let url = rec.previewTrack?.previewUrl ?? null;
    if (!url) {
      setLoadingId(rec.set.id);
      const fetched = await fetchITunesPreview(rec.artist.name);
      setLoadingId(null);
      url = fetched?.previewUrl ?? null;
    }
    if (!url) return;
    await startGlobalPreviewPlayback({
      url,
      playbackId: rec.set.id,
      setActivePlaybackId,
    });
  };

  if (grid.items.length === 0) return null;

  const gridW = grid.stageColumns.length * colW;

  return (
    <div
      className="flex flex-col min-h-0 flex-1 rounded-none sm:rounded-xl overflow-hidden lg:rounded-xl"
      style={{
        background: "rgba(10,10,10,0.72)",
        border: "1px solid rgba(184,184,184,0.12)",
      }}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 shrink-0 border-b border-[rgba(184,184,184,0.08)]">
        <h3
          className="font-display text-[13px] lg:text-[12px] uppercase tracking-[0.16em]"
          style={{ color: "rgba(184,184,184,0.45)" }}
        >
          Day schedule
        </h3>
        <span className="text-xs lg:text-[11px] font-display" style={{ color: "#39FF14" }}>
          {previewMode
            ? "Preview"
            : formatArrivalClock(liveNowMinutes).replace("Arrive ~ ", "Now ")}
        </span>
      </div>

      <div
        className="flex-1 min-h-[min(520px,70dvh)] max-lg:min-h-[calc(100dvh-11.5rem)] lg:min-h-[calc(100vh-148px)] overflow-auto overscroll-x-contain touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch]"
      >
        {/* 顶行：舞台名 */}
        <div
          className="flex sticky top-0 z-20 border-b border-[rgba(184,184,184,0.1)]"
          style={{ background: "rgba(10,10,10,0.96)" }}
        >
          <div
            className="shrink-0 border-r border-[rgba(184,184,184,0.1)]"
            style={{ width: labelW }}
          />
          <div className="flex min-w-max">
            {grid.stageColumns.map(({ stage }) => (
              <div
                key={stage.id}
                className="shrink-0 px-1.5 py-2.5 text-center font-display text-[11px] lg:text-[10px] uppercase tracking-[0.1em] leading-snug border-r border-[rgba(184,184,184,0.08)] last:border-r-0 max-lg:min-h-[44px] max-lg:flex max-lg:items-center max-lg:justify-center"
                style={{
                  width: colW,
                  color: stage.color,
                }}
                title={stage.name}
              >
                {stage.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-max">
          {/* 左侧时间刻度 */}
          <div
            className="shrink-0 relative border-r border-[rgba(184,184,184,0.1)]"
            style={{ width: labelW, height: grid.contentHeightPx }}
          >
            {grid.timeLabels.map((tl) => (
              <div
                key={tl.min}
                className="absolute left-1.5 right-1 text-xs lg:text-[11px] font-display leading-tight pointer-events-none"
                style={{
                  top: tl.topPx,
                  color: "rgba(184,184,184,0.5)",
                }}
              >
                {tl.label}
              </div>
            ))}
          </div>

          {/* 舞台列 + 演出块 */}
          <div
            className="relative shrink-0"
            style={{ width: gridW, height: grid.contentHeightPx }}
          >
            <div className="absolute inset-0 flex pointer-events-none">
              {grid.stageColumns.map(({ stage }) => (
                <div
                  key={stage.id}
                  className="shrink-0 border-r border-[rgba(184,184,184,0.06)]"
                  style={{
                    width: colW,
                    background: "rgba(255,255,255,0.02)",
                  }}
                />
              ))}
            </div>

            {grid.nowLinePx != null && (
              <div
                className="absolute left-0 z-10 pointer-events-none"
                style={{
                  top: grid.nowLinePx,
                  width: "100%",
                  height: 2,
                  background: "#39FF14",
                  boxShadow: "0 0 10px rgba(57,255,20,0.55)",
                }}
              />
            )}

            {grid.items.map((item) => {
              const isPlaying = activePlaybackId === item.rec.set.id;
              const left = item.colIndex * colW + 3;
              const blockW = colW - 6;
              return (
                <button
                  key={item.rec.set.id}
                  type="button"
                  onClick={() => handlePlay(item.rec)}
                  className="absolute text-left cursor-pointer transition-all rounded-sm px-1.5 py-1.5 lg:py-1 overflow-hidden z-[5] max-lg:active:scale-[0.99]"
                  style={{
                    left,
                    top: item.topPx,
                    width: blockW,
                    height: item.heightPx,
                    minHeight: isMobile ? 44 : 36,
                    background: item.isLive && !previewMode
                      ? "rgba(57,255,20,0.14)"
                      : "rgba(255,255,255,0.07)",
                    border:
                      item.isLive && !previewMode
                        ? "1px solid rgba(57,255,20,0.4)"
                        : "1px solid rgba(184,184,184,0.16)",
                    opacity: !previewMode && item.isPast ? 0.42 : 1,
                    filter: !previewMode && item.isPast ? "brightness(0.68)" : undefined,
                    boxShadow: isPlaying ? "0 0 12px rgba(57,255,20,0.35)" : undefined,
                  }}
                  title={`${item.rec.artist.name} · ${item.rec.stage.name}`}
                >
                  <div className="text-[12px] lg:text-[11px] font-display uppercase truncate leading-snug text-white/92">
                    {item.rec.artist.name}
                  </div>
                  <div className="text-[11px] lg:text-[9px] text-white/45 leading-snug mt-0.5">
                    {formatSetTime(item.rec.set.startTime)} –{" "}
                    {formatSetTime(item.rec.set.endTime)}
                  </div>
                  <div
                    className="text-[10px] lg:text-[9px] truncate mt-0.5"
                    style={{ color: item.rec.stage.color }}
                  >
                    {loadingId === item.rec.set.id ? "…" : item.rec.stage.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
