import type { ReactNode } from 'react';
import styles from './Scene.module.css';

interface SceneProps {
  children: ReactNode;
  cameraZ: number;
}

export function Scene({ children, cameraZ: _cameraZ }: SceneProps) {
  return (
    <div className={styles.scene}>
      <div className={styles.viewport}>
        <div className={styles.world}>
          {children}
        </div>
      </div>
    </div>
  );
}
