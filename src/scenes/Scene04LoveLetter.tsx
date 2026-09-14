import { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { TypewriterText } from '@/components/common/TypewriterText';
import { Button } from '@/components/common/Button';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene04LoveLetter() {
  const { goNext } = useExperience();
  const [done, setDone] = useState(false);

  return (
    <SceneWrapper scrollable className="justify-start pt-16">
      <div className="absolute inset-0 bg-night-gradient" />

      <div
        className="scene-scroll relative z-10 h-full w-full max-w-sm rounded-2xl border border-gold-400/20 bg-[#f7ecd9]/95 p-6 shadow-2xl"
        style={{
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 27px, rgba(120,90,50,0.08) 28px)',
        }}
      >
        <p className="mb-4 font-script text-2xl text-[#5b3a1f]">{config.loveLetter.salutation}</p>
        <TypewriterText
          text={config.loveLetter.body}
          speedMs={14}
          className="whitespace-pre-line font-script text-lg leading-8 text-[#4a3018]"
          onDone={() => setDone(true)}
        />
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mt-6"
        >
          <Button onClick={goNext}>Continue</Button>
        </motion.div>
      )}
    </SceneWrapper>
  );
}
