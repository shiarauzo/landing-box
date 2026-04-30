import type { ReactNode } from 'react';
import { PERSPECTIVE } from '../../data/zones';
import styles from './Scene.module.css';

interface SceneProps {
  children: ReactNode;
  cameraZ: number;
}

export function Scene({ children, cameraZ }: SceneProps) {
  return (
    <div className={styles.scene}>
      <div
        className={styles.camera}
        style={{
          perspective: `${PERSPECTIVE}px`,
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className={styles.world}
          style={{
            transform: `translateZ(${cameraZ}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
