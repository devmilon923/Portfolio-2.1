"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Cpu,
  GitBranch,
  Globe,
  Award,
  GraduationCap,
  Globe2,
  MessageSquare,
  Zap,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import {
  PERSONAL,
  STRENGTHS,
  CERTIFICATIONS,
  EDUCATION,
  LANGUAGES,
  WHY_SOLO_VS_AGENCY,
} from "@/lib/constants";
import meImage from "./../../assets/me.jpeg";
import Image from "next/image";

const icons = [Code2, Cpu, GitBranch, Globe];

/* ─── ELEGANT MINIMAL NEURAL MESH & AMBIENT DUST ─────────────────── */
function ProfileCardNeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initElements();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("resize", handleResize);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      phase: number;
    }

    interface AmbientOrb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    let nodes: Node[] = [];
    let ambientOrbs: AmbientOrb[] = [];

    const initElements = () => {
      nodes = [];
      ambientOrbs = [];

      // Minimal soft nodes (8-10 max)
      const count = 9;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 1.2,
          alpha: Math.random() * 0.4 + 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // 2 ultra-subtle ambient glow spots
      for (let i = 0; i < 2; i++) {
        ambientOrbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 40 + 60,
        });
      }
    };

    let time = 0;
    initElements();

    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 },
    );

    if (canvas) {
      observer.observe(canvas);
    }

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // 1. Soft Ambient Background Glow (Warm Amber Accent)
      for (let i = 0; i < ambientOrbs.length; i++) {
        const orb = ambientOrbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -40 || orb.x > width + 40) orb.vx *= -1;
        if (orb.y < -40 || orb.y > height + 40) orb.vy *= -1;

        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius,
        );
        grad.addColorStop(0, "rgba(217, 119, 6, 0.06)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Minimal Constellation Lines between Nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 3. Subtle Connection to Cursor
      const mouse = mouseRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Update Node Position
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -10 || node.x > width + 10) node.vx *= -1;
        if (node.y < -10 || node.y > height + 10) node.vy *= -1;

        // Render Node Dot
        const currentAlpha =
          node.alpha + Math.sin(time * 2 + node.phase) * 0.15;
        ctx.fillStyle = `rgba(217, 119, 6, ${Math.max(0.1, Math.min(0.6, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-[32px] z-0 opacity-80"
    />
  );
}

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-bone relative overflow-hidden border-t border-iron/60"
    >
      {/* Subtle ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[30%] right-[15%] w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(244, 237, 224, 0.6) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="section-label mb-3">About The Developer</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-3 text-balance">
            Engineering precision.{" "}
            <span className="font-normal text-slate-teal">
              Business results.
            </span>
          </h2>
          <p className="text-obsidian/75 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
            Combining electrical engineering principles with modern full-stack
            architecture to build resilient web products.
          </p>
        </div>

        {/* Top Grid: Profile Card & Bio / Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Full-width Profile Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              onMouseMove={handleCardMouseMove}
              className="w-full h-full rounded-[32px] bg-paper-white border border-iron/90 p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-2xs relative group hover:border-obsidian/40 transition-all duration-300 overflow-hidden"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(15, 23, 42, 0.03), rgba(0, 0, 0, 0.01) 50%, transparent 80%), #ffffff`,
              }}
            >
              {/* Interactive Neural Network Constellation Canvas */}
              <ProfileCardNeuralMesh />

              {/* Card Content (z-10 relative) */}
              <div className="relative z-10 w-full flex flex-col justify-between items-center h-full">
                {/* Badges Header Row */}
                <div className="w-full flex items-center justify-between gap-2 mb-4">
                  <div className="bg-bone/90 backdrop-blur-sm border border-iron/80 rounded-xl px-3.5 py-2 text-left shadow-2xs hover:border-obsidian/30 transition-colors">
                    <p className="text-obsidian text-[13px] font-bold leading-tight">
                      2+ Years
                    </p>
                    <p className="text-obsidian/70 text-[10px] font-medium leading-tight mt-0.5">
                      Professional Exp.
                    </p>
                  </div>
                  <div className="bg-bone/90 backdrop-blur-sm border border-iron/80 rounded-xl px-3.5 py-2 text-right shadow-2xs hover:border-obsidian/30 transition-colors">
                    <p className="text-obsidian text-[13px] font-bold leading-tight">
                      Full-Stack + AI
                    </p>
                    <p className="text-obsidian/70 text-[10px] font-medium leading-tight mt-0.5">
                      Core Specialty
                    </p>
                  </div>
                </div>

                {/* Profile Image */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl bg-sandstone border border-iron/80 flex items-center justify-center relative overflow-hidden my-3 shadow-2xs group-hover:scale-[1.01] transition-all duration-300">
                  <Image
                    src={meImage}
                    alt="Milon Mia - Full Stack Engineer"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Name & Title */}
                <div className="text-center my-2">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-obsidian tracking-tight">
                    {PERSONAL.name}
                  </p>
                  <p className="text-slate-teal text-xs sm:text-sm font-semibold mt-1">
                    {PERSONAL.title}
                  </p>
                  <p className="text-obsidian/60 text-xs font-normal mt-0.5">
                    {PERSONAL.location}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-bone/90 backdrop-blur-sm border border-emerald-600/30 mt-3 shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-obsidian text-xs font-semibold">
                    Available for Contracts &amp; SaaS Builds
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content & Strengths */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Bio & Mindset Cards */}
            <div className="space-y-4">
              {/* Lead Pitch Card */}
              <div className="p-6 sm:p-7 rounded-[24px] bg-paper-white border border-iron/90 shadow-2xs relative overflow-hidden group hover:border-obsidian/40 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-slate-teal" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-teal">
                    Engineering Approach
                  </span>
                </div>

                <p className="text-obsidian text-base sm:text-lg font-normal leading-relaxed">
                  I engineer{" "}
                  <strong className="font-semibold text-obsidian bg-sandstone/80 px-1.5 py-0.5 rounded border border-iron/40">
                    scalable backend architectures
                  </strong>{" "}
                  and{" "}
                  <strong className="font-semibold text-obsidian bg-sandstone/80 px-1.5 py-0.5 rounded border border-iron/40">
                    AI-integrated web applications
                  </strong>{" "}
                  tailored for business growth. Grounded in systematic problem
                  solving, I transform complex specs into maintainable,
                  production-ready code.
                </p>
              </div>

              {/* Systems-Thinking Mindset Card */}
              <div className="p-5 rounded-[24px] bg-sandstone/80 border border-iron/80 relative flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-paper-white border border-iron/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-obsidian shadow-2xs">
                  <Cpu className="w-5 h-5 text-slate-teal" />
                </div>
                <div className="space-y-1">
                  <p className="text-obsidian text-xs font-bold uppercase tracking-wider">
                    Electrical Engineering Background
                  </p>
                  <p className="text-obsidian/85 text-xs sm:text-sm font-normal leading-relaxed">
                    My foundation in electrical hardware shapes how I structure
                    software systems — modular, fault-tolerant, and optimized
                    for low latency and high throughput.
                  </p>
                </div>
              </div>
            </div>

            {/* Core strengths */}
            <div className="space-y-3">
              <p className="text-slate-teal text-xs font-bold uppercase tracking-wider">
                Core Engineering Capabilities
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STRENGTHS.map((strength, i) => {
                  const Icon = icons[i % icons.length];
                  const accentBg = [
                    "bg-mist-mint/30",
                    "bg-wisteria/25",
                    "bg-desert-clay/20",
                    "bg-dusty-sky/25",
                  ][i % 4];
                  return (
                    <div
                      key={strength.title}
                      className="p-4 rounded-2xl bg-paper-white border border-iron/90 hover:border-obsidian/30 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${accentBg} flex items-center justify-center flex-shrink-0 mt-0.5 border border-iron/40 group-hover:scale-105 transition-transform duration-200`}
                        >
                          <Icon className="w-4 h-4 text-obsidian/80" />
                        </div>
                        <div>
                          <p className="text-obsidian text-sm font-bold leading-tight mb-1">
                            {strength.title}
                          </p>
                          <p className="text-obsidian/65 text-xs font-normal leading-relaxed">
                            {strength.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Philosophy */}
            <blockquote className="border-l-2 border-slate-teal pl-4 py-1.5">
              <p className="text-obsidian font-serif text-sm sm:text-base font-normal leading-relaxed italic">
                &ldquo;Great engineering isn&apos;t about adding complexity —
                it&apos;s about solving business problems with clean, durable
                simplicity.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        <div className="pt-14 border-t border-iron/40 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label mb-2 block">
              Direct Value Proposition
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-obsidian tracking-tight">
              Why Work With a Solo Software Developer{" "}
              <span className="font-normal text-slate-teal">
                vs. an Agency?
              </span>
            </h3>
            <p className="text-obsidian/75 text-sm sm:text-base mt-3 leading-relaxed max-w-xl mx-auto">
              Agencies charge high retainers to pay for account reps, managers,
              and office overhead. Partnering directly with me provides smooth
              execution, faster delivery, and 100% single-point accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_SOLO_VS_AGENCY.map((item, idx) => {
              const iconAccentBg = [
                "bg-mist-mint/35",
                "bg-desert-clay/25",
                "bg-wisteria/30",
                "bg-dusty-sky/30",
              ][idx % 4];
              return (
                <div
                  key={item.id}
                  className="group p-6 rounded-2xl bg-paper-white border border-iron/80 shadow-2xs flex flex-col justify-between hover:border-obsidian/30 hover:-translate-y-1 hover:shadow-sm transition-all duration-300"
                >
                  <div>
                    {/* Numbered accent icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${iconAccentBg} border border-iron/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
                      >
                        {item.id === "direct-comm" && (
                          <MessageSquare className="w-4.5 h-4.5 text-obsidian/75" />
                        )}
                        {item.id === "zero-overhead" && (
                          <Zap className="w-4.5 h-4.5 text-obsidian/75" />
                        )}
                        {item.id === "rapid-execution" && (
                          <Rocket className="w-4.5 h-4.5 text-obsidian/75" />
                        )}
                        {item.id === "total-accountability" && (
                          <ShieldCheck className="w-4.5 h-4.5 text-obsidian/75" />
                        )}
                      </div>
                      <span className="text-obsidian/20 text-2xl font-serif font-bold leading-none select-none">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-obsidian text-[15px] font-bold mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-slate-teal text-[10px] font-mono font-bold uppercase tracking-wider mb-2.5">
                      {item.subtitle}
                    </p>
                    <p className="text-obsidian/60 text-xs sm:text-[13px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom 3-Column Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          {/* Card 1: Certifications */}
          <div className="rounded-2xl bg-paper-white border border-iron/80 p-6 shadow-2xs flex flex-col justify-between hover:border-obsidian/30 hover:-translate-y-0.5 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between border-b border-iron/40 pb-3 mb-4">
                <span className="text-slate-teal text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-obsidian" />
                  Certifications
                </span>
                <span className="text-[10px] font-mono font-medium text-obsidian/70 bg-bone px-2 py-0.5 rounded-md border border-iron/50">
                  Jun 2024
                </span>
              </div>
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.credentialId} className="space-y-1.5">
                  <p className="text-obsidian font-serif font-bold text-base">
                    {cert.title}
                  </p>
                  <p className="text-obsidian/70 text-xs font-medium">
                    {cert.issuer}
                  </p>
                  <p className="text-[11px] font-mono text-slate-teal font-medium pt-0.5">
                    ID: {cert.credentialId}
                  </p>
                  <p className="text-obsidian/75 text-xs leading-relaxed pt-2">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Education */}
          <div className="rounded-2xl bg-paper-white border border-iron/80 p-6 shadow-2xs flex flex-col justify-between hover:border-obsidian/30 hover:-translate-y-0.5 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between border-b border-iron/40 pb-3 mb-4">
                <span className="text-slate-teal text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-obsidian" />
                  Education
                </span>
                <span className="text-[10px] font-mono font-medium text-obsidian/70 bg-bone px-2 py-0.5 rounded-md border border-iron/50">
                  2019 – 2023
                </span>
              </div>
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="space-y-1.5">
                  <p className="text-obsidian font-serif font-bold text-base leading-snug">
                    {edu.degree}
                  </p>
                  <p className="text-obsidian/80 text-xs font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-obsidian/60 text-xs font-normal">
                    {edu.location}
                  </p>
                  {"description" in edu && (
                    <p className="text-obsidian/75 text-xs leading-relaxed pt-2">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Languages */}
          <div className="rounded-2xl bg-paper-white border border-iron/80 p-6 shadow-2xs flex flex-col justify-between hover:border-obsidian/30 hover:-translate-y-0.5 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between border-b border-iron/40 pb-3 mb-4">
                <span className="text-slate-teal text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-obsidian" />
                  Languages
                </span>
                <span className="text-[10px] font-mono font-medium text-obsidian/70 bg-bone px-2 py-0.5 rounded-md border border-iron/50">
                  Multilingual
                </span>
              </div>
              <div className="space-y-2.5">
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-2.5 rounded-xl bg-bone/70 border border-iron/60 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-obsidian text-xs">
                        {lang.name}
                      </span>
                      <span className="text-obsidian/60 text-[11px] ml-1.5">
                        ({lang.level})
                      </span>
                    </div>
                    <div className="flex gap-1.5 text-[10px] font-mono text-obsidian/70">
                      <span className="bg-paper-white px-1.5 py-0.5 rounded border border-iron/40">
                        Comp {lang.comp}
                      </span>
                      <span className="bg-paper-white px-1.5 py-0.5 rounded border border-iron/40">
                        Speak {lang.speak}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
