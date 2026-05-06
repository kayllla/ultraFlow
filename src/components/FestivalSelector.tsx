"use client";

import { useFestival } from "@/context/FestivalContext";
import { FESTIVALS } from "@/data/festival-registry";

interface FestivalSelectorProps {
  onSelect?: () => void;
}

export default function FestivalSelector({ onSelect }: FestivalSelectorProps) {
  const { festivalId, setFestivalId } = useFestival();

  const festivals = Object.values(FESTIVALS);

  return (
    <div className="w-full max-w-sm space-y-3">
      <p
        className="font-display text-[10px] uppercase tracking-[0.22em] text-center mb-4"
        style={{ color: "rgba(184,184,184,0.4)" }}
      >
        Select Festival
      </p>
      {festivals.map((fest) => {
        const isActive = festivalId === fest.id;
        return (
          <button
            key={fest.id}
            type="button"
            onClick={() => {
              setFestivalId(fest.id);
              onSelect?.();
            }}
            className="w-full flex items-center gap-4 px-4 py-3.5 cut-corner transition-all cursor-pointer active:scale-[0.98]"
            style={{
              background: isActive
                ? `rgba(${hexToRgb(fest.accentColor)}, 0.06)`
                : "rgba(14,14,14,0.85)",
              border: isActive
                ? `1px solid rgba(${hexToRgb(fest.accentColor)}, 0.4)`
                : "1px solid rgba(184,184,184,0.1)",
              boxShadow: isActive
                ? `0 0 20px rgba(${hexToRgb(fest.accentColor)}, 0.08)`
                : "none",
            }}
          >
            {/* Accent dot */}
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: isActive ? fest.accentColor : "rgba(184,184,184,0.2)",
                boxShadow: isActive ? `0 0 8px ${fest.accentColor}` : "none",
              }}
            />

            {/* Festival info */}
            <div className="flex-1 text-left min-w-0">
              <p
                className="font-display text-xs font-bold uppercase tracking-wider truncate"
                style={{
                  color: isActive ? fest.accentColor : "rgba(184,184,184,0.7)",
                }}
              >
                {fest.shortName}
              </p>
              <p
                className="font-display text-[9px] uppercase tracking-widest truncate mt-0.5"
                style={{ color: "rgba(184,184,184,0.35)" }}
              >
                {fest.dates} · {fest.location}
              </p>
            </div>

            {/* Active indicator */}
            {isActive && (
              <div
                className="font-display text-[8px] uppercase tracking-widest shrink-0 px-1.5 py-0.5 rounded"
                style={{
                  color: fest.accentColor,
                  background: `rgba(${hexToRgb(fest.accentColor)}, 0.1)`,
                  border: `1px solid rgba(${hexToRgb(fest.accentColor)}, 0.3)`,
                }}
              >
                Active
              </div>
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
