"use client";

import { Bug, Rocket, Layers, Check, MessageSquare, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const icons = { bug: Bug, rocket: Rocket, layers: Layers };

const PLATFORMS = [
  { name: "Fiverr", color: "#1DBF73", initial: "Fi", label: "Secure Payment" },
  { name: "Upwork", color: "#14A800", initial: "Up", label: "Escrow Protection" },
  { name: "Direct Contract", color: "#000000", initial: "DM", label: "Custom Milestones & NDA" },
];

const SERVICE_ACCENTS = [
  {
    bg: "linear-gradient(135deg, rgba(212,230,235,0.2) 0%, rgba(255,255,255,0.7) 60%, rgba(212,230,235,0.12) 100%)",
    border: "border-mist-mint/40 hover:border-mist-mint/70",
    iconBg: "bg-mist-mint/35 border-mist-mint/50",
    checkBg: "bg-mist-mint/30 text-deep-teal border-mist-mint/50",
    badgeBg: "bg-mist-mint/25 text-deep-teal border-mist-mint/40",
  },
  {
    bg: "linear-gradient(135deg, rgba(231,211,191,0.22) 0%, rgba(255,255,255,0.85) 60%, rgba(245,236,229,0.15) 100%)",
    border: "border-desert-clay/40 hover:border-desert-clay/70",
    iconBg: "bg-desert-clay/35 border-desert-clay/50",
    checkBg: "bg-desert-clay/30 text-saddle-brown border-desert-clay/50",
    badgeBg: "bg-desert-clay/25 text-saddle-brown border-desert-clay/40",
  },
  {
    bg: "linear-gradient(135deg, rgba(239,229,249,0.22) 0%, rgba(255,255,255,0.7) 60%, rgba(239,229,249,0.12) 100%)",
    border: "border-wisteria/40 hover:border-wisteria/70",
    iconBg: "bg-wisteria/35 border-wisteria/50",
    checkBg: "bg-wisteria/30 text-slate-teal border-wisteria/50",
    badgeBg: "bg-wisteria/25 text-slate-teal border-wisteria/40",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-paper-white relative overflow-hidden"
    >
      {/* Subtle ambient background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] right-[10%] w-[550px] h-[550px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212, 230, 235, 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[5%] w-[450px] h-[450px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239, 229, 249, 0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Service Section Subtitle Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="section-label mb-3">Service Packages &amp; Products</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-3 text-balance">
            Production-grade engineering <span className="font-normal text-slate-teal">packages</span>
          </h2>
          <p className="text-obsidian/55 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
            Direct developer execution with zero agency middleman overhead; shipped fast and built to scale.
          </p>
        </div>

        {/* Product Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 items-stretch">
          {SERVICES.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Rocket;
            const isFeatured = service.featured;
            const accent = SERVICE_ACCENTS[index % SERVICE_ACCENTS.length];

            return (
              <div
                key={service.id}
                className={`group p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full transition-all duration-300 relative border shadow-sm hover:shadow-md hover:-translate-y-1 ${
                  isFeatured
                    ? "ring-2 ring-obsidian/20 border-obsidian/40"
                    : accent.border
                }`}
                style={{ background: accent.bg }}
              >
                {/* Featured Ribbon Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-obsidian text-paper-white text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap z-20">
                    <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                {/* Top Section */}
                <div>
                  {/* Category & Turnaround Header Bar */}
                  <div className="flex items-center justify-between gap-2 mb-6 pt-1">
                    <div className={`w-11 h-11 rounded-xl ${accent.iconBg} border flex items-center justify-center shadow-2xs flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                      <Icon className="w-5 h-5 text-obsidian/85" />
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border whitespace-nowrap leading-none ${accent.badgeBg}`}>
                        {service.badge}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-paper-white/80 text-obsidian/80 border border-iron/60 whitespace-nowrap leading-none flex items-center gap-1 backdrop-blur-xs">
                        <Clock className="w-3 h-3 text-slate-teal" />
                        <span>{service.turnaround}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-obsidian tracking-[-0.035em] mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-obsidian/75 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                    {service.tagline}
                  </p>

                  {/* Product Deliverables List */}
                  <div className="pt-5 border-t border-obsidian/8 mb-8">
                    <p className="text-[10px] font-mono font-bold text-slate-teal uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-teal" />
                      <span>Key Deliverables &amp; Specs</span>
                    </p>
                    <ul className="space-y-3.5">
                      {service.features.map((feat) => (
                        <li key={feat.title} className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full ${accent.checkBg} flex items-center justify-center flex-shrink-0 mt-0.5 border shadow-2xs`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-obsidian text-xs font-bold leading-tight">
                              {feat.title}
                            </p>
                            <p className="text-obsidian/75 text-[11px] font-normal leading-relaxed">
                              {feat.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & CTA Footer */}
                <div className="pt-4 border-t border-obsidian/8 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-obsidian text-sm sm:text-base font-serif font-bold">
                      {service.price}
                    </p>
                    <p className="text-obsidian/70 text-[10px] font-medium">
                      Direct Developer Guarantee
                    </p>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-2xs ${
                      isFeatured
                        ? "bg-obsidian text-paper-white hover:bg-deep-teal hover:scale-105 active:scale-95 shadow-sm"
                        : "bg-paper-white/80 border border-obsidian/15 text-obsidian hover:bg-paper-white hover:border-obsidian/40 hover:scale-105 active:scale-95 backdrop-blur-xs"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Discuss Scope</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Security Banner */}
        <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-sandstone/80 via-paper-white/90 to-sandstone/80 border border-iron/80 shadow-2xs flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <ShieldCheck className="w-4.5 h-4.5 text-slate-teal flex-shrink-0" />
              <p className="text-obsidian font-serif text-base sm:text-lg font-bold">
                Flexible &amp; Secure Engagement Options
              </p>
            </div>
            <p className="text-obsidian/75 text-xs font-normal max-w-md mx-auto md:mx-0">
              Work directly via custom milestones or execute contracts securely through verified platforms with escrow protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-2.5 w-full md:w-auto">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 sm:gap-2.5 px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-full bg-paper-white border border-iron/70 hover:border-obsidian/30 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 cursor-default shadow-2xs w-full sm:w-auto justify-start sm:justify-center"
              >
                <span
                  className="w-6 h-6 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-[9px] font-black text-white flex-shrink-0 shadow-2xs"
                  style={{ background: p.color }}
                >
                  {p.initial.charAt(0)}
                </span>
                <div className="text-left min-w-0">
                  <p className="text-obsidian text-xs font-bold leading-tight truncate">
                    {p.name}
                  </p>
                  <p className="text-obsidian/70 text-[10px] sm:text-[9px] font-medium leading-tight mt-0.5 truncate">
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
