'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'ECU Flash',
    description:
      'Reflash your MED17.7.3 directly over OBD. Stock backup included.',
    icon: EcuIcon,
  },
  {
    title: 'CPC Tuning',
    description:
      'Full powertrain controller access. Torque limits, exhaust flaps, launch RPM.',
    icon: CpcIcon,
  },
  {
    title: 'Live Datalogging',
    description:
      '50+ channels. Boost, knock, IAT, cylinder timing — real-time CSV.',
    icon: LogIcon,
  },
  {
    title: 'Map Switching',
    description:
      'Swap between 91 oct, 93 oct, and track maps in under 60 seconds.',
    icon: MapIcon,
  },
  {
    title: 'Burble Control',
    description:
      'Exhaust pops on demand. Fine-tune aggression, threshold, and RPM range.',
    icon: BurbleIcon,
  },
  {
    title: 'Wireless',
    description: 'WiFi OBD adapter. iPhone and Android. No laptop required.',
    icon: WirelessIcon,
  },
];

function EcuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="4" y="6" width="16" height="12" rx="1" />
      <path d="M8 10h8M8 14h4" />
    </svg>
  );
}
function CpcIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}
function LogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 18V6M9 18V6M14 18V6M19 18V6" />
    </svg>
  );
}
function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" />
    </svg>
  );
}
function BurbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 2v6l4 2-4 2v6M8 8l-2 4 2 4" />
    </svg>
  );
}
function WirelessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M5 12.55a11 11 0 0114 0M8.5 16.1a7 7 0 017 0M12 20h.01" />
    </svg>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function FeatureCards() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-stern-black border-t border-white/10">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
      >
        <h2 className="text-sm tracking-[0.3em] uppercase text-stern-silver/80 mb-16">
          What STERN does
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={item}
              className="border border-white/10 p-6 md:p-8 hover:bg-white/5 transition-colors duration-200"
            >
              <Icon className="w-8 h-8 text-stern-amg-red/90 mb-4" />
              <h3 className="text-lg font-medium tracking-wide text-stern-offwhite mb-2">
                {title}
              </h3>
              <p className="text-sm text-stern-silver/80 leading-relaxed">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
