import { lazy, type ComponentType } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useExperience } from '@/context/ExperienceContext';
import type { SceneId } from '@/types';

const Scene01Splash = lazy(() => import('@/scenes/Scene01Splash'));
const Scene02VolumeCheck = lazy(() => import('@/scenes/Scene02VolumeCheck'));
const Scene03Quotes = lazy(() => import('@/scenes/Scene03Quotes'));
const Scene04LoveLetter = lazy(() => import('@/scenes/Scene04LoveLetter'));
const Scene05OurStory = lazy(() => import('@/scenes/Scene05OurStory'));
const Scene06Gallery = lazy(() => import('@/scenes/Scene06Gallery'));
const Scene07Reasons = lazy(() => import('@/scenes/Scene07Reasons'));
const Scene08WaitingRoom = lazy(() => import('@/scenes/Scene08WaitingRoom'));
const Scene09FinalCountdown = lazy(() => import('@/scenes/Scene09FinalCountdown'));
const Scene10MidnightExplosion = lazy(() => import('@/scenes/Scene10MidnightExplosion'));
const Scene11Cake = lazy(() => import('@/scenes/Scene11Cake'));
const Scene12Wish = lazy(() => import('@/scenes/Scene12Wish'));
const Scene13VoiceMessage = lazy(() => import('@/scenes/Scene13VoiceMessage'));
const Scene14FinalLetter = lazy(() => import('@/scenes/Scene14FinalLetter'));
const Scene15FinalSurprise = lazy(() => import('@/scenes/Scene15FinalSurprise'));
const Scene16Credits = lazy(() => import('@/scenes/Scene16Credits'));

const SCENE_COMPONENTS: Record<SceneId, ComponentType> = {
  splash: Scene01Splash,
  'volume-check': Scene02VolumeCheck,
  quotes: Scene03Quotes,
  'love-letter': Scene04LoveLetter,
  'our-story': Scene05OurStory,
  gallery: Scene06Gallery,
  reasons: Scene07Reasons,
  'waiting-room': Scene08WaitingRoom,
  'final-countdown': Scene09FinalCountdown,
  'midnight-explosion': Scene10MidnightExplosion,
  cake: Scene11Cake,
  wish: Scene12Wish,
  'voice-message': Scene13VoiceMessage,
  'final-letter': Scene14FinalLetter,
  'final-surprise': Scene15FinalSurprise,
  credits: Scene16Credits,
};

export function SceneRouter() {
  const { sceneId } = useExperience();
  const Current = SCENE_COMPONENTS[sceneId];

  return (
    <AnimatePresence mode="wait">
      <Current key={sceneId} />
    </AnimatePresence>
  );
}
