/**
 * Ultra Miami 单日演出日历窗口（本地日界线）。
 * 未进入窗口时时间轴为「预览」：不灰显已过场次、不强调 live 线。
 */

const FEST_START = { y: 2025, m: 2, d: 28 }; // Mar 28
const FEST_END = { y: 2025, m: 2, d: 30 }; // Mar 30

function atMidnight(y: number, m: number, d: number): Date {
  return new Date(y, m, d, 0, 0, 0, 0);
}

/** 当前是否在官方三日演出期内（用于时间轴 live / 已过 灰显） */
export function isFestivalWeekendLive(): boolean {
  const now = new Date();
  const start = atMidnight(FEST_START.y, FEST_START.m, FEST_START.d);
  const end = atMidnight(FEST_END.y, FEST_END.m, FEST_END.d);
  end.setHours(23, 59, 59, 999);
  return now >= start && now <= end;
}

/** 未开幕或已闭幕：时间轴不应用「已过」灰显与 live 强调 */
export function isTimelinePreviewMode(): boolean {
  return !isFestivalWeekendLive();
}
