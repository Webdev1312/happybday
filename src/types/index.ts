export const SCENE_ORDER = [
  'splash',
  'volume-check',
  'quotes',
  'love-letter',
  'our-story',
  'gallery',
  'reasons',
  'waiting-room',
  'final-countdown',
  'midnight-explosion',
  'cake',
  'wish',
  'voice-message',
  'final-letter',
  'final-surprise',
  'credits',
] as const;

export type SceneId = (typeof SCENE_ORDER)[number];

export interface ExperienceState {
  /** Index into SCENE_ORDER, persisted so a refresh resumes where you left off. */
  sceneIndex: number;
  /** Whether background music has been started (needed for autoplay policies). */
  musicStarted: boolean;
  /** Whether candles on the cake have been blown out. */
  candlesBlownOut: boolean;
}
