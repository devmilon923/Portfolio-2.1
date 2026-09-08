"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ────────────────────────────────────────────────────────────── */
const PHASES = [
  {
    id: 1,
    code: "01 / BRIEF",
    title: "Understand",
    role: "Strategic Alignment",
    description: "I read the problem before I write a single line.",
    duration: "Week 1",
    arrow: "right",
  },
  {
    id: 2,
    code: "02 / DESIGN",
    title: "Architect",
    role: "System Design",
    description: "Schema → API contract → Data flow. Planned, not improvised.",
    duration: "Week 1",
    arrow: "left",
  },
  {
    id: 3,
    code: "03 / BUILD",
    title: "Execute",
    role: "Full-Stack Development",
    description: "Backend-first, performance-always, frontend that follows.",
    duration: "Week 2–3",
    arrow: "right",
  },
  {
    id: 4,
    code: "04 / TEST",
    title: "Validate",
    role: "QA & Integration Testing",
    description: "Break it locally so clients don't break it live.",
    duration: "Week 3",
    arrow: "right",
  },
  {
    id: 5,
    code: "05 / SHIP",
    title: "Deploy",
    role: "Production Launch & Handoff",
    description: "Clean deployment, documented APIs, clean handoff.",
    duration: "Week 3",
    arrow: null,
  },
];

/* ─── TYPEWRITER ─────────────────────────────────────────────────────── */
function TypedText({
  text,
  delay = 0,
  speed = 46,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || displayed.length >= text.length) return;
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      speed + (Math.random() * speed * 0.35 - speed * 0.1),
    );
    return () => clearTimeout(t);
  }, [started, displayed, text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-[1px] h-[0.85em] bg-current ml-[1px] align-middle animate-pulse" />
      )}
    </span>
  );
}

/* ─── ERASER ─────────────────────────────────────────────────────────── */
function ErasingText({
  text,
  onDone,
  speed = 25,
}: {
  text: string;
  onDone: () => void;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState(text);
  const calledRef = useRef(false);

  useEffect(() => {
    setDisplayed(text);
    calledRef.current = false;
  }, [text]);

  useEffect(() => {
    if (displayed.length === 0) {
      if (!calledRef.current) {
        calledRef.current = true;
        onDone();
      }
      return;
    }
    const t = setTimeout(
      () => setDisplayed((d) => d.slice(0, -1)),
      speed + Math.random() * 12,
    );
    return () => clearTimeout(t);
  }, [displayed, onDone, speed]);

  return (
    <span className={displayed.length === 0 ? "opacity-0" : "opacity-100"}>
      {displayed}
    </span>
  );
}

/* ─── CURVED ARROW SVG ───────────────────────────────────────────────── */
function CurvedArrow({ side }: { side: "left" | "right" }) {
  if (side === "right") {
    return (
      <svg
        width="48"
        height="28"
        viewBox="0 0 60 36"
        fill="none"
        className="absolute right-3 top-1 pointer-events-none opacity-60"
        aria-hidden
      >
        <path
          d="M 4,4 C 20,2 52,8 56,28"
          stroke="#406e7a"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 50,30 L 56,28 L 54,22"
          stroke="#406e7a"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      width="48"
      height="28"
      viewBox="0 0 60 36"
      fill="none"
      className="absolute right-3 top-1 pointer-events-none opacity-60"
      aria-hidden
    >
      <path
        d="M 56,4 C 40,2 8,8 4,28"
        stroke="#406e7a"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 10,30 L 4,28 L 6,22"
        stroke="#406e7a"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkflowHeader() {
  return (
    <div className="mb-3 relative">
      <div className="flex items-start justify-between">
        <div className="relative inline-block">
          <h2 className="font-caveat text-xl sm:text-2xl font-bold text-obsidian tracking-wide uppercase m-0 leading-none">
            How I Work
          </h2>
          <svg
            aria-hidden
            className="block w-full h-1.5 overflow-visible mt-0.5"
            viewBox="0 0 180 7"
            preserveAspectRatio="none"
          >
            <path
              d="M 1,2 Q 45,1.2 90,2.4 Q 135,3 179,1.8"
              stroke="#406e7a"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 1,5 Q 45,4.5 90,5.5 Q 135,6 179,5"
              stroke="#406e7a"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="relative">
          <span className="font-caveat text-xs font-bold text-slate-teal tracking-widest uppercase">
            Client POV
          </span>
          <svg
            aria-hidden
            className="block w-full h-1 mt-0.5"
            viewBox="0 0 80 4"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,2 Q 40,1 80,2.5"
              stroke="#406e7a"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function WorkflowCanvas() {
  const [revealedPhases, setRevealedPhases] = useState<Set<number>>(
    () => new Set(PHASES.map((p) => p.id)),
  );
  const [typingPhase, setTypingPhase] = useState(0);
  const [typingState, setTypingState] = useState<
    "typing" | "pausing" | "erasing"
  >("typing");
  const [isManualSelection, setIsManualSelection] = useState(false);

  useEffect(() => {
    if (isManualSelection) return;

    if (typingState === "typing") {
      const chars = PHASES[typingPhase].description.length;
      const t = setTimeout(() => setTypingState("pausing"), chars * 45 + 750);
      return () => clearTimeout(t);
    }
    if (typingState === "pausing") {
      const t = setTimeout(() => setTypingState("erasing"), 1800);
      return () => clearTimeout(t);
    }
  }, [typingState, typingPhase, isManualSelection]);

  const handleErased = useCallback(() => {
    setTypingPhase((prev) => (prev + 1) % PHASES.length);
    setTypingState("typing");
  }, []);

  const handlePhaseClick = (index: number) => {
    setIsManualSelection(true);
    setTypingPhase(index);
    setTypingState("typing");
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#f7f4ee] border border-[#e1dad9] p-4 sm:p-5 font-caveat shadow-sm hover:shadow-sm transition-shadow duration-300 overflow-hidden group">
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_15%_15%,rgba(255,255,255,0.4)_0%,transparent_60%),radial-gradient(ellipse_at_85%_85%,rgba(245,236,229,0.3)_0%,transparent_50%)] pointer-events-none z-0" />

      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-2xl"
      >
        {Array.from({ length: 20 }, (_, i) => {
          const y = 40 + i * 24;
          return (
            <line
              key={i}
              x1="16"
              y1={y}
              x2="96%"
              y2={y + Math.sin(i * 1.3) * 0.5}
              stroke="#e2d9cd"
              strokeWidth="0.5"
              opacity="0.55"
            />
          );
        })}
      </svg>

      <div className="relative z-10">
        <WorkflowHeader />

        <div className="flex flex-col gap-0">
          {PHASES.map((phase, index) => {
            const isRevealed = revealedPhases.has(phase.id);
            const isHighlighted = typingPhase === index;
            const isLast = index === PHASES.length - 1;

            return (
              <button
                type="button"
                key={phase.id}
                onClick={() => handlePhaseClick(index)}
                className={`w-full text-left flex gap-0 cursor-pointer py-0.5 px-1 border-l-2 ${
                  isHighlighted
                    ? "border-slate-teal"
                    : "border-transparent hover:border-slate-teal/30"
                } ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  transition: `opacity 300ms ease ${index * 60}ms, transform 300ms ease ${index * 60}ms, border-color 300ms ease`,
                }}
              >
                {/* LEFT: circle + connector line */}
                <div className="flex flex-col items-center w-9 flex-shrink-0 pt-0.5">
                  {/* Hand-drawn circle node */}
                  <div className="flex-shrink-0">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 40 40"
                      className="block overflow-visible"
                    >
                      <path
                        d="M 20,3 C 30,2 38,10 38,20 C 38,30 30,38 20,38 C 9,39 2,30 2,20 C 1,9 10,3 20,3"
                        stroke={isHighlighted ? "#406e7a" : "#8c827a"}
                        strokeWidth={isHighlighted ? "2.2" : "1.5"}
                        fill={
                          isHighlighted
                            ? "rgba(64, 110, 122, 0.12)"
                            : "rgba(247, 244, 238, 0.8)"
                        }
                        className="transition-colors duration-300"
                      />
                      <path
                        d="M 20,5 C 29,4 36,11 36,20 C 36,29 29,36 20,36 C 10,37 4,29 4,20 C 3,11 11,5 20,5"
                        stroke={isHighlighted ? "#406e7a" : "#b0a59c"}
                        strokeWidth="0.6"
                        fill="none"
                        opacity="0.4"
                      />
                      <text
                        x="20"
                        y="24"
                        textAnchor="middle"
                        className={`font-caveat text-xs font-bold transition-colors duration-300 ${
                          isHighlighted ? "fill-slate-teal" : "fill-[#2c241f]"
                        }`}
                      >
                        {String(phase.id).padStart(2, "0")}
                      </text>
                    </svg>
                  </div>

                  {/* Connector line */}
                  {!isLast && (
                    <svg
                      width="12"
                      height="26"
                      viewBox="0 0 14 38"
                      className="flex-shrink-0"
                      aria-hidden
                    >
                      <path
                        d={`M 7,0 C ${
                          7 + Math.sin(phase.id * 1.8) * 2
                        },10 ${7 - Math.sin(phase.id * 2.3) * 2},24 7,38`}
                        stroke={isHighlighted ? "#406e7a" : "#b8ad9e"}
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                        opacity={isHighlighted ? 0.7 : 0.45}
                      />
                    </svg>
                  )}
                </div>

                {/* RIGHT: content */}
                <div
                  className={`flex-1 min-w-0 pt-0.5 relative ${
                    isLast ? "pb-0" : "pb-2"
                  }`}
                >
                  {/* Code · duration */}
                  <div
                    className={`font-caveat text-xs font-bold mb-0.5 tracking-wide ${
                      isHighlighted ? "text-slate-teal" : "text-[#4a3f37]"
                    }`}
                  >
                    {phase.code} · {phase.duration}
                  </div>

                  {/* Title & Description */}
                  <div className="block text-left w-full">
                    <div className="flex items-baseline gap-1.5 flex-wrap mb-0.5 relative">
                      {/* Title with Underline */}
                      <span className="font-caveat text-base sm:text-lg font-bold text-obsidian relative inline-block leading-tight border-b-2 border-slate-teal">
                        {phase.title}
                      </span>

                      <span className="font-caveat text-xs sm:text-sm text-slate-teal font-semibold leading-tight">
                        – {phase.role}
                      </span>
                    </div>

                    {/* Description: Typewriter on active phase */}
                    <div className="font-caveat text-xs sm:text-[13px] text-[#2a221d] font-medium leading-normal mt-0.5 min-h-[1.4em]">
                      {isHighlighted ? (
                        typingState === "erasing" ? (
                          <ErasingText
                            key={`e-${typingPhase}`}
                            text={phase.description}
                            onDone={handleErased}
                            speed={22}
                          />
                        ) : (
                          <TypedText
                            key={`t-${typingPhase}`}
                            text={phase.description}
                            delay={60}
                            speed={46}
                          />
                        )
                      ) : (
                        <span>{phase.description}</span>
                      )}
                    </div>
                  </div>

                  {/* Curved arrow SVG */}
                  {phase.arrow && !isLast && (
                    <CurvedArrow side={phase.arrow as "left" | "right"} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── BOTTOM TAGLINE ── */}
        <div className="mt-3 pt-2.5 relative flex items-center justify-between gap-2 flex-wrap">
          {/* Hand-drawn divider SVG */}
          <svg
            aria-hidden
            className="absolute top-0 left-0 right-0 w-full h-1.5 overflow-visible"
            viewBox="0 0 400 6"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,3 Q 100,2 200,3.5 Q 300,4.5 400,3"
              stroke="#c5b9ab"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <span className="font-caveat text-xs font-semibold text-[#2c241f]">
            From brief to production – no hand-holding required.
          </span>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-caveat text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
              Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
