'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL } from '@/lib/constants';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL = [
  { icon: Github, href: PERSONAL.github, label: 'GitHub' },
  { icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-charcoal border-t border-white/[0.05] py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-cream flex items-center justify-center shadow-clay-sm">
                <span className="font-display text-void text-sm font-black leading-none">M</span>
              </div>
              <span className="text-white font-medium text-sm tracking-tight">{PERSONAL.name}</span>
            </div>
            <p className="text-ash text-xs font-light max-w-xs leading-relaxed">
              Backend-focused Full-Stack Developer building AI-integrated systems and scalable infrastructure for clients worldwide.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-ash text-xs font-light hover:text-white transition-colors"
                whileHover={{ y: -1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="cream-line mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-ash/50 text-xs font-light">
            &copy; {new Date().getFullYear()} {PERSONAL.name}. Crafted with care.
          </p>

          {/* Social + Scroll top */}
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ash/50 hover:text-cream transition-colors"
                whileHover={{ y: -2, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}

            <span className="w-px h-4 bg-white/[0.08]" />

            <motion.button
              onClick={scrollTop}
              className="w-7 h-7 rounded-lg bg-void border border-white/[0.08] flex items-center justify-center text-ash hover:text-cream hover:border-cream/20 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
