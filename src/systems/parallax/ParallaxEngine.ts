import type { Position3D, Transform3D, CameraState } from '../../types/scene';
import { PERSPECTIVE, VIEWPORT_CULL_DISTANCE } from '../../data/zones';

export function calculateTransform(
  elementPosition: Position3D,
  camera: CameraState
): Transform3D | null {
  const relativeZ = elementPosition.z - camera.position.z;

  // Behind camera or too far - cull
  if (relativeZ <= 0 || relativeZ > VIEWPORT_CULL_DISTANCE) {
    return null;
  }

  const scale = camera.perspective / relativeZ;

  // Too small to see
  if (scale < 0.01) {
    return null;
  }

  const x = (elementPosition.x - camera.position.x) * scale;
  const y = (elementPosition.y - camera.position.y) * scale;

  // Calculate opacity based on distance (fade in close, fade out far)
  const normalizedDistance = relativeZ / VIEWPORT_CULL_DISTANCE;
  const fadeInStart = 0.05;
  const fadeOutStart = 0.7;

  let opacity = 1;
  if (normalizedDistance < fadeInStart) {
    opacity = normalizedDistance / fadeInStart;
  } else if (normalizedDistance > fadeOutStart) {
    opacity = 1 - (normalizedDistance - fadeOutStart) / (1 - fadeOutStart);
  }

  return {
    position: { x, y, z: relativeZ },
    scale: Math.min(scale, 10), // Cap scale to prevent oversized elements
    opacity: Math.max(0, Math.min(1, opacity)),
  };
}

export function isInViewport(
  elementZ: number,
  cameraZ: number,
  cullDistance: number = VIEWPORT_CULL_DISTANCE
): boolean {
  const relativeZ = elementZ - cameraZ;
  return relativeZ > 0 && relativeZ <= cullDistance;
}

export function projectToScreen(
  position: Position3D,
  camera: CameraState,
  viewportWidth: number,
  viewportHeight: number
): { x: number; y: number } | null {
  const transform = calculateTransform(position, camera);
  if (!transform) return null;

  return {
    x: viewportWidth / 2 + transform.position.x,
    y: viewportHeight / 2 + transform.position.y,
  };
}

export function createCamera(z: number = 0): CameraState {
  return {
    position: { x: 0, y: 0, z },
    perspective: PERSPECTIVE,
  };
}
