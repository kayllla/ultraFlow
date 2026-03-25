"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { usePlan } from "@/context/PlanContext";
import DirectPathOverlay from "./DirectPathOverlay";
import { walkMinutes } from "@/lib/route-engine";
import {
  getNowFestivalMinutes,
  formatArrivalClock,
} from "@/lib/now-recommend";
import type { Stage } from "@/types";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function FestivalMap({
  highlightStageId,
}: {
  highlightStageId: string | null;
}) {
  const {
    currentDay,
    startStageByDay,
    mergedStages,
    mergedStageMap,
    getKeptRecommendations,
    setStartStageId,
    setStageOverrides,
    resetStageOverrides,
  } = usePlan();

  const startStageId = startStageByDay[currentDay];
  const startStage = startStageId ? mergedStageMap[startStageId] ?? null : null;
  const kept = getKeptRecommendations();
  const targetRec = kept[0];
  const targetStage = targetRec
    ? mergedStageMap[targetRec.set.stageId] ?? null
    : null;

  const pathWalkMins =
    startStage && targetStage
      ? walkMinutes(startStage, targetStage)
      : 0;
  const arriveAtMins = getNowFestivalMinutes() + pathWalkMins;
  const arriveLabel = formatArrivalClock(arriveAtMins);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [mapOpen, setMapOpen] = useState(false);
  const [calibrateMode, setCalibrateMode] = useState(false);
  const [dragging, setDragging] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setMapOpen(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const img = containerRef.current.querySelector("img");
        if (img) {
          setDims({ width: img.clientWidth, height: img.clientHeight });
        }
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mapOpen]);

  const getImageRect = useCallback(() => {
    const img = containerRef.current?.querySelector("img");
    return img?.getBoundingClientRect() ?? null;
  }, []);

  const clientToPercent = useCallback(
    (clientX: number, clientY: number) => {
      const rect = getImageRect();
      if (!rect) return { x: 0, y: 0 };
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      return { x: clamp(x, 2, 98), y: clamp(y, 2, 98) };
    },
    [getImageRect]
  );

  const displayStages: Stage[] = useMemo(() => {
    if (!dragging) return mergedStages;
    return mergedStages.map((s) =>
      s.id === dragging.id ? { ...s, x: dragging.x, y: dragging.y } : s
    );
  }, [mergedStages, dragging]);

  const hasPath = Boolean(startStage && targetStage);
  const pathHighlightId = targetStage?.id ?? highlightStageId;
  const nowMinutes = getNowFestivalMinutes();

  const handleStagePointerDown = (
    e: React.PointerEvent,
    stage: Stage
  ) => {
    if (!calibrateMode) return;
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging({ id: stage.id, x: stage.x, y: stage.y });
  };

  const handleStagePointerMove = (e: React.PointerEvent, stageId: string) => {
    if (!calibrateMode || !dragging || dragging.id !== stageId) return;
    const { x, y } = clientToPercent(e.clientX, e.clientY);
    setDragging({ id: stageId, x, y });
  };

  const handleStagePointerUp = (e: React.PointerEvent, stageId: string) => {
    if (!calibrateMode || !dragging || dragging.id !== stageId) return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const { x, y } = clientToPercent(e.clientX, e.clientY);
    setStageOverrides((prev) => ({ ...prev, [stageId]: { x, y } }));
    setDragging(null);
  };

  const onStageClick = (e: React.MouseEvent, stageId: string) => {
    if (calibrateMode) return;
    e.stopPropagation();
    setStartStageId(
      startStageId === stageId ? null : stageId
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setMapOpen((o) => !o)}
          className="flex-1 min-w-[140px] flex items-center justify-between gap-2 px-2 py-2 rounded-lg transition-colors cursor-pointer cut-corner-sm font-display text-[10px] uppercase tracking-[0.15em]"
          style={{
            background: "rgba(14,14,14,0.85)",
            border: "1px solid rgba(184,184,184,0.12)",
            color: "rgba(184,184,184,0.55)",
          }}
        >
          <span className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: hasPath ? "#39FF14" : "rgba(184,184,184,0.25)",
                boxShadow: hasPath
                  ? "0 0 8px rgba(57,255,20,0.5)"
                  : undefined,
              }}
            />
            场地地图
            {startStageId && (
              <span style={{ color: "#39FF14" }}>· 起点已设</span>
            )}
          </span>
          <span
            className="text-[9px] tracking-widest shrink-0"
            style={{ color: "rgba(184,184,184,0.35)" }}
          >
            {mapOpen ? "收起" : "展开"}
          </span>
        </button>

        {mapOpen && (
          <>
            <button
              type="button"
              onClick={() => setCalibrateMode((c) => !c)}
              className="font-display text-[10px] px-3 py-2 uppercase tracking-widest cut-corner-sm cursor-pointer"
              style={{
                background: calibrateMode
                  ? "rgba(57,255,20,0.1)"
                  : "rgba(14,14,14,0.85)",
                border: calibrateMode
                  ? "1px solid rgba(57,255,20,0.35)"
                  : "1px solid rgba(184,184,184,0.12)",
                color: calibrateMode ? "#39FF14" : "rgba(184,184,184,0.45)",
              }}
            >
              {calibrateMode ? "完成校准" : "校准点位"}
            </button>
            <button
              type="button"
              onClick={() => resetStageOverrides()}
              className="font-display text-[10px] px-3 py-2 uppercase tracking-widest cut-corner-sm cursor-pointer"
              style={{
                background: "rgba(14,14,14,0.85)",
                border: "1px solid rgba(184,184,184,0.12)",
                color: "rgba(184,184,184,0.35)",
              }}
            >
              重置默认
            </button>
          </>
        )}
      </div>

      {mapOpen && (
        <div>
          <div
            className="relative rounded-xl overflow-hidden glass touch-pan-x touch-pan-y touch-pinch-zoom"
            ref={containerRef}
          >
            <img
              src="/map.jpg"
              alt="Ultra Miami 2025 Map"
              className="w-full h-auto block select-none"
              style={{
                filter: "grayscale(1) contrast(1.2) brightness(0.92)",
              }}
              onLoad={() => {
                if (containerRef.current) {
                  const img = containerRef.current.querySelector("img");
                  if (img) {
                    setDims({ width: img.clientWidth, height: img.clientHeight });
                  }
                }
              }}
              draggable={false}
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0 80px rgba(0,0,0,0.35)",
              }}
            />

            {dims.width > 0 && (
              <div className="absolute inset-0">
              {displayStages.map((stage) => {
                const isStart = startStageId === stage.id;
                const isHighlighted = pathHighlightId === stage.id;

                const interactive = calibrateMode;
                return (
                  <div
                    key={stage.id}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => onStageClick(e, stage.id)}
                    onPointerDown={(e) => handleStagePointerDown(e, stage)}
                    onPointerMove={(e) => handleStagePointerMove(e, stage.id)}
                    onPointerUp={(e) => handleStagePointerUp(e, stage.id)}
                    onPointerCancel={() => setDragging(null)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      interactive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                    } ${calibrateMode ? "" : ""}`}
                    style={{
                      left: `${stage.x}%`,
                      top: `${stage.y}%`,
                      zIndex: isHighlighted ? 14 : isStart ? 13 : 10,
                      pointerEvents: "auto",
                    }}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <div
                        className={`rounded-full ring-1 ring-white/30 ${
                          isStart ? "w-3 h-3" : "w-2 h-2"
                        }`}
                        style={{
                          backgroundColor: stage.color,
                          boxShadow: isHighlighted
                            ? `0 0 14px ${stage.color}`
                            : isStart
                              ? "0 0 12px #39FF14"
                              : `0 0 4px ${stage.color}60`,
                        }}
                      />
                      {isStart && (
                        <span
                          className="text-[8px] font-display font-bold px-1 py-0.5 rounded"
                          style={{
                            color: "#39FF14",
                            background: "rgba(0,0,0,0.5)",
                            textShadow: "0 0 8px rgba(0,0,0,0.9)",
                          }}
                        >
                          You
                        </span>
                      )}
                      <span
                        className="text-[7px] font-display font-bold uppercase tracking-wider whitespace-nowrap px-1 py-0.5 rounded max-w-[92px] truncate text-center leading-tight"
                        style={{
                          color: "#f0f0f0",
                          textShadow:
                            "0 1px 2px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)",
                          background: "rgba(0,0,0,0.35)",
                        }}
                      >
                        {stage.name}
                      </span>
                    </div>
                  </div>
                );
              })}

              {startStage && targetStage && startStage.id !== targetStage.id && (
                <DirectPathOverlay
                  start={startStage}
                  target={targetStage}
                  walkMins={pathWalkMins}
                  arriveLabel={arriveLabel}
                  width={dims.width}
                  height={dims.height}
                />
              )}
              {startStage && targetStage && startStage.id === targetStage.id && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <span
                    className="font-display text-[10px] px-3 py-1.5 rounded"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      color: "#39FF14",
                      border: "1px solid rgba(57,255,20,0.25)",
                    }}
                  >
                    已在该舞台 · Walk 0 min
                  </span>
                </div>
              )}
              </div>
            )}

            {!startStageId && !calibrateMode && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                <div className="text-center px-4">
                  <p className="text-white/55 text-sm font-display uppercase tracking-wider">
                    点选舞台作为「我在这里」
                  </p>
                  <p className="text-white/25 text-[11px] mt-1">
                    选中 DJ 后显示直线步行路径
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
