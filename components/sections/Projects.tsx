"use client";

import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import Link from "next/link";

import GithubCTAButton from "@/components/sections/GithubCTAButton";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 lg:py-28 bg-paper-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <p className="section-label">Featured Work</p>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-4">
            Projects that <span className="italic font-normal">define me</span>
          </h2>
          <p className="text-obsidian/70 text-base sm:text-lg font-normal max-w-lg mx-auto leading-relaxed">
            Selected work from real client engagements and personal builds —
            each solving a distinct technical challenge.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-10">
          {PROJECTS.map((project, index) => (
            <div key={project.id}>
              <div className="bg-bone border border-iron rounded-[32px] p-6 sm:p-10 transition-all duration-300 hover:border-obsidian">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: Project identity */}
                  <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-sandstone border border-iron text-slate-teal mb-3">
                        {project.category}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian tracking-[-0.03em] flex items-center gap-2">
                        {project.name}
                        <ArrowUpRight className="w-5 h-5 text-slate-teal" />
                      </h3>
                      <p className="text-obsidian/70 text-sm font-normal mt-2">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-obsidian text-paper-white text-xs font-medium hover:bg-deep-teal hover:scale-105 active:scale-95 transition-all shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-iron text-obsidian text-xs font-medium hover:bg-sandstone hover:scale-105 active:scale-95 transition-all"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Source Code
                        </a>
                      )}
                      {!project.liveUrl && !project.sourceUrl && (
                        <span className="text-obsidian/60 text-xs font-normal italic flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-teal" />
                          Client project (NDA)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Description Header Box */}
                    <div className="sm:col-span-3 p-4 sm:p-5 rounded-2xl bg-paper-white border border-iron shadow-xs relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2.5 border-b border-iron/50 pb-2">
                        <span className="text-[10px] font-mono font-bold text-slate-teal uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-teal animate-pulse" />
                          System Architecture Overview
                        </span>
                        <span className="text-[10px] font-mono text-obsidian/50 font-medium">
                          0{index + 1} // SPECIFICATION
                        </span>
                      </div>
                      <p className="text-obsidian text-sm sm:text-base font-normal leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Problem */}
                    <div className="p-4 rounded-2xl bg-sandstone border border-iron">
                      <p className="text-slate-teal text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Problem</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-teal" />
                      </p>
                      <p className="text-obsidian/80 text-xs font-normal leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* Contribution */}
                    <div className="p-4 rounded-2xl bg-sandstone border border-iron">
                      <p className="text-slate-teal text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>My Role</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-teal" />
                      </p>
                      <p className="text-obsidian/80 text-xs font-normal leading-relaxed">
                        {project.contribution}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="p-4 rounded-2xl bg-dusty-sky/50 border border-iron">
                      <p className="text-obsidian text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Impact</span>
                        <Sparkles className="w-3 h-3 text-obsidian" />
                      </p>
                      <p className="text-obsidian text-xs font-medium leading-relaxed">
                        {project.impact}
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div className="sm:col-span-3 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium text-obsidian px-3 py-1 rounded-full bg-paper-white border border-iron"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <GithubCTAButton />
      </div>
    </section>
  );
}
