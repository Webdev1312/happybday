import { useMemo } from 'react';

export function Fireflies({ count = 14 }: { count?: number }) {
  const flies = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 60}%`,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 6,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f) => (
        <span
          key={f.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-gold-300 animate-floatUp"
          style={{
            left: f.left,
            bottom: f.bottom,
            boxShadow: '0 0 8px 3px rgba(255, 216, 115, 0.6)',
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
