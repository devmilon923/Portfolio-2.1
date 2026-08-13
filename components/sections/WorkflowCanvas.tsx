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
    duration: "Day 1",
    arrow: "right", // curved arrow to next
  },
  {
    id: 2,
    code: "02 / DESIGN",
    title: "Architect",
    role: "System Design",
    description: "Schema → API contract → Data flow. Planned, not improvised.",
    duration: "Day 2–3",
    arrow: "left",
  },
  {
    id: 3,
    code: "03 / BUILD",
    title: "Execute",
    role: "Full-Stack Development",
    description: "Backend-first, performance-always, frontend that follows.",
    duration: "Day 4–7",
    arrow: "right",
  },
  {
    id: 4,
    code: "04 / TEST",
    title: "Validate",
    role: "QA & Integration Testing",
    description: "Break it locally so clients don't break it live.",
    duration: "Day 8",
    arrow: "right",
  },
  {
    id: 5,
    code: "05 / SHIP",
    title: "Deploy",
    role: "Production Launch & Handoff",
    description: "Clean deployment, documented APIs, clean handoff.",
    duration: "Day 9",
    arrow: null,
  },
];

/* ─── TYPEWRITER ─────────────────────────────────────────────────────── */
function TypedText({
  text,
  delay = 0,
  speed = 46,
  style = {},
}: {
  text: string;
  delay?: number;
  speed?: number;
  style?: React.CSSProperties;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  useEffect(() => {
    if (!started || displayed.length >= text.length) return;
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      speed + (Math.random() * speed * 0.35 - speed * 0.1),
    );
    return () => clearTimeout(t);
  }, [started, displayed, text, speed]);

  return (
    <span style={style}>
      {displayed}
      {displayed.length < text.length && started && (
        <span
          style={{
            display: "inline-block",
            width: "1px",
            height: "0.85em",
            background: "currentColor",
            marginLeft: "1px",
            verticalAlign: "middle",
            animation: "wc-blink 0.55s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

/* ─── ERASER ─────────────────────────────────────────────────────────── */
function ErasingText({
  text,
  onDone,
  speed = 25,
  style = {},
}: {
  text: string;
  onDone: () => void;
  speed?: number;
  style?: React.CSSProperties;
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
    <span style={{ ...style, opacity: displayed.length === 0 ? 0 : 1 }}>
      {displayed}
    </span>
  );
}

/* ─── CURVED ARROW SVG ───────────────────────────────────────────────── */
function CurvedArrow({ side }: { side: "left" | "right" }) {
  if (side === "right") {
    return (
      <svg
        width="60"
        height="36"
        viewBox="0 0 60 36"
        fill="none"
        style={{ position: "absolute", right: 16, top: 6 }}
        aria-hidden
      >
        <path
          d="M 4,4 C 20,2 52,8 56,28"
          stroke="#8a7f7a"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* arrowhead */}
        <path
          d="M 50,30 L 56,28 L 54,22"
          stroke="#8a7f7a"
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
      width="60"
      height="36"
      viewBox="0 0 60 36"
      fill="none"
      style={{ position: "absolute", right: 16, top: 6 }}
      aria-hidden
    >
      <path
        d="M 56,4 C 40,2 8,8 4,28"
        stroke="#8a7f7a"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 10,30 L 4,28 L 6,22"
        stroke="#8a7f7a"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────── */
export default function WorkflowCanvas() {
  const [revealedPhases, setRevealedPhases] = useState<Set<number>>(new Set());
  const [typingPhase, setTypingPhase] = useState(0);
  const [typingState, setTypingState] = useState<
    "typing" | "pausing" | "erasing"
  >("typing");

  // Staggered reveal
  useEffect(() => {
    const timers = PHASES.map((phase, i) =>
      setTimeout(
        () => {
          setRevealedPhases((prev) => new Set([...prev, phase.id]));
        },
        200 + i * 130,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-cycle typing
  useEffect(() => {
    if (typingState === "typing") {
      const chars = PHASES[typingPhase].description.length;
      const t = setTimeout(() => setTypingState("pausing"), chars * 50 + 800);
      return () => clearTimeout(t);
    }
    if (typingState === "pausing") {
      const t = setTimeout(() => setTypingState("erasing"), 2000);
      return () => clearTimeout(t);
    }
  }, [typingState, typingPhase]);

  const handleErased = useCallback(() => {
    setTypingPhase((prev) => (prev + 1) % PHASES.length);
    setTypingState("typing");
  }, []);

  const currentPhase = PHASES[typingPhase];

  const handwritingFont = `'Caveat', 'Patrick Hand', 'Segoe Print', cursive`;

  return (
    <>
      <style>{`
        @keyframes wc-blink { 50% { opacity: 0; } }
        @keyframes wc-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wc-pulse-dot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.25); }
        }
        @keyframes wc-underline-draw {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        /* Paper crinkle corners */
        .wc-paper::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background: transparent;
          box-shadow:
            inset 0 0 40px 0 rgba(120,100,80,0.07),
            inset 12px 12px 28px -8px rgba(100,80,60,0.08),
            inset -12px -12px 28px -8px rgba(100,80,60,0.06);
          pointer-events: none;
          z-index: 1;
        }
        /* Slight paper vignette */
        .wc-paper::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background: radial-gradient(ellipse at 20% 15%, rgba(255,255,255,0.18) 0%, transparent 55%),
                      radial-gradient(ellipse at 80% 85%, rgba(160,130,100,0.07) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      {/* ── PAPER CARD ── */}
      <div
        className="wc-paper"
        style={{
          position: "relative",
          width: "100%",
          /* Real paper: warm cream, slight tooth */
          background: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E"),
            #f4ede0
          `,
          /* Uneven paper border via box-shadow */
          boxShadow: `
            0 1px 1px rgba(0,0,0,0.06),
            0 2px 4px rgba(0,0,0,0.08),
            0 6px 16px rgba(0,0,0,0.06),
            inset 0 0 0 1px rgba(160,130,100,0.18)
          `,
          borderRadius:
            "5px 6px 5px 7px / 6px 5px 7px 5px" /* slightly uneven corners */,
          padding: "28px 26px 20px 26px",
          fontFamily: handwritingFont,
          minHeight: 460,
        }}
      >
        {/* Faint ruled lines overlay */}
        <svg
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
            borderRadius: "inherit",
          }}
        >
          {Array.from({ length: 22 }, (_, i) => {
            const y = 54 + i * 30;
            return (
              <line
                key={i}
                x1="24"
                y1={y}
                x2="96%"
                y2={y + Math.sin(i * 1.3) * 0.8}
                stroke="#c8b89a"
                strokeWidth="0.55"
                opacity="0.45"
              />
            );
          })}
        </svg>

        {/* Everything above the paper texture */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {/* ── HEADER ── */}
          <div style={{ marginBottom: 20, position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              {/* Title */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <h2
                  style={{
                    fontFamily: handwritingFont,
                    fontSize: "clamp(20px, 4vw, 26px)",
                    fontWeight: 700,
                    color: "#1a1410",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  How I Work
                </h2>
                {/* Hand-drawn double underline */}
                <svg
                  aria-hidden
                  style={{
                    display: "block",
                    width: "100%",
                    height: 7,
                    overflow: "visible",
                    marginTop: 2,
                  }}
                  viewBox="0 0 180 7"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 1,2 Q 45,1.2 90,2.4 Q 135,3 179,1.8"
                    stroke="#1a1410"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 1,5 Q 45,4.5 90,5.5 Q 135,6 179,5"
                    stroke="#1a1410"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </div>

              {/* CLIENT POV */}
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    fontFamily: handwritingFont,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#5a4f48",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Client POV
                </span>
                <svg
                  aria-hidden
                  style={{
                    display: "block",
                    width: "100%",
                    height: 4,
                    marginTop: 1,
                  }}
                  viewBox="0 0 80 4"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,2 Q 40,1 80,2.5"
                    stroke="#5a4f48"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ── PHASE LIST ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PHASES.map((phase, index) => {
              const isRevealed = revealedPhases.has(phase.id);
              const isHighlighted = typingPhase === index;
              const isLast = index === PHASES.length - 1;

              return (
                <div
                  key={phase.id}
                  style={{
                    display: "flex",
                    gap: 0,
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 0.45s ease ${index * 0.08}s, transform 0.45s ease ${index * 0.08}s`,
                    animation: isRevealed
                      ? `wc-fade-up 0.45s ease ${index * 0.08}s both`
                      : "none",
                  }}
                >
                  {/* LEFT: circle + connector line */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 52,
                      flexShrink: 0,
                      paddingTop: 2,
                    }}
                  >
                    {/* Hand-drawn circle node */}
                    <div
                      style={{
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        style={{ display: "block", overflow: "visible" }}
                      >
                        {/* Outer hand-drawn ellipse */}
                        <path
                          d="M 20,3 C 30,2 38,10 38,20 C 38,30 30,38 20,38 C 9,39 2,30 2,20 C 1,9 10,3 20,3"
                          stroke={isHighlighted ? "#1a1410" : "#6b5f57"}
                          strokeWidth={isHighlighted ? 2 : 1.5}
                          fill={
                            isHighlighted
                              ? "rgba(26,20,16,0.06)"
                              : "rgba(244,237,224,0.7)"
                          }
                          style={{ transition: "stroke 0.3s, fill 0.3s" }}
                        />
                        {/* inner faint echo stroke */}
                        <path
                          d="M 20,5 C 29,4 36,11 36,20 C 36,29 29,36 20,36 C 10,37 4,29 4,20 C 3,11 11,5 20,5"
                          stroke={isHighlighted ? "#1a1410" : "#9a8e86"}
                          strokeWidth="0.6"
                          fill="none"
                          opacity="0.4"
                        />
                        {/* Label */}
                        <text
                          x="20"
                          y="24"
                          textAnchor="middle"
                          style={{
                            fontFamily: handwritingFont,
                            fontSize: 12,
                            fontWeight: 700,
                            fill: isHighlighted ? "#1a1410" : "#5a4f48",
                            transition: "fill 0.3s",
                          }}
                        >
                          {String(phase.id).padStart(2, "0")}
                        </text>
                      </svg>
                    </div>

                    {/* Connector line */}
                    {!isLast && (
                      <svg
                        width="14"
                        height="38"
                        viewBox="0 0 14 38"
                        style={{ flexShrink: 0 }}
                        aria-hidden
                      >
                        {/* Hand-drawn wobbly vertical line */}
                        <path
                          d={`M 7,0 C ${7 + Math.sin(phase.id * 1.8) * 2},10 ${7 - Math.sin(phase.id * 2.3) * 2},24 7,38`}
                          stroke="#9a8e86"
                          strokeWidth="1.4"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* RIGHT: content */}
                  <div
                    style={{
                      flex: 1,
                      paddingBottom: isLast ? 0 : 14,
                      minWidth: 0,
                      paddingTop: 2,
                      position: "relative",
                    }}
                  >
                    {/* Code · duration */}
                    <div
                      style={{
                        fontFamily: handwritingFont,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#6b5f57",
                        marginBottom: 2,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {phase.code} · {phase.duration}
                    </div>

                    {/* Title with underline & description */}
                    <div
                      style={{
                        display: "block",
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 6,
                          flexWrap: "wrap",
                          marginBottom: 4,
                          position: "relative",
                        }}
                      >
                        {/* Title — underlined like reference */}
                        <span
                          style={{
                            fontFamily: handwritingFont,
                            fontSize: "clamp(16px, 3vw, 19px)",
                            fontWeight: 700,
                            color: "#1a1410",
                            position: "relative",
                            display: "inline-block",
                            lineHeight: 1.15,
                          }}
                        >
                          {phase.title}
                          {/* underline */}
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              bottom: -2,
                              right: 0,
                              height: 2,
                              borderBottom: "1.8px solid #1a1410",
                              display: "block",
                            }}
                          />
                        </span>

                        <span
                          style={{
                            fontFamily: handwritingFont,
                            fontSize: "clamp(13px, 2.5vw, 15px)",
                            color: "#4a403a",
                            fontWeight: 500,
                            lineHeight: 1.15,
                          }}
                        >
                          – {phase.role}
                        </span>
                      </div>

                      {/* Description: typing animation on active phase */}
                      <div
                        style={{
                          fontFamily: handwritingFont,
                          fontSize: "clamp(12px, 2.2vw, 14px)",
                          color: "#3a302a",
                          lineHeight: 1.55,
                          marginTop: 1,
                          minHeight: "1.55em",
                        }}
                      >
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

                    {/* Curved arrow (decorative, like reference image) */}
                    {phase.arrow && !isLast && (
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          pointerEvents: "none",
                        }}
                      >
                        <CurvedArrow side={phase.arrow as "left" | "right"} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── BOTTOM TAGLINE ── */}
          <div
            style={{
              marginTop: 16,
              paddingTop: 12,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            {/* Hand-drawn divider */}
            <svg
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: 6,
                overflow: "visible",
              }}
              viewBox="0 0 400 6"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,3 Q 100,2 200,3.5 Q 300,4.5 400,3"
                stroke="#9a8e86"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <span
              style={{
                fontFamily: handwritingFont,
                fontSize: "clamp(11px, 2vw, 13px)",
                color: "#5a4f48",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              From brief to production – no hand-holding required.
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  animation: "wc-pulse-dot 1.6s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: handwritingFont,
                  fontSize: 12,
                  color: "#2a5a3a",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Available
              </span>
            </div>
          </div>
        </div>
        {/* /z-index content */}
      </div>
      {/* /paper card */}
    </>
  );
}
