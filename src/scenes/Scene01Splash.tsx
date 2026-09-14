import { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { NightSky } from '@/components/backgrounds/NightSky';
import { Fireflies } from '@/components/backgrounds/Fireflies';
import { TypewriterText } from '@/components/common/TypewriterText';
import { Button } from '@/components/common/Button';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene01Splash() {
  const { goNext } = useExperience();
  const [typingDone, setTypingDone] = useState(false);

  return (
    <SceneWrapper>
      <NightSky />
      <Fireflies />

      <div className="relative z-10 flex flex-col items-center gap-10 text-center">
        <TypewriterText
          text={config.splash.tagline + ' ❤️'}
          className="glow-text font-display text-3xl leading-snug text-blush"
          speedMs={55}
          startDelayMs={600}
          onDone={() => setTypingDone(true)}
        />

        {typingDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button onClick={goNext}>Begin</Button>
          </motion.div>
        )}
      </div>
    </SceneWrapper>
  );
}
