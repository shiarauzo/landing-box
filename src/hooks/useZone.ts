import { useMemo } from 'react';
import { getZoneAtDepth, getZoneProgress } from '../data/zones';
import type { Zone } from '../types/scene';

export function useZone(cameraZ: number): {
  zone: Zone;
  zoneProgress: number;
} {
  return useMemo(() => {
    const zone = getZoneAtDepth(cameraZ);
    const zoneProgress = getZoneProgress(cameraZ, zone);
    return { zone, zoneProgress };
  }, [cameraZ]);
}
