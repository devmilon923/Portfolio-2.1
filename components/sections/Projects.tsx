"use client";

import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import GithubCTAButton from "@/components/sections/GithubCTAButton";

// Soft gradient per project card
const PROJECT_GRADIENTS = [
  {
    bg: "linear-gradient(135deg, rgba(212,230,235,0.18) 0%, rgba(255,255,255,0.6) 50%, rgba(212,230,235,0.10) 100%)",
    border: "border-mist-mint/30 hover:border-mist-mint/50",
    kpi: "bg-mist-mint/15 border-mist-mint/25",
    roi: "bg-mist-mint/20 border-mist-mint/30",
    dot: "bg-deep-teal",
  },
  {
    bg: "linear-gradient(135deg, rgba(231,211,191,0.18) 0%, rgba(255,255,255,0.6) 50%, rgba(245,236,229,0.12) 100%)",
    border: "border-desert-clay/25 hover:border-desert-clay/45",
    kpi: "bg-desert-clay/12 border-desert-clay/22",
    roi: "bg-desert-clay/18 border-desert-clay/28",
    dot: "bg-saddle-brown",
  },
  {
    bg: "linear-gradient(135deg, rgba(239,229,249,0.18) 0%, rgba(255,255,255,0.6) 50%, rgba(239,229,249,0.10) 100%)",
    border: "border-wisteria/25 hover:border-wisteria/45",
    kpi: "bg-wisteria/15 border-wisteria/22",
    roi: "bg-wisteria/20 border-wisteria/28",
    dot: "bg-slate-teal",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 lg:py-28 bg-paper-white relative overflow-hidden"
    >
      {/* Subtle background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212, 230, 235, 0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239, 229, 249, 0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="section-label mb-3">Featured Proof Of Work</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-3 text-balance">
            Engineered for scale &amp;{" "}
            <span className="font-normal text-slate-teal">business ROI</span>
          </h2>
          <p className="text-obsidian/75 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
            Real production case studies demonstrating backend architecture, AI
            memory systems, and measurable performance results.
          </p>
        </div>

        {/* Projects Cards List */}
        <div className="space-y-10">
          {PROJECTS.map((project, index) => {
            const accent = PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length];
            return (
              <div
                key={project.id}
                className={`rounded-2xl border px-4 sm:px-8 py-6 sm:py-8 lg:p-10 transition-all duration-300 shadow-sm hover:shadow-md ${accent.border}`}
                style={{ background: accent.bg }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                  {/* ── Left Column: Identity & Actions (5 cols) ── */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 flex-wrap pb-4 border-b border-obsidian/8">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-paper-white/80 text-obsidian border border-iron/50 uppercase tracking-wider backdrop-blur-xs">
                          {project.category}
                        </span>
                        {project.metrics && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-600/20 text-emerald-950">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            {project.metrics}
                          </span>
                        )}
                      </div>

                      {/* Project Title & Subtitle */}
                      <div>
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-obsidian tracking-[-0.035em] flex items-center justify-between gap-2">
                          <span>{project.name}</span>
                          <ArrowUpRight className="w-5 h-5 text-obsidian/20 flex-shrink-0" />
                        </h3>
                        <p className="text-slate-teal text-xs sm:text-sm font-semibold mt-1.5">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Primary KPI Box */}
                      {project.metricLabel && (
                        <div
                          className={`p-3.5 rounded-xl border space-y-1 ${accent.kpi}`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-teal">
                              Primary Engineering Outcome
                            </p>
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${accent.dot}`}
                            />
                          </div>
                          <p className="text-obsidian text-sm font-bold leading-snug">
                            {project.metricLabel}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap gap-2.5 pt-4 border-t border-obsidian/8">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-obsidian text-paper-white text-xs font-semibold hover:bg-deep-teal hover:scale-[1.03] active:scale-95 transition-transform shadow-sm flex-1 text-center"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-obsidian/12 bg-paper-white/70 text-obsidian text-xs font-semibold hover:bg-paper-white hover:border-obsidian/25 hover:scale-[1.03] active:scale-95 transition-transform backdrop-blur-xs flex-1 text-center"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                      {!project.liveUrl && !project.sourceUrl && (
                        <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-paper-white/60 border border-obsidian/8 text-obsidian/60 text-xs font-medium w-full backdrop-blur-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Client Enterprise NDA</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Right Column: Case Study Content (7 cols) ── */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* System Architecture Overview */}
                    <div className="p-5 rounded-xl bg-paper-white/60 border border-obsidian/6 backdrop-blur-xs">
                      <div className="flex items-center justify-between gap-2 mb-3 border-b border-obsidian/6 pb-2.5 overflow-hidden">
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-teal uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap min-w-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-teal flex-shrink-0" />
                          <span className="truncate">System Overview</span>
                        </span>
                        <span className="text-[10px] text-obsidian/60 font-semibold font-mono whitespace-nowrap flex-shrink-0">
                          0{index + 1} • CASE STUDY
                        </span>
                      </div>
                      <p className="text-obsidian/75 text-xs sm:text-sm font-normal leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* 3-Pillar Proof Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Challenge */}
                      <div className="p-4 rounded-xl bg-paper-white/50 border border-obsidian/6 backdrop-blur-xs hover:-translate-y-0.5 transition-transform duration-200">
                        <p className="text-slate-teal text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>The Challenge</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${accent.dot}`}
                          />
                        </p>
                        <p className="text-obsidian/65 text-xs font-normal leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Execution */}
                      <div className="p-4 rounded-xl bg-paper-white/50 border border-obsidian/6 backdrop-blur-xs hover:-translate-y-0.5 transition-transform duration-200">
                        <p className="text-slate-teal text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>Engineering Execution</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${accent.dot}`}
                          />
                        </p>
                        <p className="text-obsidian/65 text-xs font-normal leading-relaxed">
                          {project.contribution}
                        </p>
                      </div>

                      {/* Business ROI */}
                      <div
                        className={`p-4 rounded-xl border backdrop-blur-xs hover:-translate-y-0.5 transition-transform duration-200 ${accent.roi}`}
                      >
                        <p className="text-slate-teal text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>Business ROI</span>
                          <Sparkles className="w-3 h-3 text-slate-teal" />
                        </p>
                        <p className="text-obsidian text-xs font-semibold leading-relaxed">
                          {project.impact}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono font-medium text-obsidian/45 px-2.5 py-0.5 rounded-full bg-paper-white/70 border border-obsidian/8 hover:border-obsidian/20 hover:text-obsidian/65 transition-colors cursor-default backdrop-blur-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <GithubCTAButton />
      </div>
    </section>
  );
}
