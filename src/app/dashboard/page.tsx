"use client";

import { useState, useEffect, useRef } from "react";
import DaySelector from "@/components/DaySelector";
import DJList from "@/components/DJList";
import FestivalMap from "@/components/FestivalMap";
import DayTimeline from "@/components/DayTimeline";
import FestivalSelector from "@/components/FestivalSelector";
import { usePlan } from "@/context/PlanContext";
import { useFestival } from "@/context/FestivalContext";
import type { Day, DJRecommendation } from "@/types";
import { getNowFestivalMinutes } from "@/lib/now-recommend";

function RecommendationSync() {
  const { setRecommendations, setSpotifyConnected, setIsLoading } = usePlan();
  const { festivalId } = useFestival();
  const fetchedRef = useRef<{ festivalId: string; days: Set<Day> }>({
    festivalId: "",
    days: new Set(),
  });

  useEffect(() => {
    // When festival changes, reset fetched days
    if (fetchedRef.current.festivalId !== festivalId) {
      fetchedRef.current = { festivalId, days: new Set() };
    }

    const daysToFetch = ([1, 2, 3] as const).filter(
      (d) => !fetchedRef.current.days.has(d)
    );
    if (daysToFetch.length === 0) return;

    let cancelled = false;

    for (const d of daysToFetch) {
      fetchedRef.current.days.add(d);
    }
    setIsLoading(true);

    const fetchOne = async (day: Day) => {
      try {
        const u = await fetch(`/api/recommend?day=${day}&festival=${festivalId}`, {
          credentials: "include",
        });
        if (u.ok) {
          const data = await u.json();
          if (!cancelled) {
            setRecommendations(day, data.recommendations as DJRecommendation[]);
            setSpotifyConnected(true);
          }
          return;
        }
      } catch {}

      try {
        const d = await fetch(`/api/recommend-demo?day=${day}&festival=${festivalId}`);
        if (d.ok) {
          const data = await d.json();
          if (!cancelled) {
            setRecommendations(day, data.recommendations as DJRecommendation[]);
          }
        }
      } catch {}
    };

    Promise.all(daysToFetch.map((day) => fetchOne(day))).finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [festivalId, setRecommendations, setSpotifyConnected, setIsLoading]);

  return null;
}

export default function DashboardPage() {
  const {
    getKeptRecommendations,
    currentDay,
    recommendations,
    mergedStages,
    toggleArtist,
  } = usePlan();
  const { festival } = useFestival();
  const [highlightStageId, setHighlightStageId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<"schedule" | "venue">("schedule");
  const [showFestivalPicker, setShowFestivalPicker] = useState(false);

  const kept = getKeptRecommendations();
  const effectiveHighlight =
    kept[0]?.set.stageId ?? highlightStageId;

  const dayRecs = recommendations[currentDay] || [];
  const nowMinutes = getNowFestivalMinutes();

  return (
    <main className="relative min-h-screen z-10">
      <RecommendationSync />

      <header className="sticky top-0 z-30 glass-strong">
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(57,255,20,0.4), rgba(184,184,184,0.3), rgba(57,255,20,0.4), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 sm:gap-6 min-w-0">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center cut-corner-sm"
                  style={{
                    background: "rgba(14,14,14,0.9)",
                    border: `1px solid ${festival.accentColor}59`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-led-pulse"
                    style={{ backgroundColor: festival.accentColor }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowFestivalPicker((v) => !v)}
                  className="flex flex-col items-start cursor-pointer"
                >
                  <h1 className="font-display text-base sm:text-sm font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] truncate">
                    <span className="text-chrome-shimmer">FestFlow</span>
                  </h1>
                  <span
                    className="font-display text-[8px] uppercase tracking-widest hidden sm:block"
                    style={{ color: festival.accentColor, opacity: 0.8 }}
                  >
                    {festival.shortName} ▾
                  </span>
                </button>
              </div>

              {/* Festival picker dropdown */}
              {showFestivalPicker && (
                <div
                  className="absolute top-full left-0 right-0 z-50 p-4"
                  style={{
                    background: "rgba(8,8,8,0.98)",
                    borderBottom: "1px solid rgba(184,184,184,0.12)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <FestivalSelector onSelect={() => setShowFestivalPicker(false)} />
                </div>
              )}

              <DaySelector />
            </div>
          </div>

          <div className="flex gap-2 mt-2.5 lg:hidden">
            {(["schedule", "venue"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMobileTab(tab)}
                className="flex-1 py-2.5 min-h-[44px] font-display text-xs uppercase tracking-widest transition-all cursor-pointer cut-corner-sm active:opacity-90"
                style={{
                  background:
                    mobileTab === tab
                      ? "rgba(57,255,20,0.06)"
                      : "rgba(14,14,14,0.8)",
                  border:
                    mobileTab === tab
                      ? "1px solid rgba(57,255,20,0.3)"
                      : "1px solid rgba(184,184,184,0.08)",
                  color:
                    mobileTab === tab ? "#39FF14" : "rgba(184,184,184,0.35)",
                }}
              >
                {tab === "schedule" ? "Schedule" : "Map & picks"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.85fr)] lg:gap-6 lg:items-start">
          {/* Left: timeline */}
          <section
            className={`lg:min-h-0 flex flex-col mb-0 max-lg:flex-1 max-lg:min-h-0 ${
              mobileTab !== "schedule" ? "hidden lg:flex" : ""
            }`}
          >
            <DayTimeline
              recommendations={dayRecs}
              nowMinutes={nowMinutes}
              stages={mergedStages}
              onPickRec={(rec) => toggleArtist(rec.artist.id)}
            />
          </section>

          {/* Right: map + picks */}
          <section
            className={`flex flex-col gap-3 sm:gap-4 min-w-0 ${
              mobileTab !== "venue" ? "hidden lg:flex" : ""
            }`}
          >
            <div className="lg:sticky lg:top-20 lg:self-start w-full space-y-3">
              <div className="flex items-center justify-between px-0.5 sm:px-0">
                <h2
                  className="font-display text-xs sm:text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "rgba(184,184,184,0.35)" }}
                >
                  Map & path
                </h2>
              </div>
              <FestivalMap highlightStageId={effectiveHighlight} />
              <DJList
                onSelectArtist={(stageId) => {
                  setHighlightStageId(stageId);
                  setMobileTab("venue");
                  setTimeout(() => setHighlightStageId(null), 2000);
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
