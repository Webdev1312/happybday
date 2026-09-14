import { useMemo } from 'react';
import { FaHeart } from 'react-icons/fa';

export function FloatingHearts({ count = 10 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 12 + Math.random() * 16,
        duration: 8 + Math.random() * 7,
        delay: Math.random() * 8,
        opacity: 0.25 + Math.random() * 0.35,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <FaHeart
          key={h.id}
          className="absolute bottom-0 text-rose-400 animate-floatUp"
          style={{
            left: h.left,
            fontSize: h.size,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
