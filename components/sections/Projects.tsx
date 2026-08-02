"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

const categoryColors: Record<string, string> = {
  "Full-Stack Platform": "text-cream bg-cream/10 border-cream/20",
  "AI Infrastructure":
    "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Backend Infrastructure": "text-blue-400 bg-blue-400/10 border-blue-400/20",
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 bg-void relative overflow-hidden"
      ref={ref}
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-mist/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cream/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <p className="section-label">Featured Work</p>
          </motion.div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Projects that <span className="gradient-text">define me</span>
          </h2>
          <p className="text-ash text-[13px] sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
            Selected work from real client engagements and personal builds —
            each solving a distinct technical challenge.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 45 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.15,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="clay-card p-5 sm:p-8 group relative overflow-hidden"
                whileHover={{ y: -4, scale: 1.008 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Top border shine effect on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Left: Project identity */}
                  <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
                    <div>
                      <span
                        className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-full border ${categoryColors[project.category] ?? "text-ash bg-white/5 border-white/10"} mb-3`}
                      >
                        {project.category}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight leading-tight group-hover:text-cream transition-colors duration-300 flex items-center gap-2">
                        {project.name}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 text-cream" />
                      </h3>
                      <p className="text-ash text-[12px] sm:text-sm font-light mt-1.5">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-cream text-void text-[11px] sm:text-xs font-medium hover:bg-cream-dark transition-all shadow-clay-sm"
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Live Demo
                        </motion.a>
                      )}
                      {project.sourceUrl && (
                        <motion.a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] border border-white/[0.08] text-ash text-[11px] sm:text-xs font-light hover:text-white hover:border-cream/20 transition-all"
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <Github className="w-3 h-3" />
                          Source Code
                        </motion.a>
                      )}
                      {!project.liveUrl && !project.sourceUrl && (
                        <span className="text-ash/70 text-[11px] sm:text-xs font-light italic flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cream/30" />
                          Client project (NDA)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Description */}
                    <div className="sm:col-span-3">
                      <p className="text-white/85 text-[13px] sm:text-sm font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Problem */}
                    <motion.div
                      className="p-4 rounded-clay bg-void/80 border border-white/[0.05] hover:border-cream/15 transition-all duration-300"
                      whileHover={{ y: -3, scale: 1.015 }}
                    >
                      <p className="text-cream/60 text-[10px] uppercase tracking-widest font-medium mb-2 flex items-center justify-between">
                        <span>Problem</span>
                        <span className="w-1 h-1 rounded-full bg-cream/40" />
                      </p>
                      <p className="text-ash text-[11px] sm:text-xs font-light leading-relaxed">
                        {project.problem}
                      </p>
                    </motion.div>

                    {/* Contribution */}
                    <motion.div
                      className="p-4 rounded-clay bg-void/80 border border-white/[0.05] hover:border-cream/15 transition-all duration-300"
                      whileHover={{ y: -3, scale: 1.015 }}
                    >
                      <p className="text-cream/60 text-[10px] uppercase tracking-widest font-medium mb-2 flex items-center justify-between">
                        <span>My Role</span>
                        <span className="w-1 h-1 rounded-full bg-cream/40" />
                      </p>
                      <p className="text-ash text-[11px] sm:text-xs font-light leading-relaxed">
                        {project.contribution}
                      </p>
                    </motion.div>

                    {/* Impact */}
                    <motion.div
                      className="p-4 rounded-clay bg-cream/[0.04] border border-cream/10 hover:border-cream/25 transition-all duration-300"
                      whileHover={{ y: -3, scale: 1.015 }}
                    >
                      <p className="text-cream/70 text-[10px] uppercase tracking-widest font-medium mb-2 flex items-center justify-between">
                        <span>Impact</span>
                        <Sparkles className="w-2.5 h-2.5 text-cream/70" />
                      </p>
                      <p className="text-cream text-[11px] sm:text-xs font-light leading-relaxed">
                        {project.impact}
                      </p>
                    </motion.div>

                    {/* Tech stack */}
                    <div className="sm:col-span-3 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            className="text-[11px] font-light text-ash/80 px-2.5 py-1 rounded-md bg-charcoal border border-white/[0.06] hover:text-white hover:border-cream/20 transition-colors cursor-default"
                            whileHover={{ y: -2, scale: 1.04 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/devmilon923"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ash text-sm font-light hover:text-white transition-colors group px-5 py-2.5 rounded-full bg-charcoal border border-white/[0.06] hover:border-cream/20 shadow-clay-sm"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github className="w-4 h-4 text-cream" />
            See more on GitHub
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-cream group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
