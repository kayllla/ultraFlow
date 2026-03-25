type PlaybackListener = (isPlaying: boolean) => void;
type ClearDeckListener = () => void;
type SetActivePlaybackId = (id: string | null) => void;

let globalAudio: HTMLAudioElement | null = null;
let globalPlaybackId: string | null = null;
let globalOwnerListener: PlaybackListener | null = null;
let globalClearDeck: ClearDeckListener | null = null;

export function getGlobalAudioElement(): HTMLAudioElement | null {
  return globalAudio;
}

export function isGlobalPlayback(playbackId?: string): boolean {
  return Boolean(playbackId && playbackId === globalPlaybackId);
}

export async function startGlobalPreviewPlayback(args: {
  url: string;
  playbackId?: string;
  setActivePlaybackId: SetActivePlaybackId;
  onOwnerPlayingChange?: PlaybackListener;
  onOwnerClearDeck?: ClearDeckListener;
  volume?: number;
}): Promise<void> {
  const {
    url,
    playbackId,
    setActivePlaybackId,
    onOwnerPlayingChange,
    onOwnerClearDeck,
    volume = 0.65,
  } = args;

  if (globalAudio) {
    globalAudio.pause();
    globalAudio.currentTime = 0;
    if (playbackId !== globalPlaybackId) {
      globalOwnerListener?.(false);
      globalClearDeck?.();
    }
  }

  if (!globalAudio) {
    globalAudio = new Audio(url);
  }
  if (globalAudio.src !== url) {
    globalAudio.pause();
    globalAudio = new Audio(url);
  }

  globalAudio.volume = volume;
  globalAudio.loop = true;
  await globalAudio.play().catch(() => undefined);

  globalPlaybackId = playbackId ?? null;
  globalOwnerListener = onOwnerPlayingChange ?? null;
  globalClearDeck = onOwnerClearDeck ?? null;
  onOwnerPlayingChange?.(true);
  if (playbackId) setActivePlaybackId(playbackId);
}

export function stopGlobalPreviewPlayback(
  setActivePlaybackId: SetActivePlaybackId,
  playbackId?: string
): void {
  if (!globalAudio) return;
  if (playbackId && playbackId !== globalPlaybackId) return;
  globalAudio.pause();
  globalOwnerListener?.(false);
  globalClearDeck?.();
  globalPlaybackId = null;
  setActivePlaybackId(null);
}
