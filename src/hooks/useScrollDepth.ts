import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TOTAL_DEPTH } from '../data/zones';

gsap.registerPlugin(ScrollTrigger);

export function useScrollDepth() {
  const [cameraZ, setCameraZ] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Create a dummy element to animate
    const proxy = { z: 0 };

    tweenRef.current = gsap.to(proxy, {
      z: TOTAL_DEPTH,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Smooth scrubbing
        onUpdate: (self) => {
          setCameraZ(proxy.z);
          setScrollProgress(self.progress);
        },
      },
    });

    return () => {
      tweenRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return { cameraZ, scrollProgress };
}
