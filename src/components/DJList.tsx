"use client";

import { usePlan } from "@/context/PlanContext";
import DJCard from "./DJCard";
import { useMemo, useState, useEffect } from "react";
import {
  getNowTopRecommendations,
  getNowFestivalMinutes,
} from "@/lib/now-recommend";

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="cut-corner animate-pulse"
      style={{
        background: "rgba(14,14,14,0.92)",
        border: "1px solid rgba(184,184,184,0.08)",
        animationDelay: `${index * 120}ms`,
      }}
    >
      <div className="p-3 md:p-4 flex gap-3">
        <div
          className="cut-corner-sm shrink-0"
          style={{ width: 72, height: 72, background: "rgba(57,255,20,0.03)" }}
        />
        <div className="flex-1 space-y-2.5 py-1">
          <div
            className="h-3 rounded"
            style={{ width: "60%", background: "rgba(184,184,184,0.08)" }}
          />
          <div
            className="h-2 rounded"
            style={{ width: "40%", background: "rgba(184,184,184,0.05)" }}
          />
          <div className="flex gap-1.5 mt-1">
            <div
              className="h-4 w-16 rounded"
              style={{ background: "rgba(184,184,184,0.05)" }}
            />
            <div
              className="h-4 w-14 rounded"
              style={{ background: "rgba(184,184,184,0.05)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-led-pulse" />
          <span
            className="font-display text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "rgba(57,255,20,0.5)" }}
          >
            Analyzing your taste...
          </span>
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  );
}

export default function DJList({
  onSelectArtist,
}: {
  onSelectArtist?: (stageId: string) => void;
}) {
  const {
    currentDay,
    recommendations,
    isLoading,
    getArtistStatus,
    toggleArtist,
    mergedStageMap,
    startStageByDay,
  } = usePlan();

  const [nowTick, setNowTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNowTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const recs = recommendations[currentDay] || [];
  const startStageId = startStageByDay[currentDay];
  const startStage = startStageId ? mergedStageMap[startStageId] ?? null : null;

  const nowMinutes = useMemo(
    () => getNowFestivalMinutes(),
    [nowTick]
  );

  const nowSorted = useMemo(
    () =>
      getNowTopRecommendations(recs, startStage, mergedStageMap, nowMinutes, {
        topN: 5,
      }),
    [recs, startStage, mergedStageMap, nowMinutes]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex flex-col gap-0.5">
          <h2
            className="font-display text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "rgba(184,184,184,0.35)" }}
          >
            Now · Top 5 reachable
          </h2>
          <span
            className="text-[9px] font-display uppercase tracking-widest"
            style={{ color: "rgba(184,184,184,0.2)" }}
          >
            {startStage
              ? `From ${startStage.name} · 含步行与 ≥20min 观演`
              : "未设起点：按时间可听满 20min 的场次（无步行）"}
          </span>
        </div>
        <span
          className="text-[10px] font-display uppercase tracking-widest"
          style={{ color: "rgba(184,184,184,0.2)" }}
        >
          {isLoading ? "" : `${nowSorted.length} picks`}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 pb-4">
        {isLoading && recs.length === 0 ? (
          <LoadingSkeleton />
        ) : (
          <>
            {nowSorted.map((rec, i) => (
              <DJCard
                key={rec.set.id}
                rec={rec}
                status={getArtistStatus(rec.artist.id)}
                onToggle={() => toggleArtist(rec.artist.id)}
                onSelect={() => onSelectArtist?.(rec.set.stageId)}
                index={i}
              />
            ))}

            {nowSorted.length === 0 && (
              <div
                className="text-center py-12 font-display text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(184,184,184,0.2)" }}
              >
                No reachable sets right now
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
