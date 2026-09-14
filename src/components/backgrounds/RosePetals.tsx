import { useMemo } from 'react';

export function RosePetals({ count = 16 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 8 + Math.random() * 10,
        duration: 7 + Math.random() * 6,
        delay: Math.random() * 6,
        rotate: Math.random() * 360,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-5%] rounded-tl-full rounded-br-full bg-rose-400/70"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.8,
            transform: `rotate(${p.rotate}deg)`,
            animation: `petalFall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes petalFall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(30px) rotate(340deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
