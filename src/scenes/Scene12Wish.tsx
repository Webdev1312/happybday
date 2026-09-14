import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { FloatingHearts } from '@/components/backgrounds/FloatingHearts';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene12Wish() {
  const { goNext } = useExperience();

  useEffect(() => {
    const t = window.setTimeout(goNext, 3600);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SceneWrapper>
      <div className="absolute inset-0 bg-night-gradient" />
      <FloatingHearts count={16} />

      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.6, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, scale: 1, letterSpacing: '0em' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-display text-5xl leading-tight text-blush glow-text"
        >
          Happy Birthday
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
          className="font-script text-5xl text-rose-400 glow-text"
        >
          My Love ❤️
        </motion.h2>
      </div>
    </SceneWrapper>
  );
}
