"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getFestivalInfo, DEFAULT_FESTIVAL_ID, type FestivalInfo } from "@/data/festival-registry";

const STORAGE_KEY = "ultraflow_festival";

interface FestivalContextValue {
  festivalId: string;
  festival: FestivalInfo;
  setFestivalId: (id: string) => void;
}

const FestivalContext = createContext<FestivalContextValue | null>(null);

export function FestivalProvider({ children }: { children: React.ReactNode }) {
  const [festivalId, setFestivalIdState] = useState<string>(DEFAULT_FESTIVAL_ID);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFestivalIdState(stored);
    } catch {}
  }, []);

  const setFestivalId = useCallback((id: string) => {
    setFestivalIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  }, []);

  const festival = getFestivalInfo(festivalId);

  return (
    <FestivalContext.Provider value={{ festivalId, festival, setFestivalId }}>
      {children}
    </FestivalContext.Provider>
  );
}

export function useFestival() {
  const ctx = useContext(FestivalContext);
  if (!ctx) throw new Error("useFestival must be used within FestivalProvider");
  return ctx;
}
