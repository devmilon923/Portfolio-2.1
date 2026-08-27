"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  Download,
  User,
  FolderKanban,
  Layers,
  Cpu,
  Mail,
  ChevronRight,
  Github,
  Linkedin,
} from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About", href: "#about", code: "01", icon: User },
  { label: "Projects", href: "#projects", code: "02", icon: FolderKanban },
  { label: "Services", href: "#services", code: "03", icon: Layers },
  { label: "Tech Stack", href: "#stack", code: "04", icon: Cpu },
  { label: "Contact", href: "#contact", code: "05", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const navRef = useRef<HTMLDivElement | null>(null);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  const updatePill = useCallback(() => {
    if (!navRef.current || !activeSection) return;
    const activeEl = navRef.current.querySelector(
      `a[href="${activeSection}"]`
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
  }, [activeSection]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Throttled 60fps scroll detection & active section intersection
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
              Math.min(100, Math.max(0, (scrollY / totalScroll) * 100))
            );
          }

          // Active Section Detection (Only when not click scrolling)
          if (!isClickScrollingRef.current) {
            const sections = NAV_LINKS.map((link) =>
              link.href.replace("#", "")
            );
            let currentSection = "#about";
            const threshold = 140;

            for (let i = sections.length - 1; i >= 0; i--) {
              const sectionId = sections[i];
              const el = document.getElementById(sectionId);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= threshold) {
                  currentSection = `#${sectionId}`;
                  break;
                }
              }
            }

            if (currentSection) {
              setActiveSection(currentSection);
            }
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

    // Lock scroll-based section changes during click-driven smooth scrolling
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);
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
              className="hidden md:flex items-center gap-1 bg-bone/70 p-1 rounded-full border border-iron/60 shadow-inner relative"
            >
              {/* Sliding Pill Background with Smooth Cubic Bezier */}
              <span
                className="absolute top-1 bottom-1 rounded-full bg-paper-white shadow-2xs border border-iron/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0"
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

          {/* Hardware-Accelerated Smooth Scroll Progress Bar */}
          <div className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-iron/30 overflow-hidden rounded-full pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-slate-teal via-deep-teal to-emerald-500 transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(15,118,110,0.4)]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Floating Mobile menu Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-obsidian/40 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
          />

          {/* Floating Mobile Menu Card */}
          <div className="fixed top-[4.25rem] sm:top-[4.75rem] left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 bg-paper-white/98 backdrop-blur-2xl border border-iron/80 rounded-2xl md:hidden shadow-2xl p-4 max-h-[calc(100vh-5.5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-iron/50">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-teal">
                Navigation Menu
              </span>
              <span className="text-[10px] font-mono text-obsidian/40 font-semibold">
                05 SECTIONS
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                const Icon = link.icon;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                      isActive
                        ? "bg-slate-teal/10 text-slate-teal border border-slate-teal/25 font-bold shadow-2xs"
                        : "text-obsidian/80 hover:bg-bone/80 hover:text-obsidian border border-transparent active:scale-[0.98]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-slate-teal text-paper-white shadow-2xs"
                            : "bg-bone text-obsidian/60 group-hover:text-obsidian group-hover:bg-paper-white"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-semibold tracking-tight">
                        {link.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-obsidian/35 font-semibold">
                        {link.code}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive
                            ? "text-slate-teal translate-x-0.5"
                            : "text-obsidian/20 group-hover:text-obsidian/50 group-hover:translate-x-0.5"
                        }`}
                      />
                    </div>
                  </a>
                );
              })}
            </nav>

            {/* Action Buttons & Social Links Footer */}
            <div className="pt-3 mt-2 border-t border-iron/50 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={PERSONAL.whatsapp}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-600/30 text-emerald-950 text-xs font-semibold hover:bg-emerald-500/20 active:scale-95 transition-all shadow-2xs"
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                    <Image
                      src="/whatsapp.gif"
                      alt="WhatsApp"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover mix-blend-multiply scale-110"
                      unoptimized
                    />
                  </div>
                  <span>WhatsApp</span>
                </a>

                <a
                  target="_blank"
                  href={PERSONAL.resumeUrl}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-obsidian text-paper-white text-xs font-semibold hover:bg-deep-teal active:scale-95 transition-all shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>Resume</span>
                </a>
              </div>

              {/* Quick Connect Row */}
              <div className="flex items-center justify-between px-1 pt-1 text-[11px] text-obsidian/60 font-medium">
                <span className="font-mono text-[10px] uppercase text-obsidian/40 font-bold">
                  Quick Connect
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={PERSONAL.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-obsidian/80 hover:text-obsidian"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PERSONAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-obsidian/80 hover:text-slate-teal"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-slate-teal" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
