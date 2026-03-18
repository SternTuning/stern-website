import Link from 'next/link';
import { SternLogo } from '@/components/ui/SternLogo';
import { Nav } from '@/components/ui/Nav';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/10">
        <Link href="/" className="text-stern-offwhite hover:opacity-80 transition-opacity duration-200">
          <SternLogo className="w-10 h-10 md:w-12 md:h-12" />
        </Link>
        <Nav />
      </header>
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-2xl mx-auto">
        <h2 className="text-sm tracking-[0.3em] uppercase text-stern-silver/80 mb-8">
          The story
        </h2>
        <p className="text-stern-offwhite leading-relaxed mb-6">
          STERN — German for &quot;star&quot; — is built for those who understand that
          precision tuning is engineering, not guesswork. We provide direct access
          to Mercedes-AMG powertrain control: ECU, CPC, and datalogging in one
          platform.
        </p>
        <p className="text-stern-silver/80 leading-relaxed">
          No bloat. No middlemen. Just the tools and the map.
        </p>
      </section>
    </main>
  );
}
