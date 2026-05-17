'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';

// Defer 3D bundle until after first paint so overlay and LCP are fast
const CarShowroom = dynamic(
  () =>
    import('@/components/three/CarShowroom').then((m) => ({ default: m.CarShowroom })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-stern-black" aria-hidden />
    ),
  }
);

const MOBILE_BREAKPOINT = 768;

type HeroCanvasProps = {
  scrollProgress?: number;
  embedded?: boolean;
};

export function HeroCanvas({ scrollProgress: scrollProgressProp, embedded }: HeroCanvasProps = {}) {
  const [internalScroll, setInternalScroll] = useState(0);
  const scrollProgress = embedded ? (scrollProgressProp ?? 0) : (scrollProgressProp ?? internalScroll);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loadCanvas, setLoadCanvas] = useState(false);
  const [canvasInView, setCanvasInView] = useState(true);
  const [shouldReduce3D, setShouldReduce3D] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      setShouldReduce3D(
        Boolean(connection?.saveData) ||
          connection?.effectiveType === 'slow-2g' ||
          connection?.effectiveType === '2g'
      );
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Start the 3D bundle immediately after hydration; the model itself is preloaded.
  useEffect(() => {
    if (!mounted) return;
    setLoadCanvas(true);
  }, [mounted]);

  // Pause 3D work when hero is out of view to reduce scroll crashes / context load
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setCanvasInView(e.isIntersecting),
      { threshold: 0.1, rootMargin: '0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loadCanvas]);

  const onScroll = useCallback(() => {
    if (embedded || !containerRef.current) return;
    const el = containerRef.current;
    const heroHeight = el.offsetHeight;
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / heroHeight, 1);
    const eased = 1 - (1 - progress) ** 1.4;
    setInternalScroll(eased);
  }, [embedded]);

  useEffect(() => {
    if (embedded) return;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll, embedded]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setMouseParallax({
      x: (e.clientX / w - 0.5) * 2,
      y: (e.clientY / h - 0.5) * 2,
    });
  }, []);

  const stickyContent = (
    <div ref={stickyRef} className="sticky top-0 h-[100svh] w-full">
      {loadCanvas ? (
        <CanvasErrorBoundary>
          <CarShowroom
            scrollProgress={scrollProgress}
            mouseParallax={mouseParallax}
            isHovering={isHovering}
            isInView={canvasInView}
            isMobile={isMobile}
            reduceQuality={shouldReduce3D}
          />
        </CanvasErrorBoundary>
      ) : (
        <div className="absolute inset-0 bg-stern-black" />
      )}
    </div>
  );

  if (!mounted) {
    return embedded ? <div className="absolute inset-0 bg-stern-black" /> : (
      <div ref={containerRef} className="relative h-[108svh] min-h-[600px] w-full bg-stern-black md:h-[125vh] md:min-h-[680px] lg:h-[120vh]" />
    );
  }

  const interactiveWrap = (
    <div
      className={embedded ? 'absolute inset-0' : 'relative h-[108svh] min-h-[600px] w-full md:h-[125vh] md:min-h-[680px] lg:h-[120vh]'}
      ref={embedded ? undefined : containerRef}
      onMouseMove={isMobile ? undefined : onMouseMove}
      onMouseEnter={isMobile ? undefined : () => setIsHovering(true)}
      onMouseLeave={isMobile ? undefined : () => setIsHovering(false)}
    >
      {stickyContent}
    </div>
  );

  return interactiveWrap;
}
