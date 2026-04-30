import { memo, useCallback } from 'react';
import type { CollageElementData, Transform3D } from '../../types/scene';
import styles from './CollageElement.module.css';

interface CollageElementProps {
  element: CollageElementData;
  transform: Transform3D;
  color: string;
  alternateMode?: boolean;
  onSpecialClick?: (id: string) => void;
}

export const CollageElement = memo(function CollageElement({
  element,
  transform,
  color,
  alternateMode = false,
  onSpecialClick,
}: CollageElementProps) {
  const handleClick = useCallback(() => {
    if (element.isSpecial && onSpecialClick) {
      onSpecialClick(element.id);
    }
  }, [element.id, element.isSpecial, onSpecialClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (element.isSpecial && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleClick();
      }
    },
    [element.isSpecial, handleClick]
  );

  const actualColor = alternateMode ? invertColor(color) : color;

  const style: React.CSSProperties = {
    transform: `translate3d(${transform.position.x}px, ${transform.position.y}px, ${-transform.position.z}px) scale(${transform.scale}) rotate(${element.rotation}deg)`,
    opacity: transform.opacity,
    width: `${element.size}px`,
    height: `${element.size}px`,
    backgroundColor: element.shape === 'block' ? actualColor : 'transparent',
    borderColor: actualColor,
  };

  const className = [
    styles.element,
    styles[element.shape],
    element.isSpecial ? styles.special : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={element.isSpecial ? 'button' : undefined}
      tabIndex={element.isSpecial ? 0 : undefined}
      aria-label={element.isSpecial ? 'Secret element - press Enter to discover' : undefined}
    />
  );
});

function invertColor(hex: string): string {
  // Handle short hex codes (#abc -> #aabbcc)
  let normalizedHex = hex;
  if (hex.length === 4) {
    normalizedHex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  const r = 255 - parseInt(normalizedHex.slice(1, 3), 16);
  const g = 255 - parseInt(normalizedHex.slice(3, 5), 16);
  const b = 255 - parseInt(normalizedHex.slice(5, 7), 16);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
