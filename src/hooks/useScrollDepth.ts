import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TOTAL_DEPTH } from '../data/zones';

gsap.registerPlugin(ScrollTrigger);

export function useScrollDepth() {
  const [cameraZ, setCameraZ] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const proxy = { z: 0 };

    tweenRef.current = gsap.to(proxy, {
      z: TOTAL_DEPTH,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          setCameraZ(proxy.z);
          setScrollProgress(self.progress);
        },
      },
    });

    // Store reference to this specific ScrollTrigger
    scrollTriggerRef.current = tweenRef.current.scrollTrigger ?? null;

    return () => {
      // Only kill our specific ScrollTrigger, not all of them
      scrollTriggerRef.current?.kill();
      tweenRef.current?.kill();
    };
  }, []);

  return { cameraZ, scrollProgress };
}
