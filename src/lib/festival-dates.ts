/**
 * 音乐节演出日历窗口（本地日界线）。
 * 未进入窗口时时间轴为「预览」：不灰显已过场次、不强调 live 线。
 */

function atMidnight(y: number, m: number, d: number): Date {
  return new Date(y, m, d, 0, 0, 0, 0);
}

interface FestivalDateRange {
  festStart: { y: number; m: number; d: number };
  festEnd: { y: number; m: number; d: number };
}

/** 当前是否在指定音乐节三日演出期内 */
export function isFestivalWeekendLive(range?: FestivalDateRange): boolean {
  const start_cfg = range?.festStart ?? { y: 2025, m: 2, d: 28 };
  const end_cfg = range?.festEnd ?? { y: 2025, m: 2, d: 30 };
  const now = new Date();
  const start = atMidnight(start_cfg.y, start_cfg.m, start_cfg.d);
  const end = atMidnight(end_cfg.y, end_cfg.m, end_cfg.d);
  end.setHours(23, 59, 59, 999);
  return now >= start && now <= end;
}

/** 未开幕或已闭幕：时间轴不应用「已过」灰显与 live 强调 */
export function isTimelinePreviewMode(range?: FestivalDateRange): boolean {
  return !isFestivalWeekendLive(range);
}
