import type { DJRecommendation } from "@/types";
import type { Stage } from "@/types";
import { timeToMinutes } from "@/lib/route-engine";

export interface TimelineItem {
  rec: DJRecommendation;
  startMin: number;
  endMin: number;
  leftPct: number;
  widthPct: number;
  lane: number;
  isPast: boolean;
  isLive: boolean;
  isFuture: boolean;
}

export interface DayTimelineData {
  items: TimelineItem[];
  laneCount: number;
  windowStart: number;
  windowEnd: number;
  nowPct: number;
}

/** @deprecated 保留旧横向泳道布局；新 UI 使用 buildStageGridTimeline */
export function buildDayTimelineData(
  recommendations: DJRecommendation[],
  nowMinutes: number
): DayTimelineData {
  if (recommendations.length === 0) {
    return {
      items: [],
      laneCount: 1,
      windowStart: nowMinutes,
      windowEnd: nowMinutes + 60,
      nowPct: 0,
    };
  }

  const starts = recommendations.map((r) => timeToMinutes(r.set.startTime));
  const ends = recommendations.map((r) => timeToMinutes(r.set.endTime));
  const windowStart = Math.min(...starts);
  const windowEnd = Math.max(...ends);
  const total = Math.max(1, windowEnd - windowStart);

  const sorted = recommendations
    .map((rec) => ({
      rec,
      startMin: timeToMinutes(rec.set.startTime),
      endMin: timeToMinutes(rec.set.endTime),
    }))
    .sort((a, b) => a.startMin - b.startMin);

  const laneEndTimes: number[] = [];
  const items: TimelineItem[] = sorted.map((item) => {
    let lane = laneEndTimes.findIndex((end) => end <= item.startMin);
    if (lane === -1) {
      lane = laneEndTimes.length;
      laneEndTimes.push(item.endMin);
    } else {
      laneEndTimes[lane] = item.endMin;
    }

    const leftPct = ((item.startMin - windowStart) / total) * 100;
    const widthPct = Math.max(4, ((item.endMin - item.startMin) / total) * 100);
    const isPast = nowMinutes >= item.endMin;
    const isLive = nowMinutes >= item.startMin && nowMinutes < item.endMin;
    const isFuture = nowMinutes < item.startMin;

    return {
      rec: item.rec,
      startMin: item.startMin,
      endMin: item.endMin,
      leftPct,
      widthPct,
      lane,
      isPast,
      isLive,
      isFuture,
    };
  });

  const nowPctRaw = ((nowMinutes - windowStart) / total) * 100;
  const nowPct = Math.max(0, Math.min(100, nowPctRaw));

  return {
    items,
    laneCount: Math.max(1, laneEndTimes.length),
    windowStart,
    windowEnd,
    nowPct,
  };
}

export interface StageGridItem {
  rec: DJRecommendation;
  stageId: string;
  colIndex: number;
  topPx: number;
  heightPx: number;
  startMin: number;
  endMin: number;
  isPast: boolean;
  isLive: boolean;
}

export interface StageGridTimelineData {
  items: StageGridItem[];
  windowStart: number;
  windowEnd: number;
  contentHeightPx: number;
  nowLinePx: number | null;
  stageColumns: { stage: Stage; colIndex: number }[];
  timeLabels: { min: number; label: string; topPx: number }[];
}

/** 桌面默认；手机端在 DayTimeline 传入更大值 */
export const DEFAULT_TIMELINE_PX_PER_MIN = 2.45;
/** 手机竖屏：略小于桌面，避免日程格过高、难一览 */
export const MOBILE_TIMELINE_PX_PER_MIN = 1.55;

function formatHourLabel(totalMin: number): string {
  const h24 = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  const suffix = h24 >= 12 && h24 < 24 ? "PM" : "AM";
  const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

/**
 * 竖轴时间、横轴舞台：瘦长网格。
 * previewMode：不计算 isPast/isLive（全部同等亮度）。
 */
export function buildStageGridTimeline(
  recommendations: DJRecommendation[],
  stageOrder: Stage[],
  nowMinutes: number,
  previewMode: boolean,
  pxPerMin: number = DEFAULT_TIMELINE_PX_PER_MIN
): StageGridTimelineData {
  if (recommendations.length === 0) {
    return {
      items: [],
      windowStart: 0,
      windowEnd: 60,
      contentHeightPx: 120,
      nowLinePx: null,
      stageColumns: stageOrder.map((s, i) => ({ stage: s, colIndex: i })),
      timeLabels: [],
    };
  }

  const idToCol = new Map<string, number>();
  stageOrder.forEach((s, i) => idToCol.set(s.id, i));

  const starts = recommendations.map((r) => timeToMinutes(r.set.startTime));
  const ends = recommendations.map((r) => timeToMinutes(r.set.endTime));
  let windowStart = Math.min(...starts);
  let windowEnd = Math.max(...ends);
  const pad = 30;
  windowStart = Math.max(0, windowStart - pad);
  windowEnd = windowEnd + pad;
  const totalMin = Math.max(60, windowEnd - windowStart);
  const contentHeightPx = totalMin * pxPerMin;

  const items: StageGridItem[] = [];

  for (const rec of recommendations) {
    const colIndex = idToCol.get(rec.set.stageId);
    if (colIndex === undefined) continue;

    const startMin = timeToMinutes(rec.set.startTime);
    const endMin = timeToMinutes(rec.set.endTime);
    const topPx = (startMin - windowStart) * pxPerMin;
    const heightPx = Math.max(36, (endMin - startMin) * pxPerMin);

    let isPast = false;
    let isLive = false;
    if (!previewMode) {
      isPast = nowMinutes >= endMin;
      isLive = nowMinutes >= startMin && nowMinutes < endMin;
    }

    items.push({
      rec,
      stageId: rec.set.stageId,
      colIndex,
      topPx,
      heightPx,
      startMin,
      endMin,
      isPast,
      isLive,
    });
  }

  items.sort((a, b) => a.startMin - b.startMin || a.colIndex - b.colIndex);

  let nowLinePx: number | null = null;
  if (!previewMode) {
    const raw = (nowMinutes - windowStart) * pxPerMin;
    if (raw >= 0 && raw <= contentHeightPx) nowLinePx = raw;
  }

  const timeLabels: { min: number; label: string; topPx: number }[] = [];
  const firstHour = Math.floor(windowStart / 60) * 60;
  for (let t = firstHour; t <= windowEnd; t += 60) {
    timeLabels.push({
      min: t,
      label: formatHourLabel(t),
      topPx: (t - windowStart) * pxPerMin,
    });
  }

  return {
    items,
    windowStart,
    windowEnd,
    contentHeightPx,
    nowLinePx,
    stageColumns: stageOrder.map((s, i) => ({ stage: s, colIndex: i })),
    timeLabels,
  };
}
