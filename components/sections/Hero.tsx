"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import WorkflowCanvas from "@/components/sections/WorkflowCanvas";
import Link from "next/link";

export default function Hero() {
  const scrollToNext = () => {
    document.querySelector("#stats")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-paper-white py-24 lg:py-0"
    >
      {/* ── Background layer ──────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(197,213,232,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* ─── LEFT COLUMN: Identity & CTAs ─────────────────────── */}
          <div className="flex flex-col justify-center text-left">
            {/* Authentic Engineering Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-bone border border-iron mb-7 self-start shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold text-obsidian uppercase tracking-wider">
                Available for Hire
              </span>
              <span className="text-iron">|</span>
              <span className="text-obsidian/70 text-xs font-medium">
                Full-Stack & AI Engineer
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[2.5rem] sm:text-6xl md:text-7xl xl:text-[4.75rem] font-bold leading-[0.98] tracking-[-0.045em] mb-6 text-obsidian">
              Turning ideas into{" "}
              <span className="underline decoration-iron underline-offset-8">
                products
              </span>{" "}
              <br className="hidden sm:block" />
              that grow <span className="italic font-normal">revenue.</span>
            </h1>

            {/* Identity statement */}
            <p className="text-obsidian/70 text-base sm:text-lg font-normal max-w-md mb-6 leading-relaxed">
              Backend-focused Full-Stack Developer building AI-integrated
              systems and scalable infrastructure for clients worldwide.
            </p>

            {/* What makes me different — three compact pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "Distributed Systems",
                "AI / RAG Pipelines",
                "Deployment Automation",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-teal border border-iron bg-bone"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-teal flex-shrink-0" />
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-obsidian text-paper-white text-sm font-medium hover:bg-deep-teal hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                View Projects
                <span className="inline-block transition-transform duration-200">
                  →
                </span>
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="items-center hidden md:flex gap-2 px-6 py-3 rounded-full border border-iron text-obsidian text-sm font-medium hover:bg-bone hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-obsidian/70" />
                Let&apos;s Talk
              </a>

              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-iron text-obsidian text-sm font-medium hover:bg-bone hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                Resume
              </a>
            </div>

            {/* Social row */}
            <div className="flex items-center gap-4">
              <span className="text-ash/30 text-[11px] sm:text-xs font-light">
                Find me on
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ash/70 text-[11px] sm:text-xs font-light hover:-translate-y-0.5 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </Link>
                <span className="w-px h-3 bg-white/[0.08]" />
                <Link
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ash/70 text-[11px] sm:text-xs font-light hover:-translate-y-0.5 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Workflow Timeline ──────────────────── */}
          <div className="relative lg:pl-4">
            <WorkflowCanvas />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-ash/40 hover:text-ash/70 hover:scale-110 transition-all group"
        aria-label="Scroll down"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="animate-bounce">
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </button>
    </section>
  );
}
