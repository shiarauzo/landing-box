import { useCallback } from 'react';
import { Scene, GridBox } from './components/Scene';
import { CollageLayer } from './components/Collage';
import { ZoneManager, Emergence } from './components/Zones';
import { MessageOverlay, ScrollHint } from './components/UI';
import { useScrollDepth, useCollageElements, useEasterEggs } from './hooks';
import { createCamera } from './systems/parallax';
import { TOTAL_DEPTH } from './data/zones';

function App() {
  const { cameraZ, scrollProgress } = useScrollDepth();
  const elements = useCollageElements(cameraZ);
  const { alternateMode, showMessage, discoverElement } = useEasterEggs();

  const camera = createCamera(cameraZ);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Landing Box',
          text: 'An experimental 3D scroll experience.',
          url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
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
      <Scene cameraZ={cameraZ}>
        <GridBox depth={TOTAL_DEPTH} />
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

export default App;
