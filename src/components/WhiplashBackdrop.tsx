"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";

/**
 * Full-page backdrop using the AI-generated Whiplash DJ machine image
 * with CSS overlay animations: concentric rings, green LED, scanlines.
 */
export default function WhiplashBackdrop() {
  const { activePlaybackId } = useAudioPlayer();
  const isPlaying = !!activePlaybackId;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Pure black base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* AI-generated Whiplash machine — bottom center, large */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(90vw,900px)] select-none"
        style={{ filter: "brightness(0.28) contrast(1.3) saturate(0.6)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/whiplash-machine.png"
          alt=""
          className="w-full h-auto block"
          draggable={false}
        />
      </div>

      {/* Spinning concentric rings overlay — centred on the platter */}
      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[min(48vw,460px)] aspect-square flex items-center justify-center">
        <PlatterRings isPlaying={isPlaying} />
      </div>

      {/* Green LED pulse — matches machine's LED position */}
      <div className="absolute bottom-[28%] left-[calc(50%-min(22vw,210px))]">
        <div
          className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-led-pulse"
          style={{
            boxShadow:
              "0 0 10px rgba(57,255,20,0.9), 0 0 24px rgba(57,255,20,0.5)",
          }}
        />
      </div>

      {/* Acid-green floor glow under machine */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[18vh]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(57,255,20,0.06) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Chrome top vignette */}
      <div
        className="absolute top-0 left-0 right-0 h-[30vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(200,200,200,0.025) 0%, transparent 100%)",
        }}
      />

      {/* Subtle mechanical grid */}
      <div
        className="absolute inset-0 opacity-[0.025] animate-whiplash-grid"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184,184,184,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,184,184,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
        }}
      />

      {/* Bottom chrome line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(57,255,20,0.4), rgba(184,184,184,0.3), rgba(57,255,20,0.4), transparent)",
        }}
      />
    </div>
  );
}

function PlatterRings({ isPlaying }: { isPlaying: boolean }) {
  const spinClass = isPlaying ? "animate-deck-spin-fast" : "animate-deck-spin";
  const reverseClass = isPlaying
    ? "animate-deck-spin-fast"
    : "animate-deck-spin-reverse";

  const rings = [
    { size: "100%", opacity: 0.07, spin: spinClass, border: "rgba(184,184,184,0.5)" },
    { size: "84%",  opacity: 0.09, spin: reverseClass, border: "rgba(57,255,20,0.2)" },
    { size: "70%",  opacity: 0.11, spin: spinClass, border: "rgba(184,184,184,0.4)" },
    { size: "57%",  opacity: 0.13, spin: reverseClass, border: "rgba(57,255,20,0.15)" },
    { size: "44%",  opacity: 0.15, spin: spinClass, border: "rgba(184,184,184,0.35)" },
    { size: "32%",  opacity: 0.2,  spin: reverseClass, border: "rgba(57,255,20,0.25)" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {rings.map((r, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${r.spin}`}
          style={{
            width: r.size,
            height: r.size,
            border: `1px solid ${r.border}`,
            opacity: r.opacity,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {/* Centre dot */}
      <div
        className="absolute w-3 h-3 rounded-full"
        style={{
          background: isPlaying
            ? "radial-gradient(circle, #39FF14, #22990c)"
            : "radial-gradient(circle, #555, #222)",
          boxShadow: isPlaying ? "0 0 12px rgba(57,255,20,0.7)" : "none",
          transition: "all 0.4s ease",
        }}
      />
    </div>
  );
}
