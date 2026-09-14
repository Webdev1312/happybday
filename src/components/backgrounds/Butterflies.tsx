import { useMemo } from 'react';
import { GiButterfly } from 'react-icons/gi';

export function Butterflies({ count = 5 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: `${10 + Math.random() * 60}%`,
        duration: 16 + Math.random() * 10,
        delay: Math.random() * 8,
        size: 16 + Math.random() * 10,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b) => (
        <GiButterfly
          key={b.id}
          className="absolute animate-drift text-rose-300/70"
          style={{
            top: b.top,
            fontSize: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
