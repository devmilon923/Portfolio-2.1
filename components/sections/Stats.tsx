"use client";

import { useEffect, useState } from "react";
import { STATS, CLIENT_COUNTRIES } from "@/lib/constants";

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="py-20 lg:py-28 bg-paper-white relative overflow-hidden border-t border-iron"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Impact</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian leading-tight tracking-[-0.045em] text-balance">
            Numbers that <span className="italic font-normal">matter</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-6 text-center rounded-2xl bg-bone border border-iron transition-all hover:border-obsidian hover:-translate-y-1 cursor-default"
            >
              <div className="text-4xl sm:text-6xl font-serif font-bold text-obsidian mb-2 tracking-[-0.045em]">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-obsidian text-sm font-bold mb-1">
                {stat.label}
              </p>
              <p className="text-obsidian/70 text-xs font-normal leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Country flags */}
        <div className="text-center">
          <p className="text-obsidian/70 text-sm font-normal mb-6 tracking-tight">
            Trusted by clients across multiple countries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CLIENT_COUNTRIES.map((country) => (
              <div
                key={country.code}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-bone border border-iron hover:border-obsidian hover:scale-105 hover:-translate-y-0.5 transition-all cursor-default"
              >
                <span
                  className="text-lg leading-none"
                  role="img"
                  aria-label={country.name}
                >
                  {country.flag}
                </span>
                <span className="text-obsidian text-xs font-medium">
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
