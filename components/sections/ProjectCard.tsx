"use client";

import { useState } from "react";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  TrendingUp,
  Target,
  Layers,
} from "lucide-react";
import { PROJECTS } from "@/lib/constants";

export interface ProjectAccent {
  bg: string;
  border: string;
  kpi: string;
  roi: string;
  dot: string;
}

export interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
  accent: ProjectAccent;
  formatLastUpdated: (date?: string) => string;
}

export default function ProjectCard({
  project,
  index,
  accent,
  formatLastUpdated,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      aria-label={`Project case study: ${project.name}`}
      className={`group relative rounded-2xl border shadow-2xs border-iron/60 shadow-2xs px-5 sm:px-8 py-7 sm:py-9 lg:p-10 transition-all duration-300  hover:shadow-sm hover:border-obsidian/25`}
      style={{ background: accent.bg }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* ── Left Column: Identity & Actions (5 cols) ── */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Top Badges */}
            <div className="flex items-center justify-between gap-2 flex-wrap pb-4 border-b border-obsidian/8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-paper-white/90 text-obsidian border border-iron/60 shadow-2xs backdrop-blur-xs">
                {project.category}
              </span>
              {project.lastUpdated && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-paper-white/90 text-obsidian/90 border border-iron/60 backdrop-blur-xs">
                  <Calendar className="w-3.5 h-3.5 text-slate-teal flex-shrink-0" />
                  <span>{formatLastUpdated(project.lastUpdated)}</span>
                </span>
              )}
            </div>

            {/* Project Title & Subtitle */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian tracking-tight flex items-center justify-between gap-2">
                <span>{project.name}</span>
              </h3>
              <p className="text-slate-teal text-sm font-semibold mt-1.5">
                {project.subtitle}
              </p>
            </div>

            {/* Primary KPI Outcome Box */}
            {project.metricLabel && (
              <div className="rounded-xl p-4 bg-paper-white/80 border border-iron/60 shadow-xs hover:border-obsidian/25 hover:shadow-xs transition-all duration-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-teal">
                  <TrendingUp className="w-4 h-4 flex-shrink-0" />
                  <span>Primary engineering outcome</span>
                </div>
                <p className="text-obsidian text-sm font-bold leading-snug">
                  {project.metricLabel}
                </p>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-obsidian/8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo for ${project.name}`}
                className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-obsidian text-paper-white text-xs font-semibold hover:bg-deep-teal transition-colors duration-200 shadow-sm"
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                <span>Live Demo</span>
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code repository for ${project.name}`}
                className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full border border-obsidian/20 bg-paper-white/90 text-obsidian text-xs font-semibold hover:bg-paper-white hover:border-obsidian/40 transition-colors duration-200 shadow-2xs"
              >
                <Github className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                <span>Source Code</span>
              </a>
            )}
            {!project.liveUrl && !project.sourceUrl && (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper-white/80 border border-obsidian/15 text-obsidian/85 text-xs font-medium backdrop-blur-xs">
                <ShieldAlert
                  className="w-4 h-4 text-emerald-600 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>Client Enterprise NDA</span>
                <span className="sr-only">
                  (Private repository covered under active enterprise
                  non-disclosure agreement)
                </span>
              </span>
            )}
          </div>
        </div>

        {/* ── Right Column: Case Study Content (7 cols) ── */}
        <div className="lg:col-span-7 space-y-4">
          {/* System Architecture Overview */}
          <div className="p-5 rounded-xl bg-paper-white/80 border border-iron/60 shadow-xs backdrop-blur-xs space-y-2.5">
            <div className="flex items-center justify-between gap-2 border-b border-obsidian/8 pb-2.5 overflow-hidden">
              <span className="text-xs font-semibold text-slate-teal flex items-center gap-1.5 whitespace-nowrap min-w-0">
                <CheckCircle2 className="w-4 h-4 text-slate-teal flex-shrink-0" />
                <span className="truncate">System overview</span>
              </span>
              <span className="text-xs text-obsidian/70 font-semibold whitespace-nowrap flex-shrink-0">
                0{index + 1} • Case study
              </span>
            </div>
            <p className="text-obsidian/90 text-xs sm:text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Progressive Disclosure Toggle Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`case-study-details-${project.id}`}
            className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] rounded-xl bg-paper-white/80 border border-iron/60 hover:bg-paper-white hover:border-obsidian/30 text-xs font-semibold text-obsidian/90 transition-colors duration-200 shadow-xs"
          >
            <span className="flex items-center gap-2">
              <span>
                {isExpanded
                  ? "Hide case study breakdown"
                  : "View case study breakdown"}
              </span>
              <span className="text-obsidian/60 font-normal hidden sm:inline">
                (
                {isExpanded
                  ? "Collapse 3 pillars"
                  : "Challenge • Execution • ROI"}
                )
              </span>
            </span>
            <div className="flex items-center gap-1.5 text-slate-teal">
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-paper-white border border-iron/60">
                3 pillars
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              )}
            </div>
          </button>

          {/* 3-Pillar Proof Grid */}
          {isExpanded && (
            <div
              id={`case-study-details-${project.id}`}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-200"
            >
              {/* Challenge */}
              <div className="p-4 rounded-xl bg-paper-white/80 border border-iron/60 shadow-xs hover:border-obsidian/30 transition-colors duration-200 flex flex-col justify-between space-y-2">
                <p className="text-slate-teal text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-slate-teal" />
                    <span>The challenge</span>
                  </span>
                  <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                </p>
                <p className="text-obsidian/85 text-xs leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Execution */}
              <div className="p-4 rounded-xl bg-paper-white/80 border border-iron/60 shadow-xs hover:border-obsidian/30 transition-colors duration-200 flex flex-col justify-between space-y-2">
                <p className="text-slate-teal text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-teal" />
                    <span>Engineering execution</span>
                  </span>
                  <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                </p>
                <p className="text-obsidian/85 text-xs leading-relaxed">
                  {project.contribution}
                </p>
              </div>

              {/* Business ROI */}
              <div
                className={`p-4 rounded-xl border shadow-xs hover:border-obsidian/30 transition-colors duration-200 flex flex-col justify-between space-y-2 ${accent.roi}`}
              >
                <p className="text-slate-teal text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-slate-teal" />
                    <span>Business ROI</span>
                  </span>
                  <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                </p>
                <p className="text-obsidian text-xs font-semibold leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-obsidian/70 mb-2">
              Technologies &amp; Architecture
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs  font-medium text-obsidian/80 px-3 py-1 rounded-full bg-paper-white/90 border border-iron/60 hover:border-obsidian/30 hover:text-obsidian transition-colors cursor-default backdrop-blur-xs shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
