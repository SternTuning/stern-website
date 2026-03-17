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
    <nav className="flex items-center gap-8">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-sm tracking-widest text-stern-offwhite/90 hover:text-stern-offwhite rounded-lg py-2.5 px-4 -mx-1 border border-transparent hover:border-white/10 hover:bg-white/[0.06] transition-all duration-200"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
