"use client";

import { Day } from "@/types";
import { usePlan } from "@/context/PlanContext";
import { useFestival } from "@/context/FestivalContext";

export default function DaySelector() {
  const { currentDay, setCurrentDay } = usePlan();
  const { festival } = useFestival();

  const days: Day[] = [1, 2, 3];
  const accent = festival.accentColor;

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
                ? `rgba(${hexToRgb(accent)}, 0.06)`
                : "rgba(14,14,14,0.8)",
              border: active
                ? `1px solid rgba(${hexToRgb(accent)}, 0.4)`
                : "1px solid rgba(184,184,184,0.1)",
              boxShadow: active
                ? `0 0 12px rgba(${hexToRgb(accent)}, 0.1)`
                : undefined,
            }}
          >
            <span
              className="font-display text-xs uppercase tracking-widest"
              style={{
                color: active ? accent : "rgba(184,184,184,0.45)",
                textShadow: active
                  ? `0 0 8px ${accent}80`
                  : undefined,
              }}
            >
              Day {day}
            </span>
            <span
              className="font-display text-[9px] tracking-wider mt-0.5"
              style={{
                color: active ? `rgba(${hexToRgb(accent)}, 0.7)` : "rgba(184,184,184,0.2)",
              }}
            >
              {festival.dayLabels[day]}
            </span>
            {/* Bottom accent line */}
            {active && (
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] animate-led-pulse"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r},${g},${b}`;
}
