"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Zap,
  Server,
  Brain,
} from "lucide-react";
import { PERSONAL } from "@/lib/constants";

const floatingCards = [
  {
    icon: <Zap className="w-4 h-4 text-cream" />,
    title: "40% Faster APIs",
    sub: "Redis + MongoDB tuning",
    delay: 0,
    pos: "top-[20%] right-[8%]",
  },
  {
    icon: <Brain className="w-4 h-4 text-cream" />,
    title: "RAG Architecture",
    sub: "OpenAI + Pinecone",
    delay: 0.4,
    pos: "top-[60%] right-[4%]",
  },
  {
    icon: <Server className="w-4 h-4 text-cream" />,
    title: "AWS + Docker",
    sub: "Zero-touch CI/CD",
    delay: 0.8,
    pos: "bottom-[25%] left-[6%]",
  },
];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7, ease: "easeOut" as const },
    },
  };
}

export default function Hero() {
  const scrollToNext = () => {
    const next = document.querySelector("#stats");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void "
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="mist-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-[90vw] opacity-60" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,237,210,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,237,210,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Floating clay cards — desktop only */}
      <div className="hidden lg:block">
        {floatingCards.map((card, i) => (
          <motion.div
            key={i}
            className={`absolute ${card.pos} z-10`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.8 + card.delay,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                delay: card.delay,
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-charcoal border border-white/[0.08] rounded-clay px-4 py-3 shadow-clay-md backdrop-blur-sm flex items-center gap-3 min-w-[170px]"
            >
              <div className="w-8 h-8 rounded-lg bg-cream/10 flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <div>
                <p className="text-white text-xs font-medium leading-tight">
                  {card.title}
                </p>
                <p className="text-ash text-[11px] font-light mt-0.5">
                  {card.sub}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status badge */}
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal border border-cream/10 mb-8"
        >
          <span className="glow-dot" />
          <span className="text-cream text-xs font-light tracking-wide">
            Available for freelance work
          </span>
          <Sparkles className="w-3 h-3 text-cream opacity-60" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.22)}
          className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight mb-5 sm:mb-6 text-white text-balance"
        >
          Building <span className="gradient-text">systems</span>
          <br />
          that{" "}
          <span className="relative inline-block">
            <span className="gradient-text">scale.</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cream to-transparent opacity-50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.34)}
          className="text-ash text-lg sm:text-xl font-light tracking-tight max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          {PERSONAL.tagline}
        </motion.p>

        <motion.p
          {...fadeUp(0.46)}
          className="text-ash/70 text-sm font-light max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Full-Stack Developer with 1+ year at an international agency —
          shipping AI-integrated platforms, scalable APIs, and automated
          infrastructure for clients across the globe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.58)}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-2 px-6 py-3 rounded-[12px] bg-cream text-void text-sm font-medium shadow-clay-cream hover:shadow-clay-hover transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
            className="flex items-center gap-2 px-6 py-3 rounded-[12px] border border-white/[0.1] text-white text-sm font-light hover:bg-white/[0.04] hover:border-cream/20 transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail className="w-4 h-4 text-ash" />
            Contact Me
          </motion.a>

          <motion.a
            href={PERSONAL.resumeUrl}
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 rounded-[12px] border border-white/[0.1] text-ash text-sm font-light hover:bg-white/[0.04] hover:text-white hover:border-cream/20 transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          {...fadeUp(0.7)}
          className="flex items-center justify-center gap-4"
        >
          <span className="text-ash/40 text-xs font-light">Find me on</span>
          <div className="flex items-center gap-3">
            <motion.a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ash hover:text-white text-xs font-light transition-colors"
              whileHover={{ y: -2 }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>
            <span className="w-px h-3 bg-white/[0.1]" />
            <motion.a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ash hover:text-white text-xs font-light transition-colors"
              whileHover={{ y: -2 }}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ash/50 hover:text-ash transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-light tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
