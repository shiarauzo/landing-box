import styles from './ScrollHint.module.css';

interface ScrollHintProps {
  visible: boolean;
}

export function ScrollHint({ visible }: ScrollHintProps) {
  if (!visible) return null;

  return (
    <div className={styles.hint}>
      <div className={styles.arrow} />
      <p className={styles.text}>Scroll to enter</p>
    </div>
  );
}
