import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/common/Button';
import { useExperience } from '@/context/ExperienceContext';
import { config } from '@/config';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function Scene13VoiceMessage() {
  const { goNext, duckMusic, restoreMusic } = useExperience();
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    howlRef.current = new Howl({
      src: [config.voiceMessage.src],
      volume: 1,
      onend: () => {
        setPlaying(false);
        setFinished(true);
        restoreMusic(1200);
      },
    });
    return () => {
      howlRef.current?.unload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlay = () => {
    duckMusic(0.08, 500);
    howlRef.current?.play();
    setPlaying(true);
  };

  const handlePause = () => {
    howlRef.current?.pause();
    setPlaying(false);
  };

  return (
    <SceneWrapper>
      <div className="absolute inset-0 bg-night-gradient" />

      <GlassCard className="relative z-10 flex max-w-sm flex-col items-center gap-6 text-center">
        <p className="font-display text-xl leading-relaxed text-blush">
          {config.voiceMessage.label}
        </p>

        <motion.button
          onClick={playing ? handlePause : handlePlay}
          whileTap={{ scale: 0.92 }}
          className="ripple flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-2xl text-white shadow-glow"
          aria-label={playing ? 'Pause voice message' : 'Play voice message'}
        >
          {playing ? <FaPause /> : <FaPlay className="ml-1" />}
        </motion.button>

        {finished && <Button onClick={goNext}>Continue</Button>}
        {!finished && !playing && (
          <p className="text-xs text-blush/50">Tap play — headphones recommended</p>
        )}
      </GlassCard>
    </SceneWrapper>
  );
}
