import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { Button } from '@/components/common/Button';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene14FinalLetter() {
  const { goNext } = useExperience();

  return (
    <SceneWrapper scrollable className="justify-start gap-6 pt-14">
      <div className="absolute inset-0 bg-night-gradient" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="scene-scroll relative z-10 w-full max-w-sm rounded-3xl glass bg-card-glow p-6 pb-8"
      >
        <p className="whitespace-pre-line font-display text-lg italic leading-relaxed text-blush">
          {config.finalLetter.body}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Button onClick={goNext} className="relative z-10">
          Continue
        </Button>
      </motion.div>
    </SceneWrapper>
  );
}
