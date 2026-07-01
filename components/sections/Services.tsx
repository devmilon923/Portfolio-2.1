'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bug, Rocket, Layers, Check, MessageSquare } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const icons = { bug: Bug, rocket: Rocket, layers: Layers };

const PLATFORMS = [
  { name: 'Fiverr', color: '#1DBF73', initial: 'Fi' },
  { name: 'Upwork', color: '#6FDA44', initial: 'Up' },
  { name: 'Direct', color: '#ffedd2', initial: 'DM' },
];

const badgeVariants: Record<string, string> = {
  'Quick Turnaround': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Most Popular': 'text-cream bg-cream/10 border-cream/20',
  'Advanced': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-20 lg:py-28 bg-charcoal relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Services</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            What I <span className="gradient-text">build for you</span>
          </h2>
          <p className="text-ash text-sm font-light max-w-lg mx-auto leading-relaxed">
            From quick bug fixes to full product builds — tailored solutions for startups, agencies, and growing teams.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {SERVICES.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Rocket;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="clay-card p-6 flex flex-col h-full group"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-clay bg-cream/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cream" />
                  </div>
                  <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${badgeVariants[service.badge]}`}>
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl font-black text-white tracking-tight mb-2">{service.title}</h3>
                <p className="text-ash text-sm font-light leading-relaxed mb-6">{service.description}</p>

                {/* Feature list */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 group/item">
                      <div className="w-4 h-4 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-cream/20 transition-colors">
                        <Check className="w-2.5 h-2.5 text-cream" />
                      </div>
                      <span className="text-ash text-xs font-light leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <p className="text-ash text-xs font-light mb-3">{service.price}</p>
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-cream text-sm font-medium hover:gap-3 transition-all"
                    whileHover={{ x: 4 }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Get a Quote →
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-void rounded-clay-lg p-6 sm:p-8 border border-white/[0.06]"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div>
              <p className="text-white font-medium text-sm mb-1">Work with me securely</p>
              <p className="text-ash text-xs font-light">Projects can be handled through established freelance platforms or direct contracts</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
              {PLATFORMS.map((p) => (
                <motion.div
                  key={p.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal border border-white/[0.08] hover:border-cream/20 transition-colors"
                  whileHover={{ y: -2, scale: 1.04 }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
                    style={{ background: p.color, color: '#0d0d0d' }}
                  >
                    {p.initial.charAt(0)}
                  </span>
                  <span className="text-white text-xs font-light">{p.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
