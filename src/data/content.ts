export type TextType = 'title' | 'subtitle' | 'paragraph' | 'sentence' | 'words' | 'word';
export type HighlightColor = 'magenta' | 'cyan' | 'yellow' | 'green' | 'none';

export interface TextContent {
  zoneId: number;
  type: TextType;
  lines: string[];
  highlight?: HighlightColor;
  subtext?: string;
}

// Content inspired by Emil Kowalski's "Developing Taste"
// https://emilkowal.ski/ui/developing-taste
export const textContent: TextContent[] = [
  // ENTRY - The hook
  {
    zoneId: 1,
    type: 'title',
    lines: ['TASTE'],
    highlight: 'none',
    subtext: 'A manifesto on creating with intention',
  },

  // THE PROBLEM - Set the context
  {
    zoneId: 2,
    type: 'paragraph',
    lines: [
      'In a world of abundance,',
      'everyone can build.',
    ],
    highlight: 'none',
  },
  {
    zoneId: 3,
    type: 'sentence',
    lines: ['But not everyone builds with taste.'],
    highlight: 'magenta',
  },

  // DEFINITION - Core concept
  {
    zoneId: 4,
    type: 'title',
    lines: ['TASTE'],
    highlight: 'cyan',
  },
  {
    zoneId: 5,
    type: 'paragraph',
    lines: [
      'is trained instinct',
      'not personal preference',
    ],
    highlight: 'none',
  },

  // THE GAP - The insight
  {
    zoneId: 6,
    type: 'sentence',
    lines: ['The gap between your taste and your work'],
    highlight: 'none',
  },
  {
    zoneId: 7,
    type: 'words',
    lines: ['proves you\'re growing'],
    highlight: 'yellow',
  },

  // STUDY - First principle
  {
    zoneId: 8,
    type: 'title',
    lines: ['SURROUND'],
    highlight: 'magenta',
  },
  {
    zoneId: 9,
    type: 'paragraph',
    lines: [
      'yourself with excellence.',
      'Study what moves you.',
      'Ask why it works.',
    ],
    highlight: 'none',
  },

  // PRACTICE - Second principle
  {
    zoneId: 10,
    type: 'title',
    lines: ['CREATE'],
    highlight: 'cyan',
  },
  {
    zoneId: 11,
    type: 'paragraph',
    lines: [
      'relentlessly.',
      'Even when it falls short.',
      'Especially when it falls short.',
    ],
    highlight: 'none',
  },

  // THE TRUTH - The hard part
  {
    zoneId: 12,
    type: 'sentence',
    lines: ['Your first 100 attempts'],
    highlight: 'none',
  },
  {
    zoneId: 13,
    type: 'words',
    lines: ['will disappoint you'],
    highlight: 'yellow',
  },
  {
    zoneId: 14,
    type: 'word',
    lines: ['That\'s the point.'],
    highlight: 'magenta',
  },

  // CLOSING - The quote
  {
    zoneId: 15,
    type: 'paragraph',
    lines: [
      '"In a world of scarcity,',
      'we treasure tools.',
      'In a world of abundance,',
      'we treasure taste."',
    ],
    highlight: 'none',
    subtext: '— Anu Atluru',
  },

  // FINAL - Ship it
  {
    zoneId: 16,
    type: 'title',
    lines: ['Now ship it.'],
    highlight: 'cyan',
  },
];

// Attribution for the emergence section
export const attribution = {
  title: 'an experiment by',
  name: 'Shiara',
  inspiration: 'Inspired by Emil Kowalski\'s "Developing Taste"',
  kofi: 'https://ko-fi.com/shiaradesign',
};

export function getContentForZone(zoneId: number): TextContent | undefined {
  return textContent.find((c) => c.zoneId === zoneId);
}
