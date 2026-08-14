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

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  char: string;
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

    // Glowing Ambient Orbs (Warm Golden Yellow, Amber & Dark Crimson Red)
    let orbs: Orb[] = [];
    const orbColors = [
      { core: "rgba(217, 119, 6, 0.22)", glow: "rgba(217, 119, 6, 0)" },   // warm golden amber
      { core: "rgba(185, 28, 28, 0.18)", glow: "rgba(185, 28, 28, 0)" },   // dark crimson red
      { core: "rgba(245, 158, 11, 0.22)", glow: "rgba(245, 158, 11, 0)" }, // golden yellow
      { core: "rgba(153, 27, 27, 0.16)", glow: "rgba(153, 27, 27, 0)" },   // deep wine red
      { core: "rgba(231, 211, 191, 0.3)", glow: "rgba(231, 211, 191, 0)" }, // desert clay / warm tone
    ];

    const initOrbs = () => {
      orbs = [];
      const count = Math.min(Math.floor(width / 220), 7);
      for (let i = 0; i < count; i++) {
        const colorPair = orbColors[i % orbColors.length];
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 140 + 120,
          color: colorPair.core,
          glowColor: colorPair.glow,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Cursor Sparkle Dust
    let sparkles: Sparkle[] = [];
    const sparkleChars = ["✦", "✧", "•", "⁺", "✨"];
    const sparkleColors = [
      "rgba(217, 119, 6, ",   // amber gold
      "rgba(185, 28, 28, ",   // crimson red
      "rgba(245, 158, 11, ",  // golden yellow
      "rgba(153, 27, 27, ",   // dark wine red
    ];

    const addSparkle = (x: number, y: number) => {
      if (sparkles.length > 30) return;
      sparkles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        size: Math.random() * 9 + 7,
        alpha: 0.75,
        decay: Math.random() * 0.02 + 0.015,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        char: sparkleChars[Math.floor(Math.random() * sparkleChars.length)],
      });
    };

    initOrbs();

    let time = 0;

    let isTabVisible = true;

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

        const currentRadius = orb.radius + Math.sin(time + orb.phase) * 15;

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

        // Magnetic laser light beam connecting cursor to nearby energy orb
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260) {
          const lineAlpha = (1 - dist / 260) * 0.18;
          ctx.beginPath();
          ctx.moveTo(orb.x, orb.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // 2. Render Interactive Cursor Sparkle Dust Trail
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.font = `${s.size}px sans-serif`;
        ctx.fillStyle = `${s.color}${s.alpha})`;
        ctx.fillText(s.char, s.x, s.y);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
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
