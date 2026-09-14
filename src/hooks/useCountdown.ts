import { useEffect, useMemo, useState } from 'react';

export interface CountdownParts {
  totalMs: number;
  hours: number;
  minutes: number;
  seconds: number;
  isDone: boolean;
}

/** Ticks every second and reports the remaining time until `targetDate`. */
export function useCountdownTo(targetDate: Date): CountdownParts {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const totalMs = Math.max(0, targetDate.getTime() - now);
    const totalSeconds = Math.floor(totalMs / 1000);
    return {
      totalMs,
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      isDone: totalMs <= 0,
    };
  }, [now, targetDate]);
}

/** Returns today's (or, if already past, tomorrow's) 11:59:00 PM local time. */
export function getTonightElevenFiftyNine(): Date {
  const target = new Date();
  target.setHours(23, 59, 0, 0);
  if (target.getTime() < Date.now()) {
    target.setDate(target.getDate() + 1);
  }
  return target;
}
