"use client";

import { useEffect, useId, useState } from "react";
import type { Stage } from "@/types";

interface DirectPathOverlayProps {
  start: Stage | null;
  target: Stage | null;
  walkMins: number;
  arriveLabel: string;
  width: number;
  height: number;
}

export default function DirectPathOverlay({
  start,
  target,
  walkMins,
  arriveLabel,
  width,
  height,
}: DirectPathOverlayProps) {
  const uid = useId().replace(/:/g, "");
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [start?.id, target?.id, walkMins]);

  if (width === 0 || height === 0 || !start || !target) return null;

  const x1 = (start.x / 100) * width;
  const y1 = (start.y / 100) * height;
  const x2 = (target.x / 100) * width;
  const y2 = (target.y / 100) * height;

  const pathD = `M ${x1} ${y1} L ${x2} ${y2}`;

  return (
    <svg
      key={animKey}
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id={`dp-glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`dpStroke-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39FF14" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#7fff7f" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke="#39FF14"
        strokeOpacity={0.22}
        strokeWidth="8"
        strokeLinecap="round"
        filter={`url(#dp-glow-${uid})`}
      />
      <path
        d={pathD}
        fill="none"
        stroke={`url(#dpStroke-${uid})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        className="animate-path-draw"
      />

      <circle
        cx={x1}
        cy={y1}
        r={9}
        fill="#39FF14"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={1}
        filter={`url(#dp-glow-${uid})`}
      />
      <text
        x={x1}
        y={y1 - 14}
        textAnchor="middle"
        className="font-display"
        fontSize="9"
        fontWeight="700"
        fill="white"
        opacity={0.95}
      >
        You
      </text>

      <circle
        cx={x2}
        cy={y2}
        r={10}
        fill={target.color}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={1}
        filter={`url(#dp-glow-${uid})`}
      />
      <text
        x={x2}
        y={y2 - 14}
        textAnchor="middle"
        className="font-display"
        fontSize="9"
        fontWeight="700"
        fill="white"
        opacity={0.95}
      >
        {target.name}
      </text>

      <text
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2 - 8}
        textAnchor="middle"
        className="font-display"
        fontSize="10"
        fontWeight="700"
        fill="#39FF14"
        style={{ textShadow: "0 0 12px rgba(0,0,0,0.9)" }}
      >
        Walk {walkMins} min
      </text>
      <text
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2 + 6}
        textAnchor="middle"
        fontSize="9"
        fill="rgba(255,255,255,0.65)"
        style={{ textShadow: "0 0 8px rgba(0,0,0,0.9)" }}
      >
        {arriveLabel}
      </text>
    </svg>
  );
}
