"use client";

import { STATS, CLIENT_COUNTRIES } from "@/lib/constants";
import { Globe2, TrendingUp, ShieldCheck, Cpu } from "lucide-react";

const STAT_ICONS = [ShieldCheck, Cpu, TrendingUp, Globe2];

export default function Stats() {
  return (
    <section
      id="stats"
      className="py-16 sm:py-20 lg:py-24 bg-bone relative border-t border-b border-iron"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="section-label mb-3">Proven Metrics</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-4 text-balance">
            Engineered for <span className="font-normal">impact & scale</span>
          </h2>
          <p className="text-obsidian/75 text-base sm:text-lg font-normal max-w-lg mx-auto leading-relaxed">
            Quantifiable results from production software builds, database
            optimizations, and global client deliverables.
          </p>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {STATS.map((stat, index) => {
            const Icon = STAT_ICONS[index % STAT_ICONS.length];
            const displayVal =
              stat.value === 1.8 ? "2~" : `${stat.value}${stat.suffix}`;

            return (
              <div
                key={stat.label}
                className="bg-paper-white border border-iron rounded-2xl p-6 flex flex-col justify-between hover:border-obsidian hover:shadow-sm transition-all duration-300 shadow-2xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-obsidian tracking-tight group-hover:text-slate-teal transition-colors duration-200">
                      {displayVal}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-sandstone flex items-center justify-center border border-iron/80">
                      <Icon className="w-4 h-4 text-slate-teal" />
                    </div>
                  </div>
                  <h3 className="text-obsidian text-base font-bold mb-1 tracking-tight">
                    {stat.label}
                  </h3>
                  <p className="text-obsidian/65 text-xs sm:text-sm font-normal leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Reach Trust Bar */}
        <div className="border-t border-iron/70  flex flex-col md:flex-row items-center justify-between gap-4 bg-paper-white/60 rounded-2xl p-5 border">
          <div className="flex items-center gap-2.5">
            <Globe2 className="w-4 h-4 text-slate-teal" />
            <span className="text-obsidian/80 text-xs sm:text-sm font-semibold">
              Client Reach Across 5+ Countries:
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {CLIENT_COUNTRIES.map((country) => (
              <span
                key={country.code}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sandstone border border-iron text-xs font-medium text-obsidian shadow-2xs hover:border-obsidian transition-colors duration-200"
              >
                <span
                  className="text-sm leading-none"
                  role="img"
                  aria-label={country.name}
                >
                  {country.flag}
                </span>
                <span>{country.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
