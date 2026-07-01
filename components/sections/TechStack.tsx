'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TECH_STACK, TECH_CATEGORIES } from '@/lib/constants';

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = TECH_STACK.filter(
    (t) => activeCategory === 'all' || t.category === activeCategory
  );

  return (
    <section id="stack" className="py-20 lg:py-28 bg-charcoal relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Tech Stack</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Tools of the <span className="gradient-text">craft</span>
          </h2>
          <p className="text-ash text-sm font-light max-w-md mx-auto leading-relaxed">
            Technologies I use daily to build, ship, and scale production applications.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {TECH_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'text-void font-medium'
                  : 'text-ash hover:text-white border border-white/[0.08] hover:border-cream/20'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-cream rounded-full"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tech grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                transition={{
                  layout: { type: 'spring', bounce: 0.25, duration: 0.5 },
                  opacity: { delay: i * 0.03, duration: 0.35 },
                  scale: { delay: i * 0.03, duration: 0.35 },
                }}
              >
                <motion.div
                  className="clay-card p-4 flex flex-col items-center text-center gap-2.5 cursor-default"
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-void border border-cream/10 flex items-center justify-center">
                    <span className="text-base font-medium text-cream leading-none" aria-label={tech.name}>
                      {tech.icon}
                    </span>
                  </div>

                  {/* Name */}
                  <p className="text-white text-sm font-medium leading-tight">{tech.name}</p>

                  {/* Category badge */}
                  <span className="text-[10px] text-ash/60 font-light capitalize">{tech.category}</span>

                  {/* Usage tooltip on hover */}
                  <p className="text-ash text-[11px] font-light leading-snug text-center opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:block">
                    {tech.usage}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Usage descriptions shown below on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {filtered.slice(0, 3).map((tech) => (
            <div
              key={`desc-${tech.name}`}
              className="hidden"
              aria-hidden="true"
            />
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-6 justify-center"
        >
          {[
            { label: 'Technologies', value: TECH_STACK.length + '+' },
            { label: 'Frontend', value: TECH_STACK.filter(t => t.category === 'frontend').length },
            { label: 'Backend', value: TECH_STACK.filter(t => t.category === 'backend').length },
            { label: 'DevOps Tools', value: TECH_STACK.filter(t => t.category === 'deployment').length },
          ].map((item) => (
            <div key={item.label} className="text-center min-w-[72px]">
              <p className="font-display text-xl sm:text-2xl font-black text-cream">{item.value}</p>
              <p className="text-ash text-[11px] sm:text-xs font-light mt-0.5">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
