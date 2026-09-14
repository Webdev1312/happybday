import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { Button } from '@/components/common/Button';
import { FloatingHearts } from '@/components/backgrounds/FloatingHearts';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene15FinalSurprise() {
  const { goNext } = useExperience();
  const [opened, setOpened] = useState(false);

  return (
    <SceneWrapper>
      <div className="absolute inset-0 bg-night-gradient" />
      <FloatingHearts count={12} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="heart"
              onClick={() => setOpened(true)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-4"
              aria-label="Open the heart"
            >
              <FaHeart className="animate-heartbeat text-8xl text-rose-500 glow-text" />
              <span className="text-sm text-blush/60">Tap the heart</span>
            </motion.button>
          ) : (
            <motion.div
              key="lines"
              className="flex flex-col items-center gap-2 text-center"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.35 } } }}
            >
              {config.finalSurprise.lines.map((line, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.8 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  className="font-display text-4xl text-blush glow-text"
                >
                  {line}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {opened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            <Button onClick={goNext}>Continue</Button>
          </motion.div>
        )}
      </div>
    </SceneWrapper>
  );
}
