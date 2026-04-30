import { useMemo } from 'react';
import type { Zone, CameraState } from '../../types/scene';
import { calculateTransform } from '../../systems/parallax';
import { getContentForZone } from '../../data/content';
import styles from './TextClearing.module.css';

interface TextClearingProps {
  zone: Zone;
  camera: CameraState;
}

export function TextClearing({ zone, camera }: TextClearingProps) {
  const content = getContentForZone(zone.id);
  if (!content) return null;

  const centerZ = zone.zStart + (zone.zEnd - zone.zStart) / 2;

  const transform = useMemo(() => {
    return calculateTransform(
      { x: 0, y: 0, z: centerZ },
      camera
    );
  }, [centerZ, camera]);

  if (!transform) return null;

  // Enhance opacity for text visibility
  const opacity = Math.min(1, transform.opacity * 1.5);

  const style: React.CSSProperties = {
    transform: `translate3d(-50%, -50%, ${-transform.position.z}px) scale(${transform.scale})`,
    opacity,
  };

  const typeClass = styles[content.type] || '';

  return (
    <div className={`${styles.clearing} ${typeClass}`} style={style}>
      {content.lines.map((line, i) => (
        <p key={i} className={styles.line}>
          {line}
        </p>
      ))}
    </div>
  );
}
