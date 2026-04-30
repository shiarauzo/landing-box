import { useMemo } from 'react';
import type { CollageElementData, CameraState } from '../../types/scene';
import { calculateTransform } from '../../systems/parallax';
import { getColorForElement } from '../../systems/color';
import { getZoneAtDepth } from '../../data/zones';
import { CollageElement } from './CollageElement';
import styles from './CollageLayer.module.css';

interface CollageLayerProps {
  elements: CollageElementData[];
  camera: CameraState;
  alternateMode?: boolean;
  onSpecialClick?: (id: string) => void;
}

export function CollageLayer({
  elements,
  camera,
  alternateMode = false,
  onSpecialClick,
}: CollageLayerProps) {
  const visibleElements = useMemo(() => {
    return elements
      .map((element, index) => {
        const transform = calculateTransform(element.position, camera);
        if (!transform) return null;

        const zone = getZoneAtDepth(element.position.z);
        const color = getColorForElement(element.position.z, index, zone);

        return {
          element: { ...element, color },
          transform,
          color,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b!.transform.position.z - a!.transform.position.z);
  }, [elements, camera]);

  return (
    <div className={styles.layer}>
      {visibleElements.map(
        (item) =>
          item && (
            <CollageElement
              key={item.element.id}
              element={item.element}
              transform={item.transform}
              color={item.color}
              alternateMode={alternateMode}
              onSpecialClick={onSpecialClick}
            />
          )
      )}
    </div>
  );
}
