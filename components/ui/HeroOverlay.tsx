'use client';

import Link from 'next/link';
import { SternLogo } from './SternLogo';
import { Nav } from './Nav';

const TAGLINE = 'Engineered for those who know the difference.';

export function HeroOverlay({ scrollProgress = 0 }: { scrollProgress?: number }) {
  // Slide out of view: left block goes left, right block goes right (0 → 0.4)
  const t = Math.max(0, Math.min(1, scrollProgress / 0.4));
  const opacity = 1 - t;
  const slidePx = t * 120;
  const leftX = -slidePx;
  const rightX = slidePx;

  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col">
        <header className="flex items-center justify-between px-6 md:px-10 py-6 pointer-events-auto">
          <Link href="/" className="text-stern-offwhite hover:opacity-80 transition-opacity duration-200">
            <SternLogo className="w-10 h-10 md:w-12 md:h-12" />
          </Link>
          <div className="pointer-events-auto">
            <Nav />
          </div>
        </header>
      </div>

      {/* Fixed to viewport bottom so it's at the bottom of the first screen, not the hero section. */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-8 md:pb-10 pointer-events-none"
        style={{ transition: 'opacity 300ms ease-out' }}
      >
        <div className="flex flex-row items-end justify-between w-full">
          <div
            className="transition-transform duration-300 ease-out"
            style={{ opacity, transform: `translateX(${leftX}px)` }}
          >
            <h1
              className="text-[clamp(1.75rem,5vw,64px)] font-extralight tracking-[0.08em] text-stern-offwhite mb-1"
              style={{ fontWeight: 100 }}
            >
              STERN
            </h1>
            <p className="text-sm text-stern-offwhite/80 font-light">
              {TAGLINE}
            </p>
          </div>
          <div
            className="flex items-center gap-2 text-sm text-stern-offwhite/70 font-light transition-transform duration-300 ease-out"
            style={{ opacity, transform: `translateX(${rightX}px)` }}
            aria-hidden
          >
            <span>Scroll to explore</span>
            <span className="block w-10 h-px bg-stern-offwhite/30 overflow-hidden">
              <span className="block w-full h-full bg-stern-offwhite/60 animate-[scrollHint_2s_ease-in-out_infinite]" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
