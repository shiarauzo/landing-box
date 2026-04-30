import type { Zone } from '../types/scene';

export const TOTAL_DEPTH = 9000;
export const PERSPECTIVE = 1000;
export const VIEWPORT_CULL_DISTANCE = 2000;

export const zones: Zone[] = [
  { id: 0, type: 'entry', zStart: 0, zEnd: 500, colorPhase: 'muted' },
  { id: 1, type: 'chaos', zStart: 500, zEnd: 1500, colorPhase: 'muted' },
  { id: 2, type: 'text', zStart: 1500, zEnd: 2000, colorPhase: 'muted' },
  { id: 3, type: 'chaos', zStart: 2000, zEnd: 3000, colorPhase: 'muted' },
  { id: 4, type: 'text', zStart: 3000, zEnd: 3300, colorPhase: 'muted' },
  { id: 5, type: 'chaos', zStart: 3300, zEnd: 4300, colorPhase: 'transition' },
  { id: 6, type: 'text', zStart: 4300, zEnd: 4600, colorPhase: 'transition' },
  { id: 7, type: 'chaos', zStart: 4600, zEnd: 5600, colorPhase: 'transition' },
  { id: 8, type: 'text', zStart: 5600, zEnd: 6200, colorPhase: 'bold' },
  { id: 9, type: 'chaos', zStart: 6200, zEnd: 7500, colorPhase: 'bold' },
  { id: 10, type: 'text', zStart: 7500, zEnd: 8000, colorPhase: 'bold' },
  { id: 11, type: 'emergence', zStart: 8000, zEnd: 9000, colorPhase: 'bold' },
];

export const textZonePositions = zones
  .filter((z) => z.type === 'text')
  .map((z) => (z.zStart + (z.zEnd - z.zStart) / 2) / TOTAL_DEPTH);

export function getZoneAtDepth(z: number): Zone {
  return zones.find((zone) => z >= zone.zStart && z < zone.zEnd) ?? zones[0];
}

export function getZoneProgress(z: number, zone: Zone): number {
  return (z - zone.zStart) / (zone.zEnd - zone.zStart);
}
