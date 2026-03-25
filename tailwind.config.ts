import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Whiplash palette
        "acid-green": "#39FF14",
        "acid-green-dim": "#22990c",
        chrome: "#b8b8b8",
        "chrome-bright": "#e8e8e8",
        "matte-black": "#0e0e0e",
        blade: "#1c1c1c",
        // Legacy kept for map markers etc.
        midnight: "#050505",
        "midnight-light": "#0e0e0e",
        "neon-purple": "#7b2ff7",
        "neon-blue": "#00f0ff",
        "neon-pink": "#ff2d95",
        "neon-green": "#39FF14",
        "deep-purple": "#1a0a2e",
        "glass-white": "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        "acid-green":
          "0 0 20px rgba(57, 255, 20, 0.5), 0 0 60px rgba(57, 255, 20, 0.2)",
        "acid-green-sm":
          "0 0 8px rgba(57, 255, 20, 0.4), 0 0 20px rgba(57, 255, 20, 0.15)",
        chrome:
          "0 0 20px rgba(184, 184, 184, 0.3), 0 0 60px rgba(184, 184, 184, 0.1)",
        "neon-purple":
          "0 0 20px rgba(123, 47, 247, 0.5), 0 0 60px rgba(123, 47, 247, 0.2)",
        "neon-blue":
          "0 0 20px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.2)",
        "neon-pink":
          "0 0 20px rgba(255, 45, 149, 0.5), 0 0 60px rgba(255, 45, 149, 0.2)",
        "neon-green":
          "0 0 20px rgba(57, 255, 20, 0.5), 0 0 60px rgba(57, 255, 20, 0.2)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        // Whiplash deck
        "deck-spin": "deckSpin 10s linear infinite",
        "deck-spin-fast": "deckSpin 3.5s linear infinite",
        "deck-spin-reverse": "deckSpinReverse 12s linear infinite",
        // Whiplash atmosphere
        "whiplash-hue": "whiplashHue 14s ease-in-out infinite",
        "whiplash-sheen": "whiplashSheen 6s ease-in-out infinite",
        "whiplash-grid": "whiplashGrid 20s linear infinite",
        "whiplash-scan": "whiplashScan 10s linear infinite",
        // LED / glow
        "led-pulse": "ledPulse 2s ease-in-out infinite",
        "chrome-shimmer": "chromeShimmer 3s linear infinite",
        // Existing
        pulse_glow: "pulse_glow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "path-draw": "pathDraw 1s ease-out forwards",
        // Level bars
        "level-bar": "levelBar 0.5s ease-in-out infinite alternate",
      },
      keyframes: {
        deckSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        deckSpinReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        whiplashHue: {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(15deg)" },
        },
        whiplashSheen: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        whiplashGrid: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(48px)" },
        },
        whiplashScan: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(8px)" },
        },
        ledPulse: {
          "0%, 100%": {
            opacity: "1",
            boxShadow:
              "0 0 8px rgba(57,255,20,0.9), 0 0 20px rgba(57,255,20,0.5)",
          },
          "50%": {
            opacity: "0.6",
            boxShadow:
              "0 0 4px rgba(57,255,20,0.5), 0 0 10px rgba(57,255,20,0.2)",
          },
        },
        chromeShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulse_glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pathDraw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        levelBar: {
          "0%": { transform: "scaleY(0.3)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
