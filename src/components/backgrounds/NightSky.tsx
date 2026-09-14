import { useMemo } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
}

export function NightSky({ withMoon = true }: { withMoon?: boolean }) {
  const stars: Star[] = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-night-gradient" />

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {withMoon && (
        <div
          className="absolute right-8 top-12 h-20 w-20 rounded-full bg-gold-300"
          style={{ boxShadow: '0 0 60px 20px rgba(255, 232, 179, 0.35)' }}
        />
      )}

      {/* Drifting clouds */}
      <div className="absolute top-24 h-10 w-40 animate-drift rounded-full bg-white/5 blur-xl [animation-duration:38s]" />
      <div className="absolute top-40 h-8 w-32 animate-drift rounded-full bg-white/5 blur-xl [animation-duration:52s] [animation-delay:-10s]" />
      <div className="absolute top-16 h-6 w-24 animate-drift rounded-full bg-white/5 blur-lg [animation-duration:44s] [animation-delay:-25s]" />
    </div>
  );
}
