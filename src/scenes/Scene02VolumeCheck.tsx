import { SceneWrapper } from '@/components/common/SceneWrapper';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/common/Button';
import { NightSky } from '@/components/backgrounds/NightSky';
import { useExperience } from '@/context/ExperienceContext';
import { FaVolumeUp } from 'react-icons/fa';

export default function Scene02VolumeCheck() {
  const { goNext, startMusic } = useExperience();

  const handleReady = () => {
    // Must happen inside a user gesture for mobile autoplay policies.
    startMusic();
    goNext();
  };

  return (
    <SceneWrapper>
      <NightSky withMoon={false} />

      <GlassCard className="relative z-10 flex max-w-sm flex-col items-center gap-6 text-center">
        <FaVolumeUp className="text-4xl text-gold-400" />
        <p className="font-display text-xl leading-relaxed text-blush">
          For the best experience,
          <br />
          please increase your volume
          <br />
          to at least 50%.
        </p>
        <Button onClick={handleReady} className="animate-heartbeat">
          I'm Ready ❤️
        </Button>
      </GlassCard>
    </SceneWrapper>
  );
}
