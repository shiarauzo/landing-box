import styles from './GridBox.module.css';

interface GridBoxProps {
  depth: number;
}

export function GridBox({ depth }: GridBoxProps) {
  return (
    <div className={styles.gridBox}>
      {/* Floor */}
      <div
        className={styles.surface}
        style={{
          transform: 'rotateX(90deg) translateZ(-300px)',
          width: '2000px',
          height: `${depth}px`,
        }}
      >
        <div className={styles.gridPattern} />
      </div>

      {/* Ceiling */}
      <div
        className={styles.surface}
        style={{
          transform: 'rotateX(-90deg) translateZ(-300px)',
          width: '2000px',
          height: `${depth}px`,
        }}
      >
        <div className={styles.gridPattern} />
      </div>

      {/* Left wall */}
      <div
        className={styles.surface}
        style={{
          transform: 'rotateY(90deg) translateZ(-1000px)',
          width: `${depth}px`,
          height: '600px',
        }}
      >
        <div className={styles.gridPattern} />
      </div>

      {/* Right wall */}
      <div
        className={styles.surface}
        style={{
          transform: 'rotateY(-90deg) translateZ(-1000px)',
          width: `${depth}px`,
          height: '600px',
        }}
      >
        <div className={styles.gridPattern} />
      </div>
    </div>
  );
}
