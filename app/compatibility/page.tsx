import Link from 'next/link';
import { SternLogo } from '@/components/ui/SternLogo';
import { Nav } from '@/components/ui/Nav';
import { CompatibilityTable } from '@/components/ui/CompatibilityTable';

export default function CompatibilityPage() {
  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/10">
        <Link href="/" className="text-stern-offwhite hover:opacity-80 transition-opacity duration-200">
          <SternLogo className="w-10 h-10 md:w-12 md:h-12" />
        </Link>
        <Nav />
      </header>
      <CompatibilityTable />
    </main>
  );
}
