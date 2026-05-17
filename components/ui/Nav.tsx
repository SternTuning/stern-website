'use client';

import Link from 'next/link';

const links = [
  { href: '/features', label: 'Features' },
  { href: '/compatibility', label: 'Compatibility' },
  { href: '/early-access', label: 'Early Access' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  return (
    <nav className="flex max-w-[calc(100vw-4.75rem)] items-center gap-0.5 overflow-x-auto sm:max-w-none sm:gap-2 md:gap-5">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="whitespace-nowrap rounded-md border border-transparent px-1.5 py-2 text-[10px] tracking-[0.08em] text-stern-offwhite/90 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.06] hover:text-stern-offwhite sm:px-3 sm:py-2.5 sm:text-sm sm:tracking-widest md:px-4"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
