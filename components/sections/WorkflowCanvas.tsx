"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Phase {
  id: number;
  code: string;
  title: string;
  role: string;
  description: string;
  detail: string;
  accentColor: string;
  glowColor: string;
  duration: string;
}

const PHASES: Phase[] = [
  {
    id: 1,
    code: "01 / BRIEF",
    title: "Understand",
    role: "Strategic Alignment",
    description: "I read the problem before I write a single line.",
    detail:
      "Requirements, constraints, edge cases. I ask the right questions early so there are no surprises in production.",
    accentColor: "#ffedd2",
    glowColor: "rgba(255,237,210,0.15)",
    duration: "Day 1",
  },
  {
    id: 2,
    code: "02 / DESIGN",
    title: "Architect",
    role: "System Design",
    description: "Schema → API contract → Data flow. Planned, not improvised.",
    detail:
      "Database design, service boundaries, caching strategy, auth model — all resolved before development starts.",
    accentColor: "#c084fc",
    glowColor: "rgba(192,132,252,0.12)",
    duration: "Day 2–3",
  },
  {
    id: 3,
    code: "03 / BUILD",
    title: "Execute",
    role: "Full-Stack Development",
    description: "Backend-first, performance-always, frontend that follows.",
    detail:
      "APIs, business logic, and data layer built to production standards. Frontend crafted for speed and UX clarity — AI-assisted design, human-controlled architecture.",
    accentColor: "#22d3ee",
    glowColor: "rgba(34,211,238,0.12)",
    duration: "Day 3–N",
  },
  {
    id: 4,
    code: "04 / INTEGRATE",
    title: "Connect",
    role: "AI & Third-Party Systems",
    description: "OpenAI, Pinecone, payments, webhooks — seamlessly wired.",
    detail:
      "I architect the integration layer so it's fault-tolerant, observable, and easy to extend later.",
    accentColor: "#34d399",
    glowColor: "rgba(52,211,153,0.12)",
    duration: "Parallel",
  },
  {
    id: 5,
    code: "05 / SHIP",
    title: "Deploy",
    role: "Infrastructure & CI/CD",
    description: "Docker → AWS → GitHub Actions. Zero-touch from merge to live.",
    detail:
      "Automated pipelines, reverse-proxied with Nginx, monitored from day one. You get reliability, not hope.",
    accentColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.12)",
    duration: "Final",
  },
];

export default function WorkflowCanvas() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [revealedPhases, setRevealedPhases] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Staggered reveal of phases on mount
  useEffect(() => {
    const timers = PHASES.map((phase, i) =>
      setTimeout(() => {
        setRevealedPhases((prev) => new Set([...prev, phase.id]));
      }, 400 + i * 180)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative flex flex-col justify-between"
      style={{ minHeight: "460px" }}
    >
      {/* Header label */}
      <div className="flex items-center justify-between mb-5 px-0.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cream/60" />
          <span className="text-[10px] font-mono tracking-[0.15em] text-ash/50 uppercase">
            How I Work
          </span>
        </div>
        <span className="text-[10px] font-mono text-ash/30 tracking-wider">
          CLIENT POV
        </span>
      </div>

      {/* Pipeline */}
      <div className="flex-1 relative flex flex-col gap-0">
        {PHASES.map((phase, index) => {
          const isRevealed = revealedPhases.has(phase.id);
          const isActive = activePhase === phase.id;
          const isLast = index === PHASES.length - 1;

          return (
            <div key={phase.id} className="relative flex gap-0">
              {/* Vertical connector rail */}
              <div className="flex flex-col items-center w-10 flex-shrink-0 mr-4">
                {/* Node dot */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isRevealed
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <motion.button
                    onClick={() =>
                      setActivePhase(isActive ? null : phase.id)
                    }
                    className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer focus:outline-none group/node"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: isActive
                        ? phase.glowColor
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${
                        isActive
                          ? phase.accentColor
                          : isRevealed
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.04)"
                      }`,
                      boxShadow: isActive
                        ? `0 0 16px ${phase.glowColor}, 0 0 32px ${phase.glowColor}`
                        : "none",
                      transition: "all 0.35s ease",
                    }}
                  >
                    {/* Pulse ring on active */}
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${phase.accentColor}` }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.8,
                          ease: "easeOut",
                        }}
                      />
                    )}

                    {/* Step number */}
                    <span
                      className="text-[11px] font-mono font-bold leading-none"
                      style={{
                        color: isActive ? phase.accentColor : "rgba(255,255,255,0.25)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {String(phase.id).padStart(2, "0")}
                    </span>
                  </motion.button>
                </motion.div>

                {/* Connector line */}
                {!isLast && (
                  <div className="flex-1 flex justify-center py-1">
                    <motion.div
                      className="w-px"
                      style={{
                        minHeight: isActive ? "0px" : "12px",
                        background: `linear-gradient(to bottom, ${
                          isRevealed
                            ? "rgba(255,237,210,0.12)"
                            : "rgba(255,237,210,0.04)"
                        }, rgba(255,237,210,0.04))`,
                        transition: "background 0.4s ease",
                      }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={
                        isRevealed
                          ? { height: "100%", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ delay: 0.1, duration: 0.5 }}
                    />
                  </div>
                )}
              </div>

              {/* Phase Content Card */}
              <div className="flex-1 pb-4 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={
                    isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }
                  }
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {/* Phase header row */}
                  <button
                    onClick={() =>
                      setActivePhase(isActive ? null : phase.id)
                    }
                    className="w-full text-left group/card focus:outline-none"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="text-[9px] font-mono tracking-[0.15em] uppercase flex-shrink-0 transition-colors duration-300"
                          style={{
                            color: isActive
                              ? phase.accentColor
                              : "rgba(255,237,210,0.3)",
                          }}
                        >
                          {phase.code}
                        </span>
                        <span className="text-[9px] font-mono text-ash/30 flex-shrink-0">
                          · {phase.duration}
                        </span>
                      </div>
                      {/* Expand indicator */}
                      <motion.span
                        className="text-ash/20 text-xs font-mono flex-shrink-0 mt-0.5"
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        +
                      </motion.span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="text-base font-semibold leading-tight tracking-tight transition-colors duration-300"
                        style={{
                          color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                        }}
                      >
                        {phase.title}
                      </span>
                      <span
                        className="text-[10px] font-mono transition-colors duration-300"
                        style={{
                          color: isActive
                            ? phase.accentColor
                            : "rgba(255,237,210,0.25)",
                        }}
                      >
                        {phase.role}
                      </span>
                    </div>

                    <p className="text-xs text-ash/50 leading-relaxed font-light">
                      {phase.description}
                    </p>
                  </button>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mt-3 mb-1 p-3 rounded-xl text-xs text-ash/70 leading-relaxed font-light"
                          style={{
                            background: phase.glowColor,
                            borderLeft: `2px solid ${phase.accentColor}40`,
                          }}
                        >
                          {phase.detail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <motion.div
        className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[10px] font-mono text-ash/30 tracking-wider">
          From brief to production — no hand-holding required.
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-emerald-500/60 animate-pulse" />
          <span className="text-[9px] font-mono text-ash/25">AVAILABLE</span>
        </div>
      </motion.div>
    </div>
  );
}
