"use client";

import {
  Bug,
  Rocket,
  Layers,
  Check,
  MessageSquare,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const icons = { bug: Bug, rocket: Rocket, layers: Layers };

const PLATFORMS = [
  { name: "Fiverr", color: "#1DBF73", initial: "Fi", label: "Secure Payment" },
  {
    name: "Upwork",
    color: "#14A800",
    initial: "Up",
    label: "Escrow Protection",
  },
  {
    name: "Direct Contract",
    color: "#000000",
    initial: "DM",
    label: "Custom Milestones & NDA",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-paper-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="section-label mb-3">Service Packages &amp; Products</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-3 text-balance">
            Production-grade engineering{" "}
            <span className="font-normal text-slate-teal">packages</span>
          </h2>
          <p className="text-obsidian/65 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
            Direct developer execution with zero agency middleman overhead;
            shipped fast and built to scale.
          </p>
        </div>

        {/* ─── Stacked Service Cards ─── */}
        <div className="flex flex-col gap-5 mb-16">
          {SERVICES.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Rocket;
            const isFeatured = service.featured;
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl transition-[border-color,box-shadow] duration-300 font-sans overflow-hidden ${
                  isFeatured
                    ? "bg-bone border border-obsidian/15 shadow-sm hover:shadow-sm"
                    : "bg-paper-white border border-iron/80 hover:border-obsidian/20 hover:shadow-sm"
                }`}
              >
                {/* Featured subtle top accent line */}
                {isFeatured && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-obsidian/40 to-transparent" />
                )}

                <div className="p-6 sm:p-8 lg:p-10">
                  {/* ─── Top Row: Number + Meta + CTA ─── */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    {/* Left: Number + Title Block */}
                    <div className="flex items-start gap-4 sm:gap-5 min-w-0 flex-1">
                      {/* Large editorial number */}
                      <span className="text-obsidian/10 font-sans font-black text-5xl sm:text-6xl leading-none tracking-tighter select-none flex-shrink-0 -mt-1">
                        {num}
                      </span>

                      <div className="min-w-0 flex-1 pt-1">
                        {/* Badges row */}
                        <div className="flex items-center gap-2 flex-wrap mb-2.5">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isFeatured
                                ? "bg-obsidian text-paper-white"
                                : "bg-obsidian/5 text-obsidian/75"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          {isFeatured && (
                            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-obsidian bg-obsidian/8 px-2.5 py-0.5 rounded-full">
                              Most Popular
                            </span>
                          )}

                          <span
                            className={`text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${
                              isFeatured
                                ? "bg-paper-white text-obsidian/80 border-obsidian/15"
                                : "bg-paper-white/80 text-obsidian/70 border-iron"
                            }`}
                          >
                            {service.badge}
                          </span>

                          <span className="text-[10px] font-sans text-obsidian/55 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.turnaround}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-sans text-xl sm:text-2xl font-bold text-obsidian tracking-tight leading-tight mb-1.5">
                          {service.title}
                        </h3>

                        {/* Tagline */}
                        <p className="font-sans text-obsidian/65 text-sm font-normal leading-relaxed max-w-xl">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Right: CTA + Price */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0 sm:pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          document
                            .querySelector("#contact")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`font-sans inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                          isFeatured
                            ? "bg-obsidian text-paper-white hover:bg-deep-teal hover:scale-105 active:scale-95 shadow-sm"
                            : "bg-paper-white border border-obsidian/15 text-obsidian hover:bg-obsidian hover:text-paper-white hover:scale-105 active:scale-95"
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Discuss Scope</span>
                      </button>
                      <div className="text-right">
                        <p className="font-sans text-base sm:text-lg font-bold text-obsidian tracking-tight leading-none">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ─── Deliverables Grid ─── */}
                  <div
                    className={`pt-5 border-t ${
                      isFeatured ? "border-obsidian/10" : "border-iron/80"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {service.features.map((feat) => (
                        <div
                          key={feat.title}
                          className={`p-4 rounded-xl transition-all duration-200 group/feat ${
                            isFeatured
                              ? "bg-paper-white/80 border border-obsidian/8 hover:border-obsidian/20 hover:shadow-2xs"
                              : "bg-bone/50 border border-iron/60 hover:border-obsidian/15 hover:shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-500/12 border border-emerald-600/20 text-emerald-700 flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <p className="font-sans text-obsidian text-xs font-bold leading-snug truncate">
                              {feat.title}
                            </p>
                          </div>
                          <p className="font-sans text-obsidian/60 text-[11px] font-normal leading-relaxed pl-6">
                            {feat.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Bottom Trust & Security Banner ─── */}
        <div className="p-6 sm:p-8 rounded-2xl bg-bone border border-iron/80 flex flex-col md:flex-row items-center gap-6 justify-between font-sans">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
              <ShieldCheck className="w-5 h-5 text-slate-teal flex-shrink-0" />
              <p className="font-sans text-obsidian text-base sm:text-lg font-bold tracking-tight">
                Flexible &amp; Secure Engagement Options
              </p>
            </div>
            <p className="font-sans text-obsidian/65 text-xs sm:text-sm font-normal max-w-md leading-relaxed mx-auto md:mx-0">
              Work directly via custom milestones or execute contracts securely
              through verified platforms with escrow protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-2.5 w-full md:w-auto">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 sm:gap-2.5 px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-full bg-paper-white border border-iron/80 hover:border-obsidian/25 hover:shadow-sm transition-all duration-200 cursor-default shadow-2xs w-full sm:w-auto justify-start sm:justify-center font-sans"
              >
                <span
                  className="w-6 h-6 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-[9px] font-black text-white flex-shrink-0 shadow-2xs"
                  style={{ background: p.color }}
                >
                  {p.initial.charAt(0)}
                </span>
                <div className="text-left min-w-0">
                  <p className="font-sans text-obsidian text-xs font-bold leading-tight truncate">
                    {p.name}
                  </p>
                  <p className="font-sans text-obsidian/60 text-[10px] sm:text-[9px] font-medium leading-tight mt-0.5 truncate">
                    {p.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
