"use client";

import { Day } from "@/types";
import { DAY_LABELS } from "@/lib/constants";
import { usePlan } from "@/context/PlanContext";

export default function DaySelector() {
  const { currentDay, setCurrentDay } = usePlan();

  const days: Day[] = [1, 2, 3];

  return (
    <div className="flex gap-2">
      {days.map((day) => {
        const active = currentDay === day;
        return (
          <button
            key={day}
            onClick={() => setCurrentDay(day)}
            className="relative flex flex-col items-start px-3 py-1.5 transition-all duration-200 cursor-pointer cut-corner-sm"
            style={{
              background: active
                ? "rgba(57,255,20,0.06)"
                : "rgba(14,14,14,0.8)",
              border: active
                ? "1px solid rgba(57,255,20,0.4)"
                : "1px solid rgba(184,184,184,0.1)",
              boxShadow: active
                ? "0 0 12px rgba(57,255,20,0.1)"
                : undefined,
            }}
          >
            <span
              className="font-display text-xs uppercase tracking-widest"
              style={{
                color: active ? "#39FF14" : "rgba(184,184,184,0.45)",
                textShadow: active
                  ? "0 0 8px rgba(57,255,20,0.5)"
                  : undefined,
              }}
            >
              Day {day}
            </span>
            <span
              className="font-display text-[9px] tracking-wider mt-0.5"
              style={{
                color: active ? "rgba(57,255,20,0.6)" : "rgba(184,184,184,0.2)",
              }}
            >
              {DAY_LABELS[day]}
            </span>
            {/* Bottom accent line */}
            {active && (
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] animate-led-pulse"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #39FF14, transparent)",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
