"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import WorkflowCanvas from "@/components/sections/WorkflowCanvas";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.65, ease: "easeOut" as const },
    },
  };
}

export default function Hero() {
  const scrollToNext = () => {
    document.querySelector("#stats")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-void py-24 lg:py-0"
    >
      {/* ── Background layer ──────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Warm mist bloom — left-biased to counterweight the right panel */}
        <div
          className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(91,124,153,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Blueprint dot grid — very subtle */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,237,210,0.6) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Thin horizontal rule at viewport center */}
        <div
          className="absolute top-1/2 left-0 right-0 h-px opacity-[0.04]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,237,210,0.6) 40%, rgba(255,237,210,0.6) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* ─── LEFT COLUMN: Identity & CTAs ─────────────────────── */}
          <div className="flex flex-col justify-center text-left">
            {/* Status pill */}
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal border border-cream/10 mb-7 self-start"
            >
              <span className="glow-dot" />
              <span className="text-cream text-xs font-light tracking-wide">
                Open to freelance projects
              </span>
              <Sparkles className="w-3 h-3 text-cream opacity-50" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="font-display text-[2.6rem] sm:text-5xl md:text-6xl xl:text-[4.25rem] font-black leading-[1.06] tracking-tight mb-5 text-white"
            >
              I build systems
              <br />
              that <span className="gradient-text">outlast</span> the{" "}
              <br className="hidden sm:block" />
              <span className="gradient-text">deadline.</span>
            </motion.h1>

            {/* Sub-headline */}

            {/* Identity statement */}
            <motion.p
              {...fadeUp(0.38)}
              className="text-ash/60 text-sm font-light max-w-md mb-7 leading-relaxed"
            >
              Backend-focused Full-Stack Developer building AI-integrated
              systems and scalable infrastructure for clients worldwide.
            </motion.p>

            {/* What makes me different — three compact pills */}
            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-2 mb-8">
              {[
                "Distributed Systems",
                "AI / RAG Pipelines",
                "Deployment Automation",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wide text-ash/60 border border-white/[0.07] bg-white/[0.025]"
                >
                  <span className="w-1 h-1 rounded-full bg-cream/30 flex-shrink-0" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.52)}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-[12px] bg-cream text-void text-sm font-medium shadow-clay-cream hover:shadow-clay-hover transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-[12px] border border-white/[0.08] text-white text-sm font-light hover:bg-white/[0.03] hover:border-cream/20 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="w-4 h-4 text-ash" />
                Let&apos;s Talk
              </motion.a>

              <motion.a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-[12px] border border-white/[0.08] text-ash text-sm font-light hover:bg-white/[0.03] hover:text-white hover:border-cream/20 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Resume
              </motion.a>
            </motion.div>

            {/* Social row */}
            <motion.div {...fadeUp(0.6)} className="flex items-center gap-4">
              <span className="text-ash/30 text-xs font-light">Find me on</span>
              <div className="flex items-center gap-3">
                <motion.a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ash/60 hover:text-white text-xs font-light transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </motion.a>
                <span className="w-px h-3 bg-white/[0.08]" />
                <motion.a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ash/60 hover:text-white text-xs font-light transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN: Workflow Timeline ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="w-full relative"
          >
            {/* Glass card frame */}
            <div
              className="relative rounded-[22px] overflow-hidden p-6 sm:p-7"
              style={{
                background:
                  "linear-gradient(135deg, rgba(31,31,31,0.6) 0%, rgba(13,13,13,0.5) 100%)",
                border: "1px solid rgba(255,237,210,0.06)",
                boxShadow:
                  "0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,237,210,0.04)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Faint corner accent lines — blueprint feel */}
              <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-cream/10 rounded-tl-sm pointer-events-none" />
              <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-cream/10 rounded-br-sm pointer-events-none" />

              <WorkflowCanvas />
            </div>

            {/* Subtle radial glow behind the card */}
            <div
              className="absolute -inset-8 -z-10 rounded-full opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 50%, rgba(91,124,153,0.12) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-ash/30 hover:text-ash/60 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll down"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
