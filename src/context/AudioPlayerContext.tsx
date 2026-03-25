"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type AudioPlayerContextValue = {
  activePlaybackId: string | null;
  setActivePlaybackId: (id: string | null) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [activePlaybackId, setActivePlaybackIdState] = useState<string | null>(
    null
  );

  const setActivePlaybackId = useCallback((id: string | null) => {
    setActivePlaybackIdState(id);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{ activePlaybackId, setActivePlaybackId }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return ctx;
}
