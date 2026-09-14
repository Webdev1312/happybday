import { useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';

interface PlayOptions {
  /** Loop forever (background beds) vs. play once (the Happy Birthday song). */
  loop?: boolean;
  volume?: number;
  fadeMs?: number;
  /** Called when a non-looping track finishes playing naturally. */
  onEnd?: () => void;
}

/**
 * A single "music slot" that can hold one track at a time, with crossfade
 * whenever you call play() with a new src — the old track fades out while
 * the new one fades in. This is what lets the experience move through
 * multiple music "chapters" (e.g. background music -> a Happy Birthday
 * song -> a different background track) without any audio hiccup.
 */
export function useMusicPlayer() {
  const currentRef = useRef<Howl | null>(null);
  const baseVolumeRef = useRef(0.5);

  useEffect(
    () => () => {
      currentRef.current?.unload();
      currentRef.current = null;
    },
    [],
  );

  const play = useCallback((src: string, opts: PlayOptions = {}) => {
    const { loop = true, volume = 0.5, fadeMs = 2000, onEnd } = opts;
    const previous = currentRef.current;
    baseVolumeRef.current = volume;

    const next = new Howl({
      src: [src],
      loop,
      volume: 0,
      html5: true,
      preload: true,
      onend: () => {
        if (!loop) onEnd?.();
      },
    });

    currentRef.current = next;
    next.play();
    next.fade(0, volume, fadeMs);

    if (previous) {
      previous.fade(previous.volume(), 0, fadeMs);
      window.setTimeout(() => previous.unload(), fadeMs + 100);
    }
  }, []);

  const duck = useCallback((targetVolume?: number, durationMs = 800) => {
    const howl = currentRef.current;
    if (!howl) return;
    howl.fade(howl.volume(), targetVolume ?? baseVolumeRef.current * 0.2, durationMs);
  }, []);

  const restore = useCallback((durationMs = 800) => {
    const howl = currentRef.current;
    if (!howl) return;
    howl.fade(howl.volume(), baseVolumeRef.current, durationMs);
  }, []);

  const stop = useCallback((durationMs = 1500) => {
    const howl = currentRef.current;
    if (!howl) return;
    howl.fade(howl.volume(), 0, durationMs);
    window.setTimeout(() => howl.stop(), durationMs + 50);
  }, []);

  return { play, duck, restore, stop };
}

/** Plays a short one-shot sound effect on demand (crackers, candle blow, heartbeat tick...). */
export function useSoundEffect(src: string, volume = 0.7) {
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    howlRef.current = new Howl({ src: [src], volume, preload: true });
    return () => {
      howlRef.current?.unload();
      howlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return useCallback(() => {
    howlRef.current?.play();
  }, []);
}
