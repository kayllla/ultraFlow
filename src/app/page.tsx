import SpotifyConnect from "@/components/SpotifyConnect";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10">
      {/* Chrome top accent line */}
      <div
        className="fixed top-0 left-0 right-0 h-[1px] z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(57,255,20,0.5), rgba(184,184,184,0.4), rgba(57,255,20,0.5), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Logo mark */}
        <div className="mb-8 animate-float">
          <div
            className="cut-corner w-16 h-16 flex items-center justify-center"
            style={{
              background: "rgba(14,14,14,0.95)",
              border: "1px solid rgba(57,255,20,0.3)",
              boxShadow: "0 0 24px rgba(57,255,20,0.12)",
            }}
          >
            {/* LED indicator */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-led-pulse" />
            <span
              className="font-display text-xl font-black"
              style={{
                color: "#39FF14",
                textShadow: "0 0 12px rgba(57,255,20,0.6)",
              }}
            >
              U
            </span>
          </div>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-[0.12em] leading-none">
          <span className="text-chrome-shimmer">UltraFlow</span>
        </h1>

        {/* Acid green underline */}
        <div
          className="mt-3 h-[2px] w-40 mx-auto animate-led-pulse"
          style={{
            background:
              "linear-gradient(90deg, transparent, #39FF14, transparent)",
          }}
        />

        <p className="mt-6 font-display text-[11px] uppercase tracking-widest leading-relaxed max-w-xs"
          style={{ color: "rgba(184,184,184,0.4)" }}>
          Turn your Spotify taste into a personalized
          <br />
          <span style={{ color: "rgba(184,184,184,0.2)" }}>
            Ultra Miami route · Discover · Preview · Flow
          </span>
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <SpotifyConnect />
        </div>

        <div className="mt-16 flex items-center gap-6 font-display text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(184,184,184,0.2)" }}>
          <span>Day 1</span>
          <div className="w-1 h-1" style={{ background: "rgba(57,255,20,0.4)" }} />
          <span>Day 2</span>
          <div className="w-1 h-1" style={{ background: "rgba(57,255,20,0.4)" }} />
          <span>Day 3</span>
        </div>

        <p className="mt-4 font-display text-[9px] uppercase tracking-widest"
          style={{ color: "rgba(184,184,184,0.15)" }}>
          Ultra Miami 2025 · March 28–30 · Bayfront Park
        </p>
      </div>
    </main>
  );
}
