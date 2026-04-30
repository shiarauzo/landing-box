import type { Zone } from '../types/scene';

export const TOTAL_DEPTH = 12000;
export const PERSPECTIVE = 1000;
export const VIEWPORT_CULL_DISTANCE = 3000;

// More zones with alternating chaos and text
export const zones: Zone[] = [
  // Entry
  { id: 0, type: 'entry', zStart: 0, zEnd: 400, colorPhase: 'muted' },
  // Chaos -> Text pattern with more variety
  { id: 1, type: 'chaos', zStart: 400, zEnd: 1000, colorPhase: 'muted' },
  { id: 2, type: 'text', zStart: 1000, zEnd: 1400, colorPhase: 'muted' },
  { id: 3, type: 'chaos', zStart: 1400, zEnd: 2000, colorPhase: 'muted' },
  { id: 4, type: 'text', zStart: 2000, zEnd: 2500, colorPhase: 'muted' },
  { id: 5, type: 'chaos', zStart: 2500, zEnd: 3200, colorPhase: 'transition' },
  { id: 6, type: 'text', zStart: 3200, zEnd: 3600, colorPhase: 'transition' },
  { id: 7, type: 'chaos', zStart: 3600, zEnd: 4400, colorPhase: 'transition' },
  { id: 8, type: 'text', zStart: 4400, zEnd: 4900, colorPhase: 'transition' },
  { id: 9, type: 'chaos', zStart: 4900, zEnd: 5700, colorPhase: 'transition' },
  { id: 10, type: 'text', zStart: 5700, zEnd: 6200, colorPhase: 'bold' },
  { id: 11, type: 'chaos', zStart: 6200, zEnd: 7200, colorPhase: 'bold' },
  { id: 12, type: 'text', zStart: 7200, zEnd: 7700, colorPhase: 'bold' },
  { id: 13, type: 'chaos', zStart: 7700, zEnd: 8500, colorPhase: 'bold' },
  { id: 14, type: 'text', zStart: 8500, zEnd: 9000, colorPhase: 'bold' },
  { id: 15, type: 'chaos', zStart: 9000, zEnd: 10000, colorPhase: 'bold' },
  { id: 16, type: 'text', zStart: 10000, zEnd: 10800, colorPhase: 'bold' },
  { id: 17, type: 'emergence', zStart: 10800, zEnd: 12000, colorPhase: 'bold' },
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
