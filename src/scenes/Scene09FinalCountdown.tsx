import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { FloatingHearts } from '@/components/backgrounds/FloatingHearts';
import { useExperience } from '@/context/ExperienceContext';
import { useSoundEffect } from '@/hooks/useAudio';
import { useVibration } from '@/hooks/useVibration';
import { config } from '@/config';
import { isTestMode } from '@/utils/testMode';

export default function Scene09FinalCountdown() {
  const { goNext, duckMusic, restoreMusic } = useExperience();
  const startCount = isTestMode() ? config.testCountdownSeconds : 10;
  const [count, setCount] = useState(startCount);
  const playHeartbeat = useSoundEffect(config.audio.heartbeat, 0.6);
  const playCountdownVoice = useSoundEffect(config.audio.countdownVoice, 0.9);
  const vibrate = useVibration();

  useEffect(() => {
    // Duck the background music further so a spoken countdown (e.g. "10,
    // 9, 8...") is clearly audible over it, then play the voice track once.
    duckMusic(0.15, 600);
    playCountdownVoice();
    return () => restoreMusic(800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (count <= 0) {
      const t = window.setTimeout(goNext, 500);
      return () => window.clearTimeout(t);
    }
    playHeartbeat();
    vibrate(120);
    const t = window.setTimeout(() => setCount((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // Particle density increases as the count approaches zero.
  const particleCount = Math.max(6, (startCount - count) * 4);

  return (
    <SceneWrapper>
      <div className="absolute inset-0 bg-night-gradient" />
      <FloatingHearts count={particleCount} />

      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 animate-heartbeat font-display text-8xl text-rose-400 glow-text"
        >
          {count > 0 ? count : '❤️'}
        </motion.span>
      </AnimatePresence>
    </SceneWrapper>
  );
}
