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
} from "lucide-react";
import {
  PERSONAL,
  STRENGTHS,
  CERTIFICATIONS,
  EDUCATION,
  LANGUAGES,
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
      { threshold: 0.05 }
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
          orb.radius
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
        const currentAlpha = node.alpha + Math.sin(time * 2 + node.phase) * 0.15;
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
      className="py-20 lg:py-28 bg-bone relative overflow-hidden border-t border-b border-iron"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-16">
        {/* Section label & Title */}
        <div className="text-center">
          <p className="section-label mb-3">About</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em]">
            The developer{" "}
            <span className="italic font-normal">behind the code</span>
          </h2>
        </div>

        {/* Top Grid: Profile Card & Bio / Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Full-width Profile Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              onMouseMove={handleCardMouseMove}
              className="w-full h-full rounded-[32px] bg-paper-white border border-iron p-6 sm:p-7 flex flex-col justify-between items-center text-center shadow-sm relative group hover:border-amber-700/50 transition-all duration-500 overflow-hidden"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(217, 119, 6, 0.08), rgba(180, 83, 9, 0.03) 50%, transparent 80%), #ffffff`,
              }}
            >
              {/* Interactive Neural Network Constellation Canvas */}
              <ProfileCardNeuralMesh />

              {/* Card Content (z-10 relative) */}
              <div className="relative z-10 w-full flex flex-col justify-between items-center h-full">
                {/* Badges Header Row */}
                <div className="w-full flex items-center justify-between gap-2 mb-3">
                  <div className="bg-bone/90 backdrop-blur-sm border border-iron rounded-xl px-3 py-1.5 text-left shadow-xs group-hover:border-amber-700/40 transition-colors">
                    <p className="text-obsidian text-xs font-bold leading-tight">
                      1+ Year
                    </p>
                    <p className="text-obsidian/60 text-[10px] font-normal leading-tight">
                      Professional Exp.
                    </p>
                  </div>
                  <div className="bg-bone/90 backdrop-blur-sm border border-iron rounded-xl px-3 py-1.5 text-right shadow-xs group-hover:border-amber-700/40 transition-colors">
                    <p className="text-obsidian text-xs font-bold leading-tight">
                      AI + Full-Stack
                    </p>
                    <p className="text-obsidian/60 text-[10px] font-normal leading-tight">
                      Core Specialty
                    </p>
                  </div>
                </div>

                {/* Profile Image */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl bg-sandstone border-2 border-iron flex items-center justify-center relative overflow-hidden my-2 shadow-md group-hover:shadow-xl group-hover:shadow-amber-900/15 group-hover:border-amber-700/60 group-hover:scale-[1.02] transition-all duration-500">
                  <Image
                    src={meImage}
                    alt="My Profile Picture"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Name & Title */}
                <div className="text-center my-2">
                  <p className="font-serif text-2xl font-bold text-obsidian tracking-tight">
                    {PERSONAL.name}
                  </p>
                  <p className="text-slate-teal text-xs sm:text-sm font-medium mt-1">
                    {PERSONAL.title}
                  </p>
                  <p className="text-obsidian/60 text-xs font-normal mt-0.5">
                    {PERSONAL.location}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-bone/90 backdrop-blur-sm border border-iron mt-2 shadow-xs group-hover:border-amber-700/40 transition-colors">
                  <span className="glow-dot w-2 h-2 bg-amber-600" />
                  <span className="text-obsidian text-xs font-medium">
                    Open to Opportunities
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
              <div className="p-5 sm:p-6 rounded-2xl bg-paper-white border border-iron shadow-sm relative overflow-hidden group hover:border-obsidian/30 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-slate-teal animate-pulse" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-teal">
                    Engineering Focus
                  </span>
                </div>

                <p className="text-obsidian text-base sm:text-lg font-normal leading-relaxed">
                  I build{" "}
                  <strong className="font-semibold text-obsidian bg-sandstone/80 px-1.5 py-0.5 rounded border border-iron/40">
                    scalable backend systems
                  </strong>{" "}
                  and{" "}
                  <strong className="font-semibold text-obsidian bg-sandstone/80 px-1.5 py-0.5 rounded border border-iron/40">
                    AI-integrated applications
                  </strong>{" "}
                  that solve real business problems. With{" "}
                  <span className="font-bold text-slate-teal">
                    1+ year of professional experience
                  </span>{" "}
                  at an international agency, I specialize in turning complex
                  requirements into clean, performant, and maintainable code —{" "}
                  <span className="italic font-serif font-medium text-obsidian">
                    from architecture through deployment
                  </span>
                  .
                </p>
              </div>

              {/* Systems-Thinking Mindset Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-sandstone/70 border border-iron relative flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-paper-white border border-iron/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-obsidian shadow-xs">
                  <Cpu className="w-5 h-5 text-slate-teal" />
                </div>
                <div className="space-y-1">
                  <p className="text-obsidian text-xs font-bold uppercase tracking-wider text-slate-teal">
                    Systems-Thinking Mindset
                  </p>
                  <p className="text-obsidian/85 text-xs sm:text-sm font-normal leading-relaxed">
                    My background in{" "}
                    <strong className="font-semibold text-obsidian">
                      Electrical Engineering
                    </strong>{" "}
                    shapes how I approach software — every component serves a
                    purpose, every optimization has a reason.{" "}
                    <span className="italic font-serif font-medium text-obsidian">
                      "I don't just write code; I engineer solutions."
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Core strengths */}
            <div>
              <p className="text-slate-teal text-xs font-bold uppercase tracking-wider mb-4">
                Core Strengths
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STRENGTHS.map((strength, i) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <div
                      key={strength.title}
                      className="p-4 rounded-2xl bg-sandstone border border-iron hover:border-obsidian transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-paper-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          <Icon className="w-4 h-4 text-obsidian" />
                        </div>
                        <div>
                          <p className="text-obsidian text-sm font-bold leading-tight mb-1">
                            {strength.title}
                          </p>
                          <p className="text-obsidian/70 text-xs font-normal leading-relaxed">
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
            <blockquote className="border-l-2 border-obsidian pl-4 py-2">
              <p className="text-obsidian font-serif text-sm sm:text-base font-normal italic leading-relaxed">
                "Good software isn't about lines of code — it's about solving
                the right problem in the simplest way that lasts."
              </p>
              <p className="text-slate-teal text-xs font-medium mt-2">
                — Development philosophy
              </p>
            </blockquote>
          </div>
        </div>

        {/* Bottom 3-Column Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Card 1: Certifications */}
          <div className="rounded-2xl bg-paper-white border border-iron p-6 shadow-sm flex flex-col justify-between hover:border-obsidian/40 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-iron/60 pb-3 mb-4">
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
                  <p className="text-obsidian/70 text-xs leading-relaxed pt-2">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Education */}
          <div className="rounded-2xl bg-paper-white border border-iron p-6 shadow-sm flex flex-col justify-between hover:border-obsidian/40 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-iron/60 pb-3 mb-4">
                <span className="text-slate-teal text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-obsidian" />
                  Education
                </span>
                <span className="text-[10px] font-mono font-medium text-obsidian/70 bg-bone px-2 py-0.5 rounded-md border border-iron/50">
                  2019 – 2023
                </span>
              </div>
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="space-y-2">
                  <p className="text-obsidian font-serif font-bold text-base leading-snug">
                    {edu.degree}
                  </p>
                  <p className="text-obsidian/80 text-xs font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-obsidian/60 text-xs font-normal">
                    {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Languages */}
          <div className="rounded-2xl bg-paper-white border border-iron p-6 shadow-sm flex flex-col justify-between hover:border-obsidian/40 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-iron/60 pb-3 mb-4">
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
