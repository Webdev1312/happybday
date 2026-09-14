import { SceneWrapper } from '@/components/common/SceneWrapper';
import { NightSky } from '@/components/backgrounds/NightSky';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/common/Button';
import { useCountdownTo, getTonightElevenFiftyNine } from '@/hooks/useCountdown';
import { useExperience } from '@/context/ExperienceContext';
import { isTestMode } from '@/utils/testMode';
import { config } from '@/config';
import { useMemo } from 'react';

export default function Scene08WaitingRoom() {
  const { goNext, restart } = useExperience();
  const target = useMemo(() => getTonightElevenFiftyNine(), []);
  const { hours, minutes, seconds, totalMs } = useCountdownTo(target);

  const testMode = isTestMode();
  const minutesRemaining = totalMs / 1000 / 60;
  const isAlmostMidnight = testMode || minutesRemaining <= config.almostMidnightThresholdMinutes;

  return (
    <SceneWrapper>
      <NightSky />

      <GlassCard className="relative z-10 flex max-w-sm flex-col items-center gap-6 text-center">
        {isAlmostMidnight ? (
          <>
            <p className="font-display text-2xl text-blush glow-text">
              It's almost midnight ❤️
            </p>
            {testMode && (
              <p className="text-xs text-gold-400/80">
                (Test mode is on — the real midnight wait is bypassed.)
              </p>
            )}
            <div className="flex flex-col gap-3">
              <Button onClick={goNext}>Celebrate Now</Button>
              <Button variant="ghost" onClick={restart}>
                Restart Experience
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="font-display text-xl text-blush">Just a little longer...</p>
            <div className="flex gap-4 font-display text-4xl text-gold-400 glow-text">
              <span>{String(hours).padStart(2, '0')}</span>:
              <span>{String(minutes).padStart(2, '0')}</span>:
              <span>{String(seconds).padStart(2, '0')}</span>
            </div>
            <p className="text-xs text-blush/50">until midnight</p>
            <Button variant="ghost" onClick={restart}>
              Restart Experience
            </Button>
          </>
        )}
      </GlassCard>
    </SceneWrapper>
  );
}
