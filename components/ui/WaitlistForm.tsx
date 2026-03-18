'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BURST_COUNT = 24;

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [burst, setBurst] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || 'Something went wrong');
        return;
      }
      setSubmitted(true);
      setBurst(true);
      setTimeout(() => setBurst(false), 800);
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-stern-black border-t border-white/10">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-sm tracking-[0.3em] uppercase text-stern-silver/80 mb-6">
          Early Access
        </h2>
        <p className="text-stern-offwhite text-lg mb-10">
          Request access to the STERN platform.
        </p>
        {submitted ? (
          <div className="relative">
            <p className="text-stern-amg-red font-medium">
              Thanks. We&apos;ll be in touch.
            </p>
            <AnimatePresence>
              {burst && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
                  {Array.from({ length: BURST_COUNT }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-stern-amg-red"
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: 0,
                        x: Math.cos((i / BURST_COUNT) * Math.PI * 2) * 80,
                        y: Math.sin((i / BURST_COUNT) * Math.PI * 2) * 80,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-stern-amg-red text-sm">{error}</p>
            )}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-transparent border-0 border-b border-white/30 py-3 text-stern-offwhite placeholder:text-stern-silver/50 focus:outline-none focus:border-stern-offwhite transition-colors duration-200"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 border border-white text-white hover:bg-white hover:text-stern-black transition-all duration-200"
            >
              Request Access
            </button>
          </form>
        )}
        <p className="mt-8 text-stern-silver/60 text-sm">
          You&apos;ll hear from us when early access opens.
        </p>
      </div>
    </section>
  );
}
