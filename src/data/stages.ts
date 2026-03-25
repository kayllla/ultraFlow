import { Stage } from "@/types";

export const stages: Stage[] = [
  {
    id: "mainstage",
    name: "Main Stage",
    x: 55,
    y: 29,
    color: "#00f0ff",
  },
  {
    id: "worldwide",
    name: "Worldwide",
    x: 43,
    y: 43,
    color: "#7b2ff7",
  },
  {
    id: "resistance-mega",
    name: "Resistance",
    x: 38,
    y: 17,
    color: "#ff2d95",
  },
  {
    id: "resistance-cove",
    name: "The Cove",
    x: 44,
    y: 20,
    color: "#ff69b4",
  },
  {
    id: "live-stage",
    name: "Live Stage",
    x: 28,
    y: 31,
    color: "#00ff88",
  },
  {
    id: "umf-radio",
    name: "UMF Radio",
    x: 72,
    y: 24,
    color: "#ffaa00",
  },
  {
    id: "oasis",
    name: "Oasis",
    x: 68,
    y: 20,
    color: "#ff6b35",
  },
];

export const stageMap = Object.fromEntries(stages.map((s) => [s.id, s]));
