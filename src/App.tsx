import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ExperienceProvider } from '@/context/ExperienceContext';
import { SceneRouter } from '@/router/SceneRouter';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { RotateHint } from '@/components/common/RotateHint';
import { DesktopNotice } from '@/components/common/DesktopNotice';

function LoadingFallback() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-midnight-900">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-rose-400 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ExperienceProvider>
          <div className="relative mx-auto h-[100dvh] w-full max-w-md overflow-hidden bg-midnight-900">
            <Suspense fallback={<LoadingFallback />}>
              <SceneRouter />
            </Suspense>
            <RotateHint />
            <DesktopNotice />
          </div>
        </ExperienceProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
