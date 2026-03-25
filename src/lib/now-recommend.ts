import { DJRecommendation, Stage } from "@/types";
import { timeToMinutes, walkMinutes } from "@/lib/route-engine";

export interface NowPick extends DJRecommendation {
  walkMins: number;
  arriveAtMins: number;
  watchMins: number;
  effectiveScore: number;
}

const MIN_WATCH = 20;
const TOP_N = 5;
const α = 1.2;
const β = 0.9;

function resolveEffectiveNowMinutes(
  recommendations: DJRecommendation[],
  nowMinutes: number
): number {
  if (recommendations.length === 0) return nowMinutes;
  const starts = recommendations.map((r) => timeToMinutes(r.set.startTime));
  const ends = recommendations.map((r) => timeToMinutes(r.set.endTime));
  const minStart = Math.min(...starts);
  const maxEnd = Math.max(...ends);

  // 不在该日演出窗口时，回退到「首场前 5 分钟」做预览推荐，避免空榜。
  if (nowMinutes < minStart || nowMinutes > maxEnd) {
    return Math.max(0, minStart - 5);
  }
  return nowMinutes;
}

/** 当前本地时间 → 与 lineup 时间同一套分钟制（含凌晨场） */
export function getNowFestivalMinutes(): number {
  const d = new Date();
  const t = `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return timeToMinutes(t);
}

/** 用于路径标签：从「日内分钟」转为 12h 文案 */
export function formatArrivalClock(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const hh = h >= 24 ? h - 24 : h;
  const t = `${hh.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  const [h24, mm] = t.split(":").map(Number);
  const suffix = h24 >= 12 && h24 < 24 ? "PM" : "AM";
  const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
  return `Arrive ~ ${h12}:${mm.toString().padStart(2, "0")} ${suffix}`;
}

/**
 * 现在还能去听最值得去的 Top N（默认 5）。
 * - 有 startStage：按步行时间计算到达，要求剩余可听 >= MIN_WATCH 分钟。
 * - 无 startStage：不按步行过滤（walk=0），只看时间窗内是否还能听满 MIN_WATCH（相当于已在场馆侧）。
 */
export function getNowTopRecommendations(
  recommendations: DJRecommendation[],
  startStage: Stage | null,
  stageMap: Record<string, Stage>,
  nowMinutes: number,
  options?: { minWatchMin?: number; topN?: number }
): NowPick[] {
  const minWatch = options?.minWatchMin ?? MIN_WATCH;
  const topN = options?.topN ?? TOP_N;
  const effectiveNowMinutes = resolveEffectiveNowMinutes(
    recommendations,
    nowMinutes
  );

  const out: NowPick[] = [];

  for (const rec of recommendations) {
    const setStart = timeToMinutes(rec.set.startTime);
    const setEnd = timeToMinutes(rec.set.endTime);
    const targetStage = stageMap[rec.set.stageId];
    if (!targetStage) continue;

    const walkMins =
      startStage && startStage.id !== targetStage.id
        ? walkMinutes(startStage, targetStage)
        : startStage && startStage.id === targetStage.id
          ? 0
          : 0;

    const arriveAtMins = effectiveNowMinutes + walkMins;
    if (arriveAtMins >= setEnd) continue;

    const watchStart = Math.max(arriveAtMins, setStart);
    const watchMins = setEnd - watchStart;
    if (watchMins < minWatch) continue;

    const p = rec.artist.profile;
    const hypeTerm = p ? (α * p.hyped) / 100 : 0;
    const repTerm = p ? (β * p.reputation) / 100 : 0;

    const effectiveScore =
      rec.score +
      Math.min(10, watchMins / 5) +
      hypeTerm +
      repTerm;

    out.push({
      ...rec,
      walkMins,
      arriveAtMins,
      watchMins,
      effectiveScore,
    });
  }

  out.sort((a, b) => b.effectiveScore - a.effectiveScore);
  return out.slice(0, topN);
}
