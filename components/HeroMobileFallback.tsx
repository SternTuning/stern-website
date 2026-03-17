'use client';

export function HeroMobileFallback() {
  return (
    <div className="relative w-full h-screen min-h-[600px] bg-stern-black overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1a1a 0%, transparent 50%), linear-gradient(180deg, #0a0a0a 0%, #000 100%)',
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M80 120 Q120 80 160 100 T240 90 T320 110 L340 120 L320 130 L240 115 L160 125 L80 130 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M60 140 L100 138 L140 142 L180 136 L220 140 L260 135 L300 140 L340 138"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
    </div>
  );
}
