"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  phase: number;
}


export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initOrbs();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      // Spawn interactive cursor sparkles on mouse movement
      const dx = currentX - lastMouseX;
      const dy = currentY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8) {
        addSparkle(currentX, currentY);
        lastMouseX = currentX;
        lastMouseY = currentY;
      }

      mouseX = currentX;
      mouseY = currentY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Glowing Ambient Orbs (Warm Subtle Golden Amber & Muted Tones)
    let orbs: Orb[] = [];
    const orbColors = [
      { core: "rgba(217, 119, 6, 0.08)", glow: "rgba(217, 119, 6, 0)" },   // subtle warm golden amber
      { core: "rgba(180, 83, 9, 0.06)", glow: "rgba(180, 83, 9, 0)" },    // soft bronze
      { core: "rgba(245, 158, 11, 0.07)", glow: "rgba(245, 158, 11, 0)" }, // soft yellow
      { core: "rgba(231, 211, 191, 0.12)", glow: "rgba(231, 211, 191, 0)" }, // desert clay tone
    ];

    const initOrbs = () => {
      orbs = [];
      const count = Math.min(Math.floor(width / 320), 4);
      for (let i = 0; i < count; i++) {
        const colorPair = orbColors[i % orbColors.length];
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 120 + 100,
          color: colorPair.core,
          glowColor: colorPair.glow,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Cursor Micro Dust Trail
    interface MicroDust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      decay: number;
      color: string;
    }

    let sparkles: MicroDust[] = [];
    const dustColors = [
      "rgba(217, 119, 6,",   // amber gold
      "rgba(245, 158, 11,",  // golden yellow
      "rgba(180, 83, 9,",    // subtle bronze
    ];

    const addSparkle = (x: number, y: number) => {
      if (sparkles.length > 16) return;
      sparkles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.3 - 0.1,
        radius: Math.random() * 1.2 + 0.8,
        alpha: 0.5,
        decay: Math.random() * 0.02 + 0.02,
        color: dustColors[Math.floor(Math.random() * dustColors.length)],
      });
    };

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    initOrbs();

    let time = 0;
    let isTabVisible = true;
    let startTimer: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (!isTabVisible) {
        cancelAnimationFrame(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // 1. Render Floating Ambient Aurora Orbs
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -100) orb.x = width + 100;
        if (orb.x > width + 100) orb.x = -100;
        if (orb.y < -100) orb.y = height + 100;
        if (orb.y > height + 100) orb.y = -100;

        const currentRadius = orb.radius + Math.sin(time + orb.phase) * 10;

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          currentRadius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, orb.glowColor);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Interactive Micro Dust Trail
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${s.color}${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Defer start until after initial paint window
    startTimer = setTimeout(() => {
      render();
    }, 400);

    return () => {
      clearTimeout(startTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Background canvas for ambient aurora glowing orbs + interactive sparkle trail */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
