import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { textZonePositions } from '../data/zones';

gsap.registerPlugin(ScrollTrigger);

export function useSoftSnap(enabled: boolean = true) {
  const isSnappingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // Configure snap behavior
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      snap: {
        snapTo: textZonePositions,
        duration: { min: 0.2, max: 0.6 },
        delay: 0.1,
        ease: 'power2.inOut',
        inertia: false,
      },
      onSnapComplete: () => {
        isSnappingRef.current = false;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [enabled]);

  return { isSnapping: isSnappingRef.current };
}
