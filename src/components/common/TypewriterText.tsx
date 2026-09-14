import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speedMs?: number;
  className?: string;
  onDone?: () => void;
  startDelayMs?: number;
  cursor?: boolean;
}

export function TypewriterText({
  text,
  speedMs = 45,
  className = '',
  onDone,
  startDelayMs = 0,
  cursor = true,
}: TypewriterTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [started, setStarted] = useState(startDelayMs === 0);

  useEffect(() => {
    if (startDelayMs === 0) return;
    const t = window.setTimeout(() => setStarted(true), startDelayMs);
    return () => window.clearTimeout(t);
  }, [startDelayMs]);

  useEffect(() => {
    if (!started) return;
    if (visibleChars >= text.length) {
      onDone?.();
      return;
    }
    const t = window.setTimeout(() => setVisibleChars((v) => v + 1), speedMs);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleChars, started, text, speedMs]);

  const isDone = visibleChars >= text.length;

  return (
    <span className={className} aria-label={text}>
      {text.slice(0, visibleChars)}
      {cursor && !isDone && <span className="animate-pulse">|</span>}
    </span>
  );
}
