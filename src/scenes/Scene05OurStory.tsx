import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/common/Button';
import { NightSky } from '@/components/backgrounds/NightSky';
import { Butterflies } from '@/components/backgrounds/Butterflies';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene05OurStory() {
  const { goNext } = useExperience();

  return (
    <SceneWrapper scrollable className="justify-start gap-6 pt-14">
      <NightSky withMoon={false} />
      <Butterflies />

      <h2 className="relative z-10 mb-2 font-display text-3xl text-blush glow-text">Our Story</h2>

      <div className="scene-scroll relative z-10 flex w-full max-w-sm flex-col gap-4 pb-8">
        {config.timeline.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <GlassCard className="flex flex-col gap-1">
              <span className="font-script text-lg text-gold-400">{item.year}</span>
              <h3 className="font-display text-xl text-blush">{item.title}</h3>
              <p className="text-sm leading-relaxed text-blush/75">{item.description}</p>
            </GlassCard>
          </motion.div>
        ))}

        <div className="mt-4 flex justify-center">
          <Button onClick={goNext}>Continue</Button>
        </div>
      </div>
    </SceneWrapper>
  );
}
