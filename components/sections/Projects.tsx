'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';

const categoryColors: Record<string, string> = {
  'Full-Stack Platform': 'text-cream bg-cream/10 border-cream/20',
  'AI Infrastructure': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Backend Infrastructure': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 lg:py-28 bg-void relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Featured Work</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Projects that <span className="gradient-text">define me</span>
          </h2>
          <p className="text-ash text-sm font-light max-w-lg mx-auto leading-relaxed">
            Selected work from real client engagements and personal builds — each solving a distinct technical challenge.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="clay-card p-6 sm:p-8 group"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Left: Project identity */}
                  <div className="lg:col-span-1 space-y-4">
                    <div>
                      <span className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-full border ${categoryColors[project.category] ?? 'text-ash bg-white/5 border-white/10'} mb-3`}>
                        {project.category}
                      </span>
                      <h3 className="font-display text-2xl font-black text-white tracking-tight leading-tight">
                        {project.name}
                      </h3>
                      <p className="text-ash text-sm font-light mt-1">{project.subtitle}</p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-cream text-void text-xs font-medium hover:bg-cream-dark transition-colors shadow-clay-sm"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
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
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-white/[0.08] text-ash text-xs font-light hover:text-white hover:border-cream/20 transition-colors"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Github className="w-3 h-3" />
                          Source Code
                        </motion.a>
                      )}
                      {!project.liveUrl && !project.sourceUrl && (
                        <span className="text-ash/50 text-xs font-light italic">Client project (NDA)</span>
                      )}
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Description */}
                    <div className="sm:col-span-3">
                      <p className="text-white/80 text-sm font-light leading-relaxed">{project.description}</p>
                    </div>

                    {/* Problem */}
                    <div className="p-4 rounded-clay bg-void border border-white/[0.05] hover:border-cream/10 transition-colors">
                      <p className="text-cream/60 text-[10px] uppercase tracking-widest font-medium mb-2">Problem</p>
                      <p className="text-ash text-xs font-light leading-relaxed">{project.problem}</p>
                    </div>

                    {/* Contribution */}
                    <div className="p-4 rounded-clay bg-void border border-white/[0.05] hover:border-cream/10 transition-colors">
                      <p className="text-cream/60 text-[10px] uppercase tracking-widest font-medium mb-2">My Role</p>
                      <p className="text-ash text-xs font-light leading-relaxed">{project.contribution}</p>
                    </div>

                    {/* Impact */}
                    <div className="p-4 rounded-clay bg-cream/[0.04] border border-cream/10 hover:border-cream/20 transition-colors">
                      <p className="text-cream/60 text-[10px] uppercase tracking-widest font-medium mb-2">Impact</p>
                      <p className="text-cream text-xs font-light leading-relaxed">{project.impact}</p>
                    </div>

                    {/* Tech stack */}
                    <div className="sm:col-span-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-light text-ash px-2 py-1 rounded-md bg-charcoal border border-white/[0.06]"
                          >
                            {tech}
                          </span>
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
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/devmilon923"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ash text-sm font-light hover:text-white transition-colors group"
            whileHover={{ x: 3 }}
          >
            <Github className="w-4 h-4" />
            See more on GitHub
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-cream transition-colors" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
