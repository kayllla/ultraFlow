import type { Artist, SetSlot, Stage } from "@/types";

export interface FestivalInfo {
  id: string;
  name: string;
  shortName: string;
  location: string;
  dates: string;
  mapSrc: string;
  accentColor: string;
  dayLabels: Record<number, string>;
  festStart: { y: number; m: number; d: number };
  festEnd: { y: number; m: number; d: number };
  getLineup: () => {
    artists: Artist[];
    artistMap: Record<string, Artist>;
    sets: SetSlot[];
    getSetsForDay: (day: 1 | 2 | 3) => SetSlot[];
  };
  getStages: () => {
    stages: Stage[];
    stageMap: Record<string, Stage>;
  };
}

import * as ultraLineup from "@/data/lineup";
import * as ultraStages from "@/data/stages";
import * as edcLineup from "@/data/festivals/edc-vegas-2026/lineup";
import * as edcStages from "@/data/festivals/edc-vegas-2026/stages";

export const FESTIVALS: Record<string, FestivalInfo> = {
  "ultra-miami-2025": {
    id: "ultra-miami-2025",
    name: "Ultra Music Festival Miami 2025",
    shortName: "Ultra Miami",
    location: "Bayfront Park, Miami",
    dates: "March 28–30, 2025",
    mapSrc: "/map.jpg",
    accentColor: "#39FF14",
    dayLabels: {
      1: "FRI MAR 28",
      2: "SAT MAR 29",
      3: "SUN MAR 30",
    },
    festStart: { y: 2025, m: 2, d: 28 },
    festEnd: { y: 2025, m: 2, d: 30 },
    getLineup: () => ultraLineup,
    getStages: () => ultraStages,
  },
  "edc-vegas-2026": {
    id: "edc-vegas-2026",
    name: "EDC Las Vegas 2026",
    shortName: "EDC Vegas",
    location: "Las Vegas Motor Speedway",
    dates: "May 15–17, 2026",
    mapSrc: "/edc-map.png",
    accentColor: "#FF00DD",
    dayLabels: {
      1: "FRI MAY 15",
      2: "SAT MAY 16",
      3: "SUN MAY 17",
    },
    festStart: { y: 2026, m: 4, d: 15 },
    festEnd: { y: 2026, m: 4, d: 17 },
    getLineup: () => edcLineup,
    getStages: () => edcStages,
  },
};

export const FESTIVAL_IDS = Object.keys(FESTIVALS) as (keyof typeof FESTIVALS)[];
export const DEFAULT_FESTIVAL_ID = "ultra-miami-2025";

export function getFestivalInfo(id: string): FestivalInfo {
  return FESTIVALS[id] ?? FESTIVALS[DEFAULT_FESTIVAL_ID];
}
