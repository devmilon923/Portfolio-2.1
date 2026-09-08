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
  Sparkles,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import ServiceFeatureCard from "@/components/sections/ServiceFeatureCard";

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
      className="py-20 sm:py-24 lg:py-28 bg-paper-white relative overflow-hidden"
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
                className={`group relative rounded-2xl transition-all duration-300 font-sans overflow-hidden ${
                  isFeatured
                    ? "bg-bone border border-obsidian/25 shadow-sm hover:border-obsidian/40"
                    : "bg-paper-white border border-iron/80 hover:border-obsidian/20 hover:shadow-xs"
                }`}
              >
                <div className="p-6 sm:p-8 lg:p-10">
                  {/* ─── Top Row: Number + Meta + CTA ─── */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    {/* Left: Number + Title Block */}
                    <div className="flex items-start gap-4 sm:gap-5 min-w-0 flex-1">
                      {/* Large editorial number */}
                      <span className="text-obsidian/10 font-sans font-black text-5xl sm:text-6xl leading-none tracking-tighter select-none flex-shrink-0 -mt-1">
                        {num}
                      </span>

                      <div className="min-w-0 flex-1 space-y-3">
                        {/* Badges row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {isFeatured && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-obsidian text-paper-white shadow-2xs">
                              <Sparkles className="w-3.5 h-3.5 text-paper-white" />
                              <span>Most Popular</span>
                            </span>
                          )}

                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap ${
                              isFeatured
                                ? "bg-paper-white text-obsidian border-obsidian/20 shadow-2xs"
                                : "bg-paper-white/90 text-obsidian/90 border-iron/70 shadow-2xs"
                            }`}
                          >
                            {service.badge}
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-paper-white/90 text-obsidian/85 border border-iron/70 shadow-2xs backdrop-blur-xs">
                            <Clock className="w-3.5 h-3.5 text-slate-teal flex-shrink-0" />
                            <span>{service.turnaround}</span>
                          </span>
                        </div>

                        {/* Title Block with Icon Header */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs ${
                              isFeatured
                                ? "bg-obsidian text-paper-white"
                                : "bg-paper-white border border-iron/70 text-obsidian"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-sans text-xl sm:text-2xl font-bold text-obsidian tracking-tight leading-tight">
                            {service.title}
                          </h3>
                        </div>

                        {/* Tagline */}
                        <p className="font-sans text-obsidian/75 text-xs sm:text-sm font-normal leading-relaxed max-w-xl">
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
                        className={`font-sans group/btn inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full text-xs font-semibold transition-colors duration-200 whitespace-nowrap ${
                          isFeatured
                            ? "bg-obsidian text-paper-white hover:bg-deep-teal shadow-sm hover:shadow-md"
                            : "bg-paper-white border border-obsidian/20 text-obsidian hover:bg-obsidian hover:text-paper-white hover:border-obsidian shadow-2xs hover:shadow-sm"
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5" />
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
                        <ServiceFeatureCard
                          key={feat.title}
                          title={feat.title}
                          detail={feat.detail}
                          isFeatured={isFeatured}
                        />
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
                className="flex cursor-pointer items-center gap-3 sm:gap-2.5 px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-full bg-paper-white border border-iron/80 hover:border-obsidian/25 hover:shadow-sm transition-all duration-200 shadow-2xs w-full sm:w-auto justify-start sm:justify-center font-sans"
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
