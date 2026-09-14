import { useCallback } from 'react';

/** Wraps navigator.vibrate with a feature check — silently no-ops where unsupported (e.g. iOS Safari). */
export function useVibration() {
  return useCallback((pattern: number | number[]) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Some browsers throw if called outside a user gesture — safe to ignore.
      }
    }
  }, []);
}
