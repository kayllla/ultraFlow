import type { Stage } from "@/types";
import { stages as defaultStages } from "@/data/stages";

const STORAGE_KEY = "ultraflow_stage_positions";

export type StagePositionOverride = Record<string, { x: number; y: number }>;

export function loadStageOverrides(): StagePositionOverride {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StagePositionOverride;
  } catch {
    return {};
  }
}

export function saveStageOverrides(overrides: StagePositionOverride): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {}
}

export function clearStageOverrides(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

/** 默认坐标 + 本地校准覆盖 */
export function getMergedStages(overrides: StagePositionOverride): Stage[] {
  return defaultStages.map((s) => {
    const o = overrides[s.id];
    if (!o) return s;
    return { ...s, x: o.x, y: o.y };
  });
}

export function getMergedStageMap(
  overrides: StagePositionOverride
): Record<string, Stage> {
  return Object.fromEntries(getMergedStages(overrides).map((s) => [s.id, s]));
}
