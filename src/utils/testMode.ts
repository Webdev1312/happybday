import { config } from '@/config';

/**
 * Test mode is on if either:
 *  - config.testMode is set to true, OR
 *  - the page was opened with ?test=1 (handy for one-off testing
 *    without editing the config file, e.g. while sharing a link
 *    with yourself).
 */
export function isTestMode(): boolean {
  if (config.testMode) return true;
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('test') === '1' || params.get('test') === 'true';
}
