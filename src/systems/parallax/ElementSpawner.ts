import type { CollageElementData, Position3D, ShapeType, Zone } from '../../types/scene';

// Seeded random number generator
function createSeededRandom(seed: number) {
  return function () {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

const shapes: ShapeType[] = ['circle', 'rectangle', 'triangle', 'block'];

export function generateElementsForZone(
  zone: Zone,
  density: number = 1
): CollageElementData[] {
  if (zone.type !== 'chaos') return [];

  const random = createSeededRandom(zone.id * 1000);
  const zoneDepth = zone.zEnd - zone.zStart;
  const baseCount = Math.floor(zoneDepth / 50);
  const elementCount = Math.floor(baseCount * density);

  const elements: CollageElementData[] = [];

  for (let i = 0; i < elementCount; i++) {
    const z = zone.zStart + random() * zoneDepth;
    const spreadX = 800 + random() * 400;
    const spreadY = 500 + random() * 300;

    const position: Position3D = {
      x: (random() - 0.5) * spreadX,
      y: (random() - 0.5) * spreadY,
      z,
    };

    const shape = shapes[Math.floor(random() * shapes.length)];
    const size = 20 + random() * 80;
    const rotation = random() * 360;
    const isSpecial = random() < 0.1; // 10% are special

    elements.push({
      id: `${zone.id}-${i}`,
      shape,
      position,
      size,
      rotation,
      color: '', // Will be set by color system
      isSpecial,
    });
  }

  return elements;
}

export function generateAllElements(
  zones: Zone[],
  density: number = 1
): CollageElementData[] {
  return zones.flatMap((zone) => generateElementsForZone(zone, density));
}

export function cullElements(
  elements: CollageElementData[],
  cameraZ: number,
  cullDistance: number
): CollageElementData[] {
  return elements.filter((el) => {
    const relativeZ = el.position.z - cameraZ;
    return relativeZ > 0 && relativeZ <= cullDistance;
  });
}
