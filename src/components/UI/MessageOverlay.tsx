import styles from './MessageOverlay.module.css';

interface MessageOverlayProps {
  message: string | null;
}

export function MessageOverlay({ message }: MessageOverlayProps) {
  if (!message) return null;

  return (
    <div className={styles.overlay}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
