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
    return calculateTransform({ x: 0, y: 0, z: centerZ }, camera);
  }, [centerZ, camera]);

  if (!transform) return null;

  // Enhanced opacity for better readability
  const opacity = Math.min(1, transform.opacity * 2);

  // Don't render if too transparent
  if (opacity < 0.1) return null;

  const style: React.CSSProperties = {
    transform: `translate3d(-50%, -50%, ${-transform.position.z}px) scale(${Math.min(transform.scale, 3)})`,
    opacity,
  };

  const typeClass = styles[content.type] || '';
  const highlightClass = content.highlight && content.highlight !== 'none' ? styles[content.highlight] : '';

  return (
    <div className={`${styles.clearing} ${typeClass}`} style={style}>
      {content.lines.map((line, i) => (
        <p key={i} className={`${styles.line} ${highlightClass}`}>
          <span className={styles.text}>{line}</span>
          {content.highlight && content.highlight !== 'none' && <span className={styles.underline} />}
        </p>
      ))}
      {content.subtext && (
        <p className={styles.subtext}>{content.subtext}</p>
      )}
    </div>
  );
}
