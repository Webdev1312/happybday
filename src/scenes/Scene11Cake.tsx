import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { Button } from '@/components/common/Button';
import { useExperience } from '@/context/ExperienceContext';
import { useSoundEffect } from '@/hooks/useAudio';
import { config } from '@/config';

const CANDLE_COUNT = 5;

function Candle({ lit, onTap, index }: { lit: boolean; onTap: () => void; index: number }) {
  return (
    <button
      onClick={onTap}
      aria-label={lit ? 'Blow out candle' : 'Candle out'}
      className="relative flex w-6 flex-col items-center"
      style={{ height: 46 }}
    >
      <AnimatePresence>
        {lit && (
          <motion.span
            key="flame"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: -10 }}
            className="absolute -top-3 h-3 w-2 animate-flicker rounded-full bg-gold-400"
            style={{ boxShadow: '0 0 8px 3px rgba(244,192,76,0.7)' }}
          />
        )}
        {!lit && (
          <motion.span
            key="smoke"
            initial={{ opacity: 0.6, y: 0 }}
            animate={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.4 }}
            className="absolute -top-3 h-4 w-2 rounded-full bg-white/40 blur-[2px]"
          />
        )}
      </AnimatePresence>
      <div className="mt-2 h-8 w-2 rounded-sm bg-rose-300" />
      <span className="sr-only">Candle {index + 1}</span>
    </button>
  );
}

export default function Scene11Cake() {
  const { goNext, candlesBlownOut, setCandlesBlownOut } = useExperience();
  const [lit, setLit] = useState<boolean[]>(Array(CANDLE_COUNT).fill(!candlesBlownOut));
  const playCandleBlow = useSoundEffect(config.audio.candleBlow, 0.6);

  const handleTap = (i: number) => {
    playCandleBlow();
    setLit((prev) => {
      const next = [...prev];
      next[i] = false;
      if (next.every((l) => !l)) setCandlesBlownOut(true);
      return next;
    });
  };

  const allOut = lit.every((l) => !l);

  return (
    <SceneWrapper>
      <div className="absolute inset-0 bg-night-gradient" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <h2 className="font-display text-2xl text-blush glow-text">Make a wish</h2>
        <p className="text-xs text-blush/50">Tap each candle to blow it out</p>

        <div className="mt-4 flex items-end gap-3">
          {lit.map((l, i) => (
            <Candle key={i} lit={l} onTap={() => handleTap(i)} index={i} />
          ))}
        </div>

        {/* Cake body */}
        <div className="relative -mt-1 flex flex-col items-center">
          <div className="h-10 w-56 rounded-t-2xl bg-gradient-to-b from-rose-300 to-rose-400" />
          <div className="h-16 w-64 rounded-b-lg bg-gradient-to-b from-[#f7e7ec] to-[#e9c9d6]" />
        </div>

        <AnimatePresence>
          {allOut && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Button onClick={goNext}>Continue</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneWrapper>
  );
}
