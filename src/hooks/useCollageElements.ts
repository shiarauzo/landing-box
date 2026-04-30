import { useMemo } from 'react';
import { zones, VIEWPORT_CULL_DISTANCE } from '../data/zones';
import { generateAllElements, cullElements } from '../systems/parallax';
import type { CollageElementData } from '../types/scene';

const MOBILE_DENSITY = 0.5;
const DESKTOP_DENSITY = 0.8;

function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

// Generate all elements once
let cachedElements: CollageElementData[] | null = null;
let cachedMobileElements: CollageElementData[] | null = null;

function getElements(mobile: boolean): CollageElementData[] {
  if (mobile) {
    if (!cachedMobileElements) {
      cachedMobileElements = generateAllElements(zones, MOBILE_DENSITY);
    }
    return cachedMobileElements;
  }
  if (!cachedElements) {
    cachedElements = generateAllElements(zones, DESKTOP_DENSITY);
  }
  return cachedElements;
}

export function useCollageElements(cameraZ: number): CollageElementData[] {
  return useMemo(() => {
    const elements = getElements(isMobile());
    return cullElements(elements, cameraZ, VIEWPORT_CULL_DISTANCE);
  }, [cameraZ]);
}
