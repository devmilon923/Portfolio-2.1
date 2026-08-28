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
    // Disable Lenis on touch devices / mobile screens to allow 100% native GPU touch scrolling
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768);

    if (isTouch) return;

    const lenis = new Lenis({
      lerp: 0.13,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.8,
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
