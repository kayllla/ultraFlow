import type { Stage } from "@/types";
import { stages as defaultStages } from "@/data/stages";

const STORAGE_KEY_PREFIX = "ultraflow_stage_positions";

export type StagePositionOverride = Record<string, { x: number; y: number }>;

function getStorageKey(festivalId?: string): string {
  return festivalId
    ? `${STORAGE_KEY_PREFIX}_${festivalId}`
    : STORAGE_KEY_PREFIX;
}

export function loadStageOverrides(festivalId?: string): StagePositionOverride {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(getStorageKey(festivalId));
    if (!raw) return {};
    return JSON.parse(raw) as StagePositionOverride;
  } catch {
    return {};
  }
}

export function saveStageOverrides(overrides: StagePositionOverride, festivalId?: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStorageKey(festivalId), JSON.stringify(overrides));
  } catch {}
}

export function clearStageOverrides(festivalId?: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getStorageKey(festivalId));
  } catch {}
}

/** 默认坐标 + 本地校准覆盖，支持传入自定义舞台列表 */
export function getMergedStages(
  overrides: StagePositionOverride,
  baseStages?: Stage[]
): Stage[] {
  const stages = baseStages ?? defaultStages;
  return stages.map((s) => {
    const o = overrides[s.id];
    if (!o) return s;
    return { ...s, x: o.x, y: o.y };
  });
}

export function getMergedStageMap(
  overrides: StagePositionOverride,
  baseStages?: Stage[]
): Record<string, Stage> {
  return Object.fromEntries(getMergedStages(overrides, baseStages).map((s) => [s.id, s]));
}
