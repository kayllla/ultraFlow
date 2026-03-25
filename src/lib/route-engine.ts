import { DJRecommendation, RouteNode, Stage } from "@/types";
import { stageMap } from "@/data/stages";

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h < 6 ? (h + 24) * 60 + m : h * 60 + m;
}

export function walkMinutes(a: Stage, b: Stage): number {
  if (a.id === b.id) return 0;
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return Math.max(2, Math.round(dist * 0.4));
}

function hasTimeConflict(a: DJRecommendation, b: DJRecommendation): boolean {
  const aStart = timeToMinutes(a.set.startTime);
  const aEnd = timeToMinutes(a.set.endTime);
  const bStart = timeToMinutes(b.set.startTime);
  const bEnd = timeToMinutes(b.set.endTime);
  return aStart < bEnd && bStart < aEnd;
}

function setDurationMinutes(rec: DJRecommendation): number {
  return timeToMinutes(rec.set.endTime) - timeToMinutes(rec.set.startTime);
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

interface ScheduledStop {
  rec: DJRecommendation;
  arriveAt: number;
  leaveAt: number;
  partial: boolean;
}

export function generateRoute(
  keptRecommendations: DJRecommendation[]
): RouteNode[] {
  if (keptRecommendations.length === 0) return [];

  const sorted = [...keptRecommendations].sort(
    (a, b) => timeToMinutes(a.set.startTime) - timeToMinutes(b.set.startTime)
  );

  const schedule: ScheduledStop[] = [];

  for (const rec of sorted) {
    const setStart = timeToMinutes(rec.set.startTime);
    const setEnd = timeToMinutes(rec.set.endTime);
    const duration = setEnd - setStart;

    if (schedule.length === 0) {
      schedule.push({
        rec,
        arriveAt: setStart,
        leaveAt: setEnd,
        partial: false,
      });
      continue;
    }

    const prev = schedule[schedule.length - 1];
    const prevStage = stageMap[prev.rec.set.stageId];
    const currStage = stageMap[rec.set.stageId];
    const walk = prevStage && currStage ? walkMinutes(prevStage, currStage) : 5;

    const earliestArrival = prev.leaveAt + walk;

    if (earliestArrival <= setStart) {
      schedule.push({
        rec,
        arriveAt: setStart,
        leaveAt: setEnd,
        partial: false,
      });
      continue;
    }

    if (earliestArrival < setEnd && (setEnd - earliestArrival) >= 20) {
      const prevMinWatchable = timeToMinutes(prev.rec.set.startTime) + 20;
      if (prev.leaveAt > prevMinWatchable) {
        const newPrevLeave = Math.max(
          prevMinWatchable,
          setStart - walk
        );
        const newArrival = newPrevLeave + walk;

        if (newArrival < setEnd && (setEnd - newArrival) >= 20) {
          prev.leaveAt = newPrevLeave;
          prev.partial = prev.leaveAt < timeToMinutes(prev.rec.set.endTime);

          schedule.push({
            rec,
            arriveAt: newArrival,
            leaveAt: setEnd,
            partial: newArrival > setStart,
          });
          continue;
        }
      }

      schedule.push({
        rec,
        arriveAt: earliestArrival,
        leaveAt: setEnd,
        partial: true,
      });
      continue;
    }

    if (rec.score > prev.rec.score && duration > 30) {
      const newPrevLeave = Math.max(
        timeToMinutes(prev.rec.set.startTime) + 20,
        setStart - walk
      );
      prev.leaveAt = newPrevLeave;
      prev.partial = newPrevLeave < timeToMinutes(prev.rec.set.endTime);

      schedule.push({
        rec,
        arriveAt: newPrevLeave + walk,
        leaveAt: setEnd,
        partial: (newPrevLeave + walk) > setStart,
      });
      continue;
    }

    // 仍无法走上述分支时，之前会静默丢站；每个 Keep 必须在路线里出现一站
    const arrive = Math.max(earliestArrival, setStart);
    if (arrive < setEnd) {
      schedule.push({
        rec,
        arriveAt: arrive,
        leaveAt: setEnd,
        partial: arrive > setStart,
      });
    } else {
      schedule.push({
        rec,
        arriveAt: setStart,
        leaveAt: setEnd,
        partial: false,
      });
    }
  }

  // Energy pacing: warn about 3+ consecutive high-hype sets
  let consecutiveHigh = 0;
  for (const stop of schedule) {
    const hyped = stop.rec.artist.profile?.hyped ?? 50;
    if (hyped > 80) {
      consecutiveHigh++;
    } else {
      consecutiveHigh = 0;
    }
  }

  return schedule.map((stop, idx) => {
    const prevStop = idx > 0 ? schedule[idx - 1] : null;
    const prevStage = prevStop ? stageMap[prevStop.rec.set.stageId] : null;
    const currStage = stageMap[stop.rec.set.stageId];
    const walkFromPrev =
      prevStage && currStage ? walkMinutes(prevStage, currStage) : undefined;

    return {
      artist: stop.rec.artist,
      set: stop.rec.set,
      stage: stop.rec.stage,
      order: idx + 1,
      arriveBy: minutesToTime(stop.arriveAt),
      leaveBy: minutesToTime(stop.leaveAt),
      partial: stop.partial,
      walkFromPrev,
    };
  });
}

export function getRoutePathPoints(
  route: RouteNode[]
): { x: number; y: number; label: string; time: string }[] {
  return route.map((node) => ({
    x: node.stage.x,
    y: node.stage.y,
    label: node.artist.name,
    time: node.set.startTime,
  }));
}
