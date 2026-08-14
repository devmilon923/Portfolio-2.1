"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Download } from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const navRef = useRef<HTMLDivElement | null>(null);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Smoothly recalculate sliding backdrop pill position whenever activeSection changes
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current || !activeSection) return;
      const activeEl = navRef.current.querySelector(
        `a[href="${activeSection}"]`,
      ) as HTMLElement;
      if (activeEl) {
        const parentRect = navRef.current.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        setPillStyle({
          left: activeRect.left - parentRect.left,
          width: activeRect.width,
          opacity: 1,
        });
      }
    };

    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeSection]);

  // Throttled 60fps scroll detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 40);

          // Scroll progress percentage
          const totalScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            setScrollProgress(
              Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)),
            );
          }

          // Active Section Detection with viewport center & 50px buffer
          const viewportCenter = scrollY + window.innerHeight / 3;
          const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));

          let currentSection = "";
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop - 50;
              const height = el.offsetHeight;
              if (viewportCenter >= top && viewportCenter < top + height) {
                currentSection = `#${sectionId}`;
                break;
              }
            }
          }

          if (currentSection) {
            setActiveSection(currentSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setActiveSection(href);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300">
        <div
          className={`w-full rounded-full border transition-all duration-300 relative overflow-hidden group/bar ${
            scrolled
              ? "bg-paper-white/95 backdrop-blur-xl border-iron shadow-md py-2 px-4 sm:px-6"
              : "bg-paper-white/85 backdrop-blur-md border-iron/70 shadow-sm py-2.5 px-4 sm:px-6"
          }`}
        >
          {/* Subtle top glass sheen border */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-obsidian/15 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            {/* Logo with shimmer & hover scale */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="flex items-center gap-2.5 group/logo hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-obsidian flex items-center justify-center shadow-xs relative overflow-hidden group-hover/logo:shadow-md transition-all duration-300">
                <span className="font-serif text-paper-white text-xs font-bold leading-none group-hover/logo:scale-110 transition-transform duration-300">
                  DM
                </span>
                {/* Logo Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/logo:translate-x-full transition-transform duration-700 pointer-events-none" />
              </div>
              <span className="text-obsidian font-serif font-bold text-base sm:text-lg tracking-tight block">
                {PERSONAL.name.split(" ")[0]}{" "}
                <span className="text-slate-teal font-sans font-normal text-xs sm:text-sm">
                  {PERSONAL.name.split(" ")[1]}
                </span>
              </span>
            </a>

            {/* Desktop nav with smooth sliding backdrop pill */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center gap-1 bg-bone/60 p-1 rounded-full border border-iron/50 shadow-inner relative"
            >
              {/* Sliding Pill Background */}
              <span
                className="absolute top-1 bottom-1 rounded-full bg-paper-white shadow-xs border border-iron/60 transition-all duration-300 ease-out pointer-events-none z-0"
                style={{
                  left: `${pillStyle.left}px`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                }}
              />

              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative z-10 px-3.5 py-1.5 text-xs sm:text-sm font-medium tracking-tight transition-colors duration-200 rounded-full flex items-center ${
                      isActive
                        ? "text-obsidian font-semibold"
                        : "text-obsidian/75 hover:text-obsidian"
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-teal mr-1.5 animate-pulse" />
                    )}
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-2">
              {/* Seamless WhatsApp Button */}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={PERSONAL.whatsapp}
                className="relative flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-paper-white border border-iron hover:border-emerald-500/50 hover:bg-emerald-50/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs overflow-hidden group/wa"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp (+88 013 3079-2338)"
              >
                {/* Soft ambient hover glow */}
                <span className="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 group-hover/wa:opacity-100 transition-opacity duration-300" />
                <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex items-center justify-center relative z-10">
                  <Image
                    src="/whatsapp.gif"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="w-full h-full object-cover mix-blend-multiply scale-110 group-hover/wa:scale-125 transition-transform duration-300"
                    unoptimized
                  />
                </div>
              </a>

              {/* Resume Button */}
              <a
                target="_blank"
                href={PERSONAL.resumeUrl}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-obsidian text-paper-white text-xs sm:text-sm font-medium tracking-tight hover:bg-deep-teal hover:scale-[1.03] active:scale-95 transition-all shadow-xs relative overflow-hidden group/btn"
              >
                {/* Button Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />
                <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                <span>Resume</span>
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border border-iron text-obsidian hover:bg-bone active:scale-95 transition-all"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Scroll Progress Bar at bottom of navbar */}
          <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-transparent overflow-hidden rounded-full pointer-events-none">
            <div
              className="h-full bg-slate-teal/80 transition-all duration-150 rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Floating Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-18 sm:top-20 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-40 bg-paper-white/98 backdrop-blur-xl border border-iron rounded-3xl md:hidden shadow-xl p-3 animate-in fade-in zoom-in-95 duration-200">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2.5 text-sm font-medium rounded-2xl transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-bone text-obsidian font-semibold border border-iron/60"
                      : "text-obsidian/80 hover:bg-bone/60"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-slate-teal" />
                  )}
                </a>
              );
            })}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={PERSONAL.whatsapp}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-full bg-emerald-600 text-paper-white text-xs font-medium hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-white/20 p-0.5">
                  <Image
                    src="/whatsapp.gif"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-full h-full object-cover mix-blend-multiply scale-110"
                    unoptimized
                  />
                </div>
                WhatsApp
              </a>
              <a
                target="_blank"
                href={PERSONAL.resumeUrl}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-obsidian text-paper-white text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
