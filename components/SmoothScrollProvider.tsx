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
      // How quickly the scroll "catches up" to the pointer.
      // 0.06–0.1 is the sweet-spot for a premium feel.
      lerp: 0.075,
      // Multiplier for wheel/trackpad scroll speed.
      wheelMultiplier: 1.0,
      // Multiplier for touch scroll speed.
      touchMultiplier: 1.5,
      // Infinity = unlimited scroll distance per event.
      infinite: false,
      // Keeps the scroll direction natural (not inverted).
      gestureOrientation: "vertical",
      // Smooth wheel on all devices (true = uses lerp for wheel too).
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
