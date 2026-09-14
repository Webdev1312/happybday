import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { RosePetals } from '@/components/backgrounds/RosePetals';
import { useExperience } from '@/context/ExperienceContext';
import { useSoundEffect } from '@/hooks/useAudio';
import { config } from '@/config';

function launchFireworks() {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: ['#ff5fa2', '#f4c04c', '#ffffff'],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: ['#ff5fa2', '#f4c04c', '#ffffff'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.4 },
    colors: ['#ff5fa2', '#ffb3d1', '#f4c04c'],
  });
}

const BALLOON_EMOJIS = ['🎈', '🎈', '🎈', '🎈', '🎈'];

export default function Scene10MidnightExplosion() {
  const { goNext, playHappyBirthdaySong } = useExperience();
  const playCrackers = useSoundEffect(config.audio.crackers, 0.7);

  useEffect(() => {
    launchFireworks();
    playCrackers();
    // Crossfade the main background loop into the dedicated Happy
    // Birthday song right as the fireworks go off — it keeps playing
    // through the cake and wish scenes, then a second background
    // track crossfades in automatically once it finishes.
    playHappyBirthdaySong();
    const t = window.setTimeout(goNext, 4200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SceneWrapper>
      <div className="absolute inset-0 bg-night-gradient" />
      <RosePetals count={22} />

      {/* Rising balloons */}
      {BALLOON_EMOJIS.map((b, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute bottom-0 text-4xl"
          style={{ left: `${10 + i * 18}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-110vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6 + i, delay: i * 0.3, ease: 'easeOut' }}
        >
          {b}
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 rounded-full bg-white/10 p-10"
        style={{ boxShadow: '0 0 120px 60px rgba(255,216,115,0.35)' }}
      >
        <span className="font-display text-4xl text-blush glow-text">It's Midnight! 🎉</span>
      </motion.div>
    </SceneWrapper>
  );
}
