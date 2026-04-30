import { useMemo } from 'react';
import { zones, VIEWPORT_CULL_DISTANCE } from '../data/zones';
import { generateAllElements, cullElements } from '../systems/parallax';
import type { CollageElementData } from '../types/scene';

const MOBILE_DENSITY = 0.6;

function isMobile(): boolean {
  return window.innerWidth < 768;
}

// Generate all elements once
const allElements = generateAllElements(zones, 1);
const mobileElements = generateAllElements(zones, MOBILE_DENSITY);

export function useCollageElements(cameraZ: number): CollageElementData[] {
  return useMemo(() => {
    const elements = isMobile() ? mobileElements : allElements;
    return cullElements(elements, cameraZ, VIEWPORT_CULL_DISTANCE);
  }, [cameraZ]);
}
