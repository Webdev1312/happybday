import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { Button } from '@/components/common/Button';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

function ReasonCard({ index, reason }: { index: number; reason: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.button
      layout
      onClick={() => setRevealed((v) => !v)}
      whileTap={{ scale: 0.97 }}
      className="glass flex min-h-[104px] w-full flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center"
    >
      <motion.span
        animate={revealed ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.45 }}
      >
        {revealed ? (
          <FaHeart className="text-2xl text-rose-500" />
        ) : (
          <FaRegHeart className="text-2xl text-rose-300/70" />
        )}
      </motion.span>
      {revealed ? (
        <p className="text-sm leading-snug text-blush">{reason}</p>
      ) : (
        <p className="text-xs uppercase tracking-widest text-blush/40">Reason #{index + 1}</p>
      )}
    </motion.button>
  );
}

export default function Scene07Reasons() {
  const { goNext } = useExperience();

  return (
    <SceneWrapper scrollable className="justify-start gap-5 pt-14">
      <div className="absolute inset-0 bg-night-gradient" />

      <h2 className="relative z-10 font-display text-3xl text-blush glow-text">Reasons I Love You</h2>
      <p className="relative z-10 -mt-3 text-xs text-blush/50">Tap each heart</p>

      <div className="scene-scroll relative z-10 grid w-full max-w-sm grid-cols-2 gap-3 pb-6">
        {config.reasons.map((reason, i) => (
          <ReasonCard key={i} index={i} reason={reason} />
        ))}
      </div>

      <Button onClick={goNext} className="relative z-10">
        Continue
      </Button>
    </SceneWrapper>
  );
}
