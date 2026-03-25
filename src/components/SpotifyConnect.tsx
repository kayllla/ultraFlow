"use client";

export default function SpotifyConnect() {
  const handleConnect = () => {
    window.location.href = "/api/auth/login";
  };

  const handleDemo = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-md">
      <p
        className="text-center text-[11px] font-display leading-relaxed tracking-wide px-2"
        style={{ color: "rgba(184,184,184,0.45)" }}
      >
        Connect uses your Top Artists/Tracks, Recently Played, Liked Songs,
        followed artists, a sample of your playlists, and track audio features
        to rank DJs. If you connected before new permissions were added, connect
        again so Spotify can show the consent screen.
      </p>
      <button
        onClick={handleConnect}
        className="group relative flex items-center gap-3 px-8 py-4 font-display text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer cut-corner"
        style={{
          background: "rgba(57,255,20,0.06)",
          border: "1px solid rgba(57,255,20,0.4)",
          color: "#39FF14",
          boxShadow: "0 0 20px rgba(57,255,20,0.10)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 28px rgba(57,255,20,0.2)";
          (e.currentTarget as HTMLElement).style.background =
            "rgba(57,255,20,0.10)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 20px rgba(57,255,20,0.10)";
          (e.currentTarget as HTMLElement).style.background =
            "rgba(57,255,20,0.06)";
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        Connect Spotify
      </button>

      <button
        onClick={handleDemo}
        className="px-6 py-3 font-display text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer cut-corner-sm"
        style={{
          background: "rgba(14,14,14,0.8)",
          border: "1px solid rgba(184,184,184,0.15)",
          color: "rgba(184,184,184,0.4)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color =
            "rgba(184,184,184,0.7)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(184,184,184,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color =
            "rgba(184,184,184,0.4)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(184,184,184,0.15)";
        }}
      >
        Try Demo Mode
      </button>
    </div>
  );
}
