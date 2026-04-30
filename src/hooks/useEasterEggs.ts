import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'landing-box-discovered';
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
const KONAMI_TIMEOUT = 2000; // Reset sequence if no key pressed within 2s

// Safe localStorage helpers
function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeParseInt(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function safeParseArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useEasterEggs() {
  const [discoveredCount, setDiscoveredCount] = useState(() => {
    return safeParseInt(safeGetItem(STORAGE_KEY), 0);
  });
  const [alternateMode, setAlternateMode] = useState(false);
  const [showMessage, setShowMessage] = useState<string | null>(null);

  // Konami code detection with timeout
  useEffect(() => {
    let inputSequence: string[] = [];
    let lastKeyTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();

      // Reset sequence if too much time between keys
      if (now - lastKeyTime > KONAMI_TIMEOUT) {
        inputSequence = [];
      }
      lastKeyTime = now;

      inputSequence.push(e.key);
      inputSequence = inputSequence.slice(-KONAMI_CODE.length);

      if (inputSequence.join(',') === KONAMI_CODE.join(',')) {
        setAlternateMode((prev) => !prev);
        setShowMessage('Secret mode activated!');
        setTimeout(() => setShowMessage(null), 2000);
        inputSequence = []; // Reset after activation
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Use ref to track message timeout
  const messageTimeoutRef = useRef<number | null>(null);

  const discoverElement = useCallback((elementId: string) => {
    try {
      const discovered = safeParseArray(safeGetItem(STORAGE_KEY + '-ids'));

      if (!discovered.includes(elementId)) {
        discovered.push(elementId);

        const idsStored = safeSetItem(STORAGE_KEY + '-ids', JSON.stringify(discovered));
        const countStored = safeSetItem(STORAGE_KEY, discovered.length.toString());

        if (!idsStored || !countStored) {
          console.warn('Failed to save discovery to localStorage');
        }

        setDiscoveredCount(discovered.length);

        // Clear existing timeout before setting new one
        if (messageTimeoutRef.current) {
          clearTimeout(messageTimeoutRef.current);
        }
        setShowMessage('You found a secret!');
        messageTimeoutRef.current = window.setTimeout(() => setShowMessage(null), 1500);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error discovering element:', error);
      return false;
    }
  }, []);

  return {
    discoveredCount,
    alternateMode,
    showMessage,
    discoverElement,
  };
}
