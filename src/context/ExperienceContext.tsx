import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { SCENE_ORDER, type SceneId } from '@/types';
import { config } from '@/config';
import { loadState, saveState, clearState } from '@/utils/storage';
import { useMusicPlayer } from '@/hooks/useAudio';

interface ExperienceContextValue {
  sceneIndex: number;
  sceneId: SceneId;
  goNext: () => void;
  goTo: (scene: SceneId) => void;
  restart: () => void;
  musicStarted: boolean;
  startMusic: () => void;
  /** Crossfades from the main background loop into the Happy Birthday
   *  song once (e.g. call this right as the midnight fireworks go off).
   *  When the song finishes, the second background track crossfades
   *  in automatically and loops for the rest of the experience. */
  playHappyBirthdaySong: () => void;
  duckMusic: (target?: number, ms?: number) => void;
  restoreMusic: (ms?: number) => void;
  candlesBlownOut: boolean;
  setCandlesBlownOut: (v: boolean) => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const persisted = useMemo(() => loadState(), []);
  const [sceneIndex, setSceneIndex] = useState(persisted.sceneIndex);
  const [musicStarted, setMusicStarted] = useState(persisted.musicStarted);
  const [candlesBlownOut, setCandlesBlownOutState] = useState(persisted.candlesBlownOut);

  const music = useMusicPlayer();
  const happyBirthdaySongTriggered = useRef(false);

  const goNext = useCallback(() => {
    setSceneIndex((prev) => {
      const next = Math.min(prev + 1, SCENE_ORDER.length - 1);
      saveState({ sceneIndex: next });
      return next;
    });
  }, []);

  const goTo = useCallback((scene: SceneId) => {
    const idx = SCENE_ORDER.indexOf(scene);
    if (idx === -1) return;
    setSceneIndex(idx);
    saveState({ sceneIndex: idx });
  }, []);

  const restart = useCallback(() => {
    clearState();
    setSceneIndex(0);
    setMusicStarted(false);
    setCandlesBlownOutState(false);
    happyBirthdaySongTriggered.current = false;
    music.stop(800);
  }, [music]);

  const startMusic = useCallback(() => {
    music.play(config.audio.background, { loop: true, volume: 0.45, fadeMs: 3000 });
    setMusicStarted(true);
    saveState({ musicStarted: true });
  }, [music]);

  const playHappyBirthdaySong = useCallback(() => {
    // Guard against double-firing (e.g. React StrictMode, or going back and
    // forward through scenes) so the song doesn't restart mid-way.
    if (happyBirthdaySongTriggered.current) return;
    happyBirthdaySongTriggered.current = true;

    music.play(config.audio.happyBirthdaySong, {
      loop: false,
      volume: 0.65,
      fadeMs: 1200,
      onEnd: () => {
        music.play(config.audio.backgroundAfter, { loop: true, volume: 0.4, fadeMs: 2500 });
      },
    });
  }, [music]);

  const setCandlesBlownOut = useCallback((v: boolean) => {
    setCandlesBlownOutState(v);
    saveState({ candlesBlownOut: v });
  }, []);

  const value: ExperienceContextValue = {
    sceneIndex,
    sceneId: SCENE_ORDER[sceneIndex],
    goNext,
    goTo,
    restart,
    musicStarted,
    startMusic,
    playHappyBirthdaySong,
    duckMusic: music.duck,
    restoreMusic: music.restore,
    candlesBlownOut,
    setCandlesBlownOut,
  };

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error('useExperience must be used within an ExperienceProvider');
  return ctx;
}
