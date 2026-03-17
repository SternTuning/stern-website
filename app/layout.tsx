import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'STERN — Engineered for those who know the difference.',
  description:
    'Premium Mercedes-AMG tuning platform. ECU flash, CPC tuning, live datalogging, map switching.',
  icons: {
    icon: '/stern-icon.svg',
    apple: '/stern-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-stern-black font-sans text-stern-offwhite antialiased">
        {children}
      </body>
    </html>
  );
}
