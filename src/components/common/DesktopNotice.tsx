import { useEffect, useState } from 'react';

/**
 * This experience is designed mobile-first. Rather than hard-blocking
 * desktop browsers (which would also block you from testing it in a
 * browser dev-tools device emulator), this shows a small dismissible
 * note when the viewport is clearly desktop-sized.
 */
export function DesktopNotice() {
  const [dismissed, setDismissed] = useState(false);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const check = () => setIsWide(window.innerWidth > 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isWide || dismissed) return null;

  return (
    <div className="absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-3 bg-midnight-950/90 px-4 py-2 text-xs text-blush/80 backdrop-blur">
      <span>Best experienced on a phone — this is a preview.</span>
      <button
        onClick={() => setDismissed(true)}
        className="rounded-full bg-white/10 px-2 py-1 text-blush hover:bg-white/20"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
