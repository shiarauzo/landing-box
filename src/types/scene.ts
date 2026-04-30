export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface Transform3D {
  position: Position3D;
  scale: number;
  opacity: number;
}

export interface CameraState {
  position: Position3D;
  perspective: number;
}

export type ZoneType = 'entry' | 'chaos' | 'text' | 'emergence';

export interface Zone {
  id: number;
  type: ZoneType;
  zStart: number;
  zEnd: number;
  colorPhase: 'muted' | 'transition' | 'bold';
}

export type ShapeType = 'circle' | 'rectangle' | 'triangle' | 'block';

export interface CollageElementData {
  id: string;
  shape: ShapeType;
  position: Position3D;
  size: number;
  rotation: number;
  color: string;
  isSpecial: boolean;
}

export interface SceneRenderer {
  renderElement(element: CollageElementData, transform: Transform3D): void;
  renderGrid(cameraZ: number): void;
}
