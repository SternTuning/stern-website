'use client';

/**
 * STERN mark only — three-blade turbine icon, transparent background.
 * Use currentColor so it renders white/offwhite on dark and black on light.
 */
export function SternLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Three faceted blades, central negative space — icon only, no wordmark */}
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="miter">
        <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" />
        <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" transform="rotate(120 20 20)" />
        <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" transform="rotate(240 20 20)" />
      </g>
    </svg>
  );
}
