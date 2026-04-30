import { getEmergenceProgress } from '../../systems/color';
import { attribution } from '../../data/content';
import styles from './Emergence.module.css';

interface EmergenceProps {
  cameraZ: number;
  onShare?: () => void;
}

export function Emergence({ cameraZ, onShare }: EmergenceProps) {
  const progress = getEmergenceProgress(cameraZ);

  if (progress === 0) return null;

  const overlayOpacity = Math.min(1, progress * 1.2);
  const contentOpacity = progress > 0.3 ? (progress - 0.3) / 0.7 : 0;
  const linksOpacity = progress > 0.5 ? (progress - 0.5) / 0.5 : 0;

  return (
    <div className={styles.emergence}>
      <div className={styles.overlay} style={{ opacity: overlayOpacity }} />
      <div className={styles.content} style={{ opacity: contentOpacity }}>
        <p className={styles.label}>{attribution.title}</p>
        <p className={styles.name}>{attribution.name}</p>
        <p className={styles.inspiration}>{attribution.inspiration}</p>

        {linksOpacity > 0 && (
          <div className={styles.links} style={{ opacity: linksOpacity }}>
            <a
              href={attribution.kofi}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.kofiButton}
            >
              ☕ Buy me a coffee
            </a>
            <button
              className={styles.shareButton}
              onClick={onShare}
            >
              Share this experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
