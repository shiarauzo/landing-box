import { useCallback, useMemo } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Scene, GridBox } from './components/Scene';
import { CollageLayer } from './components/Collage';
import { ZoneManager, Emergence } from './components/Zones';
import { MessageOverlay, ScrollHint } from './components/UI';
import { useScrollDepth, useCollageElements, useEasterEggs } from './hooks';
import { createCamera } from './systems/parallax';
import { TOTAL_DEPTH } from './data/zones';

function AppContent() {
  const { cameraZ, scrollProgress } = useScrollDepth();
  const elements = useCollageElements(cameraZ);
  const { alternateMode, showMessage, discoverElement } = useEasterEggs();

  // Memoize camera to prevent unnecessary re-renders
  const camera = useMemo(() => createCamera(cameraZ), [cameraZ]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Landing Box',
          text: 'An experimental 3D scroll experience.',
          url,
        });
        return;
      } catch {
        // User cancelled or error - fall through to clipboard
      }
    }

    // Fallback to clipboard API with proper error handling
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
        alert(`Copy this link: ${url}`);
      }
    } else {
      // Final fallback for browsers without clipboard API
      alert(`Copy this link: ${url}`);
    }
  }, []);

  const handleSpecialClick = useCallback(
    (id: string) => {
      discoverElement(id);
    },
    [discoverElement]
  );

  return (
    <>
      {/* GridBox rendered outside Scene for proper fixed positioning */}
      <GridBox depth={TOTAL_DEPTH} cameraZ={cameraZ} />

      <Scene cameraZ={cameraZ}>
        <CollageLayer
          elements={elements}
          camera={camera}
          alternateMode={alternateMode}
          onSpecialClick={handleSpecialClick}
        />
        <ZoneManager camera={camera} />
      </Scene>

      <Emergence cameraZ={cameraZ} onShare={handleShare} />
      <MessageOverlay message={showMessage} />
      <ScrollHint visible={scrollProgress < 0.02} />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
