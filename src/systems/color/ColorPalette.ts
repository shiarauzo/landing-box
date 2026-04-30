import type { Zone } from '../../types/scene';

export interface ColorPalette {
  colors: string[];
  background: string;
}

export const mutedPalette: ColorPalette = {
  colors: ['#4a4a4a', '#5c5c5c', '#6e6e6e', '#7a6b6b', '#6b7a7a'],
  background: '#000000',
};

export const transitionPalette: ColorPalette = {
  colors: ['#8b5a5a', '#5a8b7a', '#7a5a8b', '#8b8b5a', '#5a7a8b'],
  background: '#0a0a0a',
};

export const boldPalette: ColorPalette = {
  colors: ['#ff4444', '#44ff88', '#ff44ff', '#ffff44', '#44ffff', '#ff8844'],
  background: '#0f0f0f',
};

export function getPaletteForPhase(phase: Zone['colorPhase']): ColorPalette {
  switch (phase) {
    case 'muted':
      return mutedPalette;
    case 'transition':
      return transitionPalette;
    case 'bold':
      return boldPalette;
  }
}

export function getColorForElement(
  _elementZ: number,
  elementIndex: number,
  zone: Zone
): string {
  const palette = getPaletteForPhase(zone.colorPhase);
  return palette.colors[elementIndex % palette.colors.length];
}

// Interpolate between two hex colors
function interpolateColor(color1: string, color2: string, t: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function getBackgroundColor(z: number): string {
  // Emergence zone: fade from black to white
  const emergenceStart = 8000;
  if (z >= emergenceStart) {
    const progress = Math.min(1, (z - emergenceStart) / 1000);
    return interpolateColor('#000000', '#ffffff', progress);
  }
  return '#000000';
}

export function getEmergenceProgress(z: number): number {
  const emergenceStart = 8000;
  if (z < emergenceStart) return 0;
  return Math.min(1, (z - emergenceStart) / 1000);
}
