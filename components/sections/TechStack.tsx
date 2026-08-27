"use client";

import { useState } from "react";
import { TECH_STACK, TECH_CATEGORIES } from "@/lib/constants";

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = TECH_STACK.filter(
    (t) => activeCategory === "all" || t.category === activeCategory,
  );

  return (
    <section
      id="stack"
      className="py-20 lg:py-28 bg-deep-teal text-paper-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-slate-teal font-medium text-xs uppercase tracking-wider mb-3">
            Tech Stack
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paper-white tracking-[-0.045em] mb-4">
            Tools of the <span className=" font-normal">craft</span>
          </h2>
          <p className="text-paper-white/70 text-base sm:text-lg font-normal max-w-md mx-auto leading-relaxed">
            Technologies I use daily to build, ship, and scale production
            applications.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                activeCategory === cat.id
                  ? "bg-paper-white text-obsidian font-bold shadow-sm"
                  : "text-paper-white/70 hover:text-paper-white border border-paper-white/20"
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((tech) => (
            <div
              key={tech.name}
              className="p-5 rounded-2xl bg-paper-white/5 border border-paper-white/10 flex flex-col items-center text-center gap-2 cursor-default hover:bg-slate-teal/30 hover:border-slate-teal hover:-translate-y-1 hover:scale-[1.02] transition-all duration-250"
            >
              <div className="w-10 h-10 rounded-full bg-paper-white/10 flex items-center justify-center">
                <span
                  className="text-base font-bold text-paper-white leading-none"
                  aria-label={tech.name}
                >
                  {tech.name.charAt(0)}
                </span>
              </div>

              <div>
                <p className="text-paper-white text-sm font-bold tracking-tight">
                  {tech.name}
                </p>
                <p className="text-slate-teal text-[11px] font-medium mt-0.5 capitalize">
                  {tech.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 flex flex-wrap gap-8 sm:gap-12 justify-center border-t border-paper-white/10 pt-10">
          {[
            { label: "Technologies", value: TECH_STACK.length + "+" },
            {
              label: "Frontend",
              value: TECH_STACK.filter((t) => t.category === "frontend").length,
            },
            {
              label: "Backend",
              value: TECH_STACK.filter((t) => t.category === "backend").length,
            },
            {
              label: "DevOps Tools",
              value: TECH_STACK.filter((t) => t.category === "deployment")
                .length,
            },
          ].map((item) => (
            <div key={item.label} className="text-center min-w-[100px]">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-paper-white tracking-[-0.045em]">
                {item.value}
              </p>
              <p className="text-slate-teal text-xs sm:text-sm font-medium mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
