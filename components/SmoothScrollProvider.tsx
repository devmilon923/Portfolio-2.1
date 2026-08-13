"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScrollProvider
 *
 * Uses Lenis for buttery 60fps smooth scrolling. Runs its RAF loop via
 * requestAnimationFrame so it syncs perfectly with the browser's native
 * paint cycle — never a frame behind. CSS `scroll-behavior: smooth` is
 * intentionally left in globals.css for anchor-link fallback; Lenis
 * will override the actual scroll behaviour.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Snappier lerp (0.13) eliminates scroll lag/heaviness for a lightweight, responsive feel
      lerp: 0.13,
      // Increased wheel multiplier for immediate, responsive feedback
      wheelMultiplier: 1.15,
      // Responsive touch scroll multiplier
      touchMultiplier: 1.8,
      // Exponential decay easing for instant start & silky deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Drive Lenis with the native rAF loop — guaranteed 60fps+.
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose the Lenis instance globally so any component can call
    // window.__lenis.scrollTo('#section') for programmatic scrolling.
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
