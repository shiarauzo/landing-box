import { useState, useEffect, useCallback } from 'react';

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

export function useEasterEggs() {
  const [discoveredCount, setDiscoveredCount] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });
  const [alternateMode, setAlternateMode] = useState(false);
  const [showMessage, setShowMessage] = useState<string | null>(null);

  // Konami code detection
  useEffect(() => {
    let inputSequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      inputSequence.push(e.key);
      inputSequence = inputSequence.slice(-KONAMI_CODE.length);

      if (inputSequence.join(',') === KONAMI_CODE.join(',')) {
        setAlternateMode((prev) => !prev);
        setShowMessage('Secret mode activated!');
        setTimeout(() => setShowMessage(null), 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const discoverElement = useCallback((elementId: string) => {
    const discovered = JSON.parse(
      localStorage.getItem(STORAGE_KEY + '-ids') || '[]'
    );
    if (!discovered.includes(elementId)) {
      discovered.push(elementId);
      localStorage.setItem(STORAGE_KEY + '-ids', JSON.stringify(discovered));
      const newCount = discovered.length;
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      setDiscoveredCount(newCount);
      setShowMessage('You found a secret!');
      setTimeout(() => setShowMessage(null), 1500);
      return true;
    }
    return false;
  }, []);

  return {
    discoveredCount,
    alternateMode,
    showMessage,
    discoverElement,
  };
}
