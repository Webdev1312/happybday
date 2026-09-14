export function RotateHint() {
  return (
    <div className="rotate-hint absolute inset-0 z-50 flex-col items-center justify-center gap-3 bg-midnight-900 text-center text-blush">
      <span className="text-4xl">📱</span>
      <p className="font-display text-xl">Please rotate back to portrait</p>
      <p className="text-sm text-blush/60">This experience is designed for portrait mode.</p>
    </div>
  );
}
