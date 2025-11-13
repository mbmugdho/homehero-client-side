import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RADIUS = 280;  
const DENSITY = 6;  

const BASE_ITEMS = [
  {
    id: 'clean',
    title: 'Cleaning',
    desc: 'Sparkling homes with flexible schedules.',
    to: '/services?cat=Cleaning',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M7 21l2-8h6l2 8M9 13V6a3 3 0 1 1 6 0v7" />
      </svg>
    ),
  },
  {
    id: 'plumb',
    title: 'Plumbing',
    desc: 'Leaks, installs, and water heaters.',
    to: '/services?cat=Plumbing',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h6l3-3 3 3h6M12 9v12" />
      </svg>
    ),
  },
  {
    id: 'elec',
    title: 'Electrical',
    desc: 'Wiring, lighting, smart homes.',
    to: '/services?cat=Electrical',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2 3 14h7v8l11-14h-7z" />
      </svg>
    ),
  },
];

const items = Array.from({ length: DENSITY }, (_, i) => BASE_ITEMS[i % BASE_ITEMS.length]);

function ServiceCard({ title, desc, to, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      className="card w-64 h-44 p-4 bg-white/10 backdrop-blur border border-white/15 text-white shadow-xl hover:-translate-y-1 transition [backface-visibility:hidden]"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl grid place-items-center bg-[hsl(var(--a))]/30 text-white">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-white/80 text-sm">{desc}</p>
        </div>
      </div>
      <div className="mt-4">
        <Link to={to} className="cosmic-btn text-sm px-4 py-2 inline-flex">
          Explore
        </Link>
      </div>
    </motion.div>
  );
}

export default function ThreeDCarousel() {
  const step = 360 / items.length;

  return (
    <section className="container-x py-2">
      <div className="relative mx-auto h-[460px] sm:h-[520px] [perspective:1100px]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[520px] h-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(192,93,185,0.22),transparent_65%)]" />
        </div>

        <div
          className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     [transform-style:preserve-3d] animate-spin-y-slow
                     hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          aria-label="3D services carousel"
        >
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
              style={{ transform: `rotateY(${idx * step}deg) translateZ(${RADIUS}px)` }}
            >
              <ServiceCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
