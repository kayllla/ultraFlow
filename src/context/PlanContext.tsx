"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import type { Day, DJRecommendation, PlanStatus, Stage } from "@/types";
import { generateDemoRecommendations } from "@/lib/recommend";
import {
  loadStageOverrides,
  saveStageOverrides,
  getMergedStages,
  getMergedStageMap,
  type StagePositionOverride,
} from "@/lib/stage-layout";

interface PlanState {
  currentDay: Day;
  recommendations: Record<Day, DJRecommendation[]>;
  dayPlan: Record<Day, Record<string, PlanStatus>>;
  startStageByDay: Record<Day, string | null>;
  stageOverrides: StagePositionOverride;
  isSpotifyConnected: boolean;
  isLoading: boolean;
}

interface PlanContextValue extends PlanState {
  setCurrentDay: (day: Day) => void;
  setRecommendations: (day: Day, recs: DJRecommendation[]) => void;
  keepArtist: (artistId: string) => void;
  removeArtist: (artistId: string) => void;
  toggleArtist: (artistId: string) => void;
  getArtistStatus: (artistId: string) => PlanStatus | undefined;
  getKeptRecommendations: () => DJRecommendation[];
  setSpotifyConnected: (v: boolean) => void;
  setIsLoading: (v: boolean) => void;
  setStartStageId: (stageId: string | null) => void;
  setStageOverrides: (
    next:
      | StagePositionOverride
      | ((prev: StagePositionOverride) => StagePositionOverride)
  ) => void;
  resetStageOverrides: () => void;
  mergedStages: Stage[];
  mergedStageMap: Record<string, Stage>;
}

const PlanContext = createContext<PlanContextValue | null>(null);

const STORAGE_KEY = "ultraflow_plan";

interface StoredPlan {
  currentDay?: Day;
  dayPlan?: Record<Day, Record<string, PlanStatus>>;
  startStageByDay?: Record<Day, string | null>;
}

function loadFromStorage(): StoredPlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredPlan;
  } catch {
    return null;
  }
}

function saveToStorage(
  state: Pick<PlanState, "currentDay" | "dayPlan" | "startStageByDay">
) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [currentDay, setCurrentDay] = useState<Day>(1);
  const [recommendations, setRecommendationsState] = useState<
    Record<Day, DJRecommendation[]>
  >({ 1: [], 2: [], 3: [] });
  const [dayPlan, setDayPlan] = useState<
    Record<Day, Record<string, PlanStatus>>
  >({ 1: {}, 2: {}, 3: {} });
  const [startStageByDay, setStartStageByDay] = useState<
    Record<Day, string | null>
  >({ 1: null, 2: null, 3: null });
  const [stageOverrides, setStageOverridesState] =
    useState<StagePositionOverride>({});
  const [isSpotifyConnected, setSpotifyConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored?.currentDay) setCurrentDay(stored.currentDay);
    if (stored?.startStageByDay) {
      setStartStageByDay((prev) => ({ ...prev, ...stored.startStageByDay }));
    }
    setStageOverridesState(loadStageOverrides());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setRecommendationsState((prev) => {
      let changed = false;
      const next: Record<Day, DJRecommendation[]> = { ...prev };
      for (const d of [1, 2, 3] as const) {
        if ((next[d]?.length ?? 0) === 0) {
          next[d] = generateDemoRecommendations(d);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setDayPlan((prev) => {
      let changed = false;
      const next: Record<Day, Record<string, PlanStatus>> = { ...prev };
      for (const d of [1, 2, 3] as const) {
        const day = { ...(next[d] || {}) };
        for (const [id, st] of Object.entries(day)) {
          if (st === "removed") {
            delete day[id];
            changed = true;
          }
        }
        next[d] = day;
      }
      return changed ? next : prev;
    });
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage({ currentDay, dayPlan, startStageByDay });
  }, [currentDay, dayPlan, startStageByDay, hydrated]);

  const mergedStages = useMemo(
    () => getMergedStages(stageOverrides),
    [stageOverrides]
  );
  const mergedStageMap = useMemo(
    () => getMergedStageMap(stageOverrides),
    [stageOverrides]
  );

  const setRecommendations = useCallback(
    (day: Day, recs: DJRecommendation[]) => {
      setRecommendationsState((prev) => ({ ...prev, [day]: recs }));
    },
    []
  );

  const keepArtist = useCallback(
    (artistId: string) => {
      setDayPlan((prev) => ({
        ...prev,
        [currentDay]: { ...prev[currentDay], [artistId]: "kept" as PlanStatus },
      }));
    },
    [currentDay]
  );

  const removeArtist = useCallback(
    (artistId: string) => {
      setDayPlan((prev) => {
        const day = { ...(prev[currentDay] || {}) };
        delete day[artistId];
        return { ...prev, [currentDay]: day };
      });
    },
    [currentDay]
  );

  /** 单选：点同一 DJ 取消；点新 DJ 仅保留该位 */
  const toggleArtist = useCallback(
    (artistId: string) => {
      setDayPlan((prev) => {
        const day = { ...(prev[currentDay] || {}) };
        if (day[artistId] === "kept") {
          delete day[artistId];
          return { ...prev, [currentDay]: day };
        }
        return {
          ...prev,
          [currentDay]: { [artistId]: "kept" as PlanStatus },
        };
      });
    },
    [currentDay]
  );

  const getArtistStatus = useCallback(
    (artistId: string): PlanStatus | undefined => {
      return dayPlan[currentDay]?.[artistId];
    },
    [currentDay, dayPlan]
  );

  const getKeptRecommendations = useCallback((): DJRecommendation[] => {
    return (
      recommendations[currentDay]?.filter(
        (r) => dayPlan[currentDay]?.[r.artist.id] === "kept"
      ) || []
    );
  }, [currentDay, recommendations, dayPlan]);

  const setStartStageId = useCallback((stageId: string | null) => {
    setStartStageByDay((prev) => ({ ...prev, [currentDay]: stageId }));
  }, [currentDay]);

  const setStageOverrides = useCallback(
    (
      next:
        | StagePositionOverride
        | ((prev: StagePositionOverride) => StagePositionOverride)
    ) => {
      setStageOverridesState((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        saveStageOverrides(resolved);
        return resolved;
      });
    },
    []
  );

  const resetStageOverrides = useCallback(() => {
    setStageOverridesState({});
    saveStageOverrides({});
  }, []);

  return (
    <PlanContext.Provider
      value={{
        currentDay,
        recommendations,
        dayPlan,
        startStageByDay,
        stageOverrides,
        isSpotifyConnected,
        isLoading,
        setCurrentDay,
        setRecommendations,
        keepArtist,
        removeArtist,
        toggleArtist,
        getArtistStatus,
        getKeptRecommendations,
        setSpotifyConnected,
        setIsLoading,
        setStartStageId,
        setStageOverrides,
        resetStageOverrides,
        mergedStages,
        mergedStageMap,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
