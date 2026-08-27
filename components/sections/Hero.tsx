"use client";

import { ArrowDown, Github, Linkedin, Mail, Sparkles, Star } from "lucide-react";
import { PERSONAL, CLIENT_COUNTRIES } from "@/lib/constants";
import CountryFlag from "@/components/ui/CountryFlag";
import WorkflowCanvas from "@/components/sections/WorkflowCanvas";
import Link from "next/link";

export default function Hero() {
  const scrollToNext = () => {
    document.querySelector("#stats")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-paper-white py-20 lg:py-0"
    >
      {/* ── Background Atmosphere & Ambient Warmth ────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft warm parchment ambient aura matching WorkflowCanvas paper */}
        <div
          className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(244, 237, 224, 0.85) 0%, rgba(245, 236, 229, 0.4) 55%, transparent 80%)",
          }}
        />
        {/* Subtle secondary teal aura for balance */}
        <div
          className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(197, 213, 232, 0.5) 0%, transparent 70%)",
          }}
        />
        {/* Faint architectural line accent */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035] stroke-obsidian"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* ── Main Content Container ───────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)] py-12 lg:py-0">
          
          {/* ─── LEFT COLUMN: Identity, Headline & Action (7 cols) ──── */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left pr-0 lg:pr-4">
            
            {/* ── Trust Strip — Rating + Timezone + Flag Avatar Stack ── */}
            <div className="flex items-center flex-wrap gap-y-2 mb-6 self-start">
              {/* Proof Point: Rating */}
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 flex-shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-obsidian tracking-tight whitespace-nowrap">
                  5.0 Rated
                </span>
              </div>

              <span className="w-px h-3.5 bg-iron/50 mx-2.5 sm:mx-3.5 flex-shrink-0" aria-hidden="true" />

              {/* Proof Point: Timezone */}
              <span className="text-xs sm:text-[13px] text-obsidian/70 font-medium whitespace-nowrap">
                GMT+6 · Flexible
              </span>

              <span className="w-px h-3.5 bg-iron/50 mx-2.5 sm:mx-3.5 flex-shrink-0" aria-hidden="true" />

              {/* Overlapping Flag Avatar Stack + Count */}
              <div className="flex items-center -space-x-1.5">
                {CLIENT_COUNTRIES.map((country) => (
                  <div
                    key={country.code}
                    className="relative rounded-full ring-[1.5px] ring-paper-white transition-transform duration-200 hover:z-10 hover:scale-110 cursor-default"
                    title={country.name}
                  >
                    <CountryFlag code={country.code} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                  </div>
                ))}
                {/* +N Overflow Count Circle */}
                <div className="relative flex items-center justify-center w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-full bg-bone border border-iron/80 ring-[1.5px] ring-paper-white cursor-default" title="7+ clients worldwide">
                  <span className="text-[8px] sm:text-[9px] font-semibold text-obsidian/70 leading-none select-none">
                    7+
                  </span>
                </div>
              </div>
            </div>

            {/* Main Headline - Concise & Punchy 2-3 Lines */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-[-0.035em] mb-5 text-obsidian">
              Building web apps &amp; AI systems that{" "}
              <span className="font-bold text-slate-teal">scale.</span>
            </h1>

            <p className="text-obsidian/75 text-base sm:text-lg font-normal max-w-lg mb-6 leading-relaxed">
              Full-stack developer building high-performance SaaS platforms &amp; AI workflows with production reliability. From SaaS apps to complex backends, I turn specs into launch-ready software.
            </p>

            {/* Core Capabilities - Crisp Minimal Pills */}
            <div className="flex flex-wrap gap-2 mb-7 w-full sm:w-auto">
              <span className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-obsidian border border-iron/90 bg-bone/80 shadow-2xs hover:border-obsidian/40 hover:bg-bone transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-teal flex-shrink-0" />
                Full-Stack SaaS
              </span>
              <span className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-obsidian border border-iron/90 bg-bone/80 shadow-2xs hover:border-obsidian/40 hover:bg-bone transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-teal flex-shrink-0" />
                AI &amp; RAG Systems
              </span>
              <span className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-obsidian border border-iron/90 bg-bone/80 shadow-2xs hover:border-obsidian/40 hover:bg-bone transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-teal flex-shrink-0" />
                High-Speed APIs
              </span>
            </div>

            {/* CTAs Row - Direct WhatsApp DM + Contact Triggers */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 mb-7 sm:mb-9 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-obsidian text-paper-white text-xs sm:text-sm font-semibold hover:bg-deep-teal hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-sm w-full sm:w-auto"
              >
                <span>View Projects</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
                <a
                  href={PERSONAL.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full border border-emerald-600/30 bg-emerald-500/10 text-emerald-950 text-xs sm:text-sm font-semibold hover:bg-emerald-500/20 hover:border-emerald-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-2xs w-full sm:w-auto"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Direct WhatsApp</span>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-full border border-iron/90 bg-paper-white text-obsidian text-xs sm:text-sm font-medium hover:bg-bone hover:border-obsidian/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-2xs w-full sm:w-auto"
                >
                  <Mail className="w-3.5 h-3.5 text-obsidian/70" />
                  <span>Let&apos;s Talk</span>
                </a>
              </div>
            </div>

            {/* Social Row - Center Aligned on Mobile */}
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-3 border-t border-iron/40 w-full flex-wrap sm:flex-nowrap">
              <span className="text-obsidian/50 text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                Connect
              </span>
              <div className="flex items-center gap-3 sm:gap-4">
                <Link
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-obsidian/80 text-xs font-medium hover:text-obsidian hover:-translate-y-0.5 transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-obsidian/70" />
                  GitHub
                </Link>
                <span className="w-px h-3.5 bg-iron" />
                <Link
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-obsidian/80 text-xs font-medium hover:text-obsidian hover:-translate-y-0.5 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-slate-teal" />
                  LinkedIn
                </Link>
                <span className="w-px h-3.5 bg-iron" />
                <a
                  href={PERSONAL.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-obsidian/80 text-xs font-medium hover:text-obsidian hover:-translate-y-0.5 transition-all"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Workflow Canvas Notepad Card (5 cols) ── */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Subtle organic shadow backing to lift WorkflowCanvas gracefully */}
            <div className="relative w-full max-w-lg transition-transform duration-300 hover:scale-[1.01]">
              {/* Paper shadow illusion behind notepad */}
              <div 
                className="absolute inset-0 translate-x-2 translate-y-3 rounded-lg bg-stone/30 opacity-70 blur-md pointer-events-none"
                aria-hidden
              />
              <WorkflowCanvas />
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────── */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-obsidian/40 hover:text-obsidian hover:scale-110 transition-all group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-semibold">
          Scroll
        </span>
        <div className="animate-bounce">
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </button>
    </section>
  );
}
