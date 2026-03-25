"use client";

import { RouteNode } from "@/types";
import { useEffect, useState } from "react";

interface RouteOverlayProps {
  route: RouteNode[];
  highlightStageId: string | null;
  width: number;
  height: number;
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 && h < 24 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export default function RouteOverlay({
  route,
  highlightStageId,
  width,
  height,
}: RouteOverlayProps) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [route]);

  if (width === 0 || height === 0) return null;

  const points = route.map((node) => ({
    x: (node.stage.x / 100) * width,
    y: (node.stage.y / 100) * height,
    node,
  }));

  const pathD =
    points.length > 1
      ? `M ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}`
      : "";

  return (
    <svg
      key={animKey}
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="routeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39FF14" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#7fff7f" stopOpacity="0.85" />
        </linearGradient>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#39FF14" />
        </marker>
      </defs>

      {pathD && (
        <>
          <path
            d={pathD}
            fill="none"
            stroke="#39FF14"
            strokeOpacity={0.22}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <path
            d={pathD}
            fill="none"
            stroke="url(#routeStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            markerEnd="url(#arrowhead)"
            className="animate-path-draw"
          />
        </>
      )}

      {points.map((p, i) => {
        const isHighlighted = highlightStageId === p.node.stage.id;
        const baseRadius = isHighlighted ? 10 : 7;

        return (
          <g key={`${p.node.set.id}-${i}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={baseRadius + 4}
              fill={`${p.node.stage.color}20`}
              filter={isHighlighted ? "url(#glow-strong)" : "url(#glow)"}
            >
              {isHighlighted && (
                <animate
                  attributeName="r"
                  values={`${baseRadius + 4};${baseRadius + 10};${baseRadius + 4}`}
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              )}
            </circle>

            <circle
              cx={p.x}
              cy={p.y}
              r={baseRadius}
              fill={p.node.stage.color}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              opacity={isHighlighted ? 1 : 0.8}
            />

            <text
              x={p.x}
              y={p.y - baseRadius - 8}
              textAnchor="middle"
              className="font-display"
              fontSize="9"
              fontWeight="700"
              fill="white"
              opacity="0.9"
            >
              {p.node.artist.name.length > 18
                ? p.node.artist.name.slice(0, 16) + "…"
                : p.node.artist.name}
            </text>
            <text
              x={p.x}
              y={p.y + baseRadius + 14}
              textAnchor="middle"
              fontSize="8"
              fill="rgba(255,255,255,0.5)"
            >
              {formatTime(p.node.set.startTime)}
            </text>

            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="bold"
              fill="rgba(0,0,0,0.7)"
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
