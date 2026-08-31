"use client";

import { useEffect, useRef, useState } from "react";
import { STATS, CLIENT_COUNTRIES } from "@/lib/constants";
import CountryFlag from "@/components/ui/CountryFlag";

// ── Intersection Observer hook for scroll-triggered animations ──
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Animated counter that only starts when visible ──
function AnimatedCounter({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const steps = 50;
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
  }, [target, active]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// ── Accent color per stat card for visual hierarchy ──
const STAT_ACCENTS = [
  "bg-slate-teal/10 border-slate-teal/25 hover:border-slate-teal/50",
  "bg-desert-clay/15 border-desert-clay/30 hover:border-desert-clay/55",
  "bg-mist-mint/20 border-mist-mint/40 hover:border-mist-mint/65",
  "bg-wisteria/20 border-wisteria/40 hover:border-wisteria/60",
];

const STAT_DOT_COLORS = [
  "bg-slate-teal",
  "bg-saddle-brown",
  "bg-deep-teal",
  "bg-slate-teal",
];

export default function Stats() {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      id="stats"
      className="py-20 lg:py-28 bg-paper-white relative overflow-hidden border-t border-iron/60"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212, 230, 235, 0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 lg:mb-16">
          <p className="section-label mb-3">Impact</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian leading-tight tracking-[-0.045em] text-balance">
            Numbers that <span className="font-normal">matter</span>
          </h2>
          <p className="mt-3 text-obsidian/75 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Real metrics from production systems and client engagements.
          </p>
        </div>

        {/* Stats grid — Bento-style cards with accent tints */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14 lg:mb-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative p-5 sm:p-6 rounded-2xl border hover:-translate-y-1 hover:shadow-sm cursor-default ${STAT_ACCENTS[i % STAT_ACCENTS.length]}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${inView ? i * 80 : 0}ms, transform 0.5s ease ${inView ? i * 80 : 0}ms`,
              }}
            >
              {/* Accent dot */}
              <div
                className={`w-1.5 h-1.5 rounded-full mb-3 ${STAT_DOT_COLORS[i % STAT_DOT_COLORS.length]}`}
              />

              {/* Stat value */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-obsidian mb-1.5 tracking-[-0.045em] leading-none">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  active={inView}
                />
              </div>

              {/* Label */}
              <p className="text-obsidian text-[13px] sm:text-sm font-semibold mb-0.5 leading-snug">
                {stat.label}
              </p>

              {/* Description */}
              <p className="text-obsidian/75 text-[11px] sm:text-xs font-normal leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Country flags — Clean inline strip */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-obsidian/70 text-xs sm:text-sm font-semibold tracking-tight uppercase">
            Trusted by clients across
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {CLIENT_COUNTRIES.map((country) => (
              <div
                key={country.code}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bone/80 border border-iron/80 hover:border-obsidian/30 hover:bg-bone transition-colors duration-200 cursor-default"
              >
                <CountryFlag code={country.code} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="text-obsidian/80 text-[11px] sm:text-xs font-medium group-hover:text-obsidian transition-colors">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
