import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { Button } from '@/components/common/Button';
import { NightSky } from '@/components/backgrounds/NightSky';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene16Credits() {
  const { restart } = useExperience();

  return (
    <SceneWrapper>
      <NightSky />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-3 text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-blush/50">Made with ❤️ by</p>
        <p className="font-display text-2xl text-blush">{config.people.from}</p>
        <p className="text-sm uppercase tracking-[0.3em] text-blush/50">for</p>
        <p className="font-script text-4xl text-rose-400 glow-text">{config.people.to}</p>

        <div className="mt-10">
          <Button variant="ghost" onClick={restart}>
            Watch Again
          </Button>
        </div>
      </motion.div>
    </SceneWrapper>
  );
}
