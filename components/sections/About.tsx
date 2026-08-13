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

/* ─── INTERACTIVE NEURAL NETWORK CONSTELLATION MESH ─────────────────── */
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

    // Create 36 Neural Nodes
    const nodes = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines between nearby nodes
      const maxDistance = 95;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(45, 95, 80, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Connect to mouse if hovering inside the card
      const mouse = mouseRef.current;
      if (mouse.x !== null && mouse.y !== null) {
        nodes.forEach((node) => {
          const dx = node.x - mouse.x!;
          const dy = node.y - mouse.y!;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.45;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x!, mouse.y!);
            ctx.strokeStyle = `rgba(20, 110, 90, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        });
      }

      // Draw and update neural nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const currentRadius = node.radius + Math.sin(node.pulse) * 0.4;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(35, 85, 70, 0.45)";
        ctx.shadowColor = "rgba(35, 85, 70, 0.4)";
        ctx.shadowBlur = 4;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
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
      className="absolute inset-0 w-full h-full pointer-events-none rounded-[32px] z-0"
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
              className="w-full h-full rounded-[32px] bg-paper-white border border-iron p-6 sm:p-7 flex flex-col justify-between items-center text-center shadow-sm relative group hover:border-obsidian/40 transition-colors overflow-hidden"
              style={{
                background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(45, 110, 90, 0.09), transparent 60%), #ffffff`,
              }}
            >
              {/* Interactive Neural Network Constellation Canvas */}
              <ProfileCardNeuralMesh />

              {/* Card Content (z-10 relative) */}
              <div className="relative z-10 w-full flex flex-col justify-between items-center h-full">
                {/* Badges Header Row */}
                <div className="w-full flex items-center justify-between gap-2 mb-3">
                  <div className="bg-bone/90 backdrop-blur-sm border border-iron rounded-xl px-3 py-1.5 text-left shadow-xs">
                    <p className="text-obsidian text-xs font-bold leading-tight">
                      1+ Year
                    </p>
                    <p className="text-obsidian/60 text-[10px] font-normal leading-tight">
                      Professional Exp.
                    </p>
                  </div>
                  <div className="bg-bone/90 backdrop-blur-sm border border-iron rounded-xl px-3 py-1.5 text-right shadow-xs">
                    <p className="text-obsidian text-xs font-bold leading-tight">
                      AI + Full-Stack
                    </p>
                    <p className="text-obsidian/60 text-[10px] font-normal leading-tight">
                      Core Specialty
                    </p>
                  </div>
                </div>

                {/* Profile Image */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl bg-sandstone border border-iron flex items-center justify-center relative overflow-hidden my-2 shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
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
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-bone/90 backdrop-blur-sm border border-iron mt-2 shadow-xs">
                  <span className="glow-dot w-2 h-2 bg-deep-teal" />
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
