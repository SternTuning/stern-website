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
        <header className="flex items-center justify-between gap-3 px-4 py-4 pointer-events-auto sm:px-6 md:px-10 md:py-6">
          <Link href="/" className="text-stern-offwhite hover:opacity-80 transition-opacity duration-200">
            <SternLogo className="h-9 w-9 md:h-12 md:w-12" />
          </Link>
          <div className="pointer-events-auto min-w-0">
            <Nav />
          </div>
        </header>
      </div>

      {/* Fixed to viewport bottom so it's at the bottom of the first screen, not the hero section. */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10 px-4 pb-7 pointer-events-none sm:px-6 md:px-10 md:pb-10"
        style={{ transition: 'opacity 300ms ease-out' }}
      >
        <div className="flex w-full flex-row items-end justify-between gap-4">
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
            className="hidden items-center gap-2 text-sm text-stern-offwhite/70 font-light transition-transform duration-300 ease-out sm:flex"
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
