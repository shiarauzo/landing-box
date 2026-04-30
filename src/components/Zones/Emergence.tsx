import { getEmergenceProgress } from '../../systems/color';
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
  const shareOpacity = progress > 0.7 ? (progress - 0.7) / 0.3 : 0;

  return (
    <div className={styles.emergence}>
      <div
        className={styles.overlay}
        style={{ opacity: overlayOpacity }}
      />
      <div
        className={styles.content}
        style={{ opacity: contentOpacity }}
      >
        <p className={styles.attribution}>an experiment by Shiara</p>
        {shareOpacity > 0 && (
          <button
            className={styles.shareButton}
            style={{ opacity: shareOpacity }}
            onClick={onShare}
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
}
