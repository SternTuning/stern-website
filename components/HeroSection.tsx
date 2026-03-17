'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { HeroCanvas } from './HeroCanvas';
import { HeroOverlay } from './ui/HeroOverlay';

export function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const onScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const heroHeight = el.offsetHeight;
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / heroHeight, 1);
    const eased = 1 - (1 - progress) ** 1.4;
    setScrollProgress(eased);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[600px]"
      style={{ height: '180vh' }}
    >
      <HeroCanvas scrollProgress={scrollProgress} embedded />
      <HeroOverlay scrollProgress={scrollProgress} />
    </section>
  );
}
