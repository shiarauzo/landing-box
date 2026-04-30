export interface TextContent {
  zoneId: number;
  type: 'paragraph' | 'sentence' | 'words';
  lines: string[];
}

export const textContent: TextContent[] = [
  {
    zoneId: 2,
    type: 'paragraph',
    lines: [
      'You have been waiting',
      'for permission',
      'that will never come.',
    ],
  },
  {
    zoneId: 4,
    type: 'sentence',
    lines: ['The only way out is through.'],
  },
  {
    zoneId: 6,
    type: 'words',
    lines: ['BUILD', 'SHIP', 'REPEAT'],
  },
  {
    zoneId: 8,
    type: 'paragraph',
    lines: [
      'Perfection is a prison.',
      'Progress is a door.',
      'Choose.',
    ],
  },
  {
    zoneId: 10,
    type: 'sentence',
    lines: ['Now go make something.'],
  },
];

export function getContentForZone(zoneId: number): TextContent | undefined {
  return textContent.find((c) => c.zoneId === zoneId);
}
