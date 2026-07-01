'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS, CLIENT_COUNTRIES } from '@/lib/constants';

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="stats" className="py-20 lg:py-28 bg-void relative overflow-hidden" ref={sectionRef}>
      <div className="cream-line mx-auto max-w-7xl mb-16 px-4 sm:px-6 lg:px-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Impact</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight text-balance">
            Numbers that <span className="gradient-text">matter</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="clay-card p-6 text-center group cursor-default"
            >
              <div className="text-4xl sm:text-5xl font-display font-black text-cream mb-2 tracking-tight">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} active={inView} />
              </div>
              <p className="text-white text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-ash text-xs font-light leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Country flags */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-ash text-sm font-light mb-6 tracking-tight">
            Trusted by clients across multiple countries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CLIENT_COUNTRIES.map((country, i) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal border border-white/[0.06] shadow-clay-sm hover:border-cream/20 transition-colors group cursor-default"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                <span className="text-lg leading-none" role="img" aria-label={country.name}>
                  {country.flag}
                </span>
                <span className="text-ash text-xs font-light group-hover:text-white transition-colors">
                  {country.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
