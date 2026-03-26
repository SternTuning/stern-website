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
    <nav className="flex items-center gap-1 sm:gap-3 md:gap-8 max-w-[calc(100vw-4.5rem)] sm:max-w-none overflow-hidden">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-[11px] sm:text-sm tracking-[0.08em] sm:tracking-widest whitespace-nowrap text-stern-offwhite/90 hover:text-stern-offwhite rounded-md sm:rounded-lg py-2 px-2 sm:py-2.5 sm:px-4 -mx-0.5 sm:-mx-1 border border-transparent hover:border-white/10 hover:bg-white/[0.06] transition-all duration-200"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
