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

interface MobileNavDrawerProps {
  NAV_LINKS: typeof NAV_LINKS;
  activeSection: string;
  handleNavClick: (href: string) => void;
  setMobileOpen: (open: boolean) => void;
}

function MobileNavDrawer({
  NAV_LINKS,
  activeSection,
  handleNavClick,
  setMobileOpen,
}: MobileNavDrawerProps) {
  return (
    <>
      {/* Backdrop Overlay */}
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-40 bg-obsidian/40 backdrop-blur-sm md:hidden transition-opacity animate-in fade-in duration-300 border-none cursor-pointer"
      />

      {/* Floating Mobile Menu Card */}
      <div className="fixed top-[4.25rem] sm:top-[4.75rem] left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 bg-paper-white/75 backdrop-blur-2xl backdrop-saturate-200 border border-white/80 rounded-2xl md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 max-h-[calc(100vh-5.5rem)] overflow-y-auto transition-transform animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-obsidian/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-obsidian/80">
              Navigation Menu
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-obsidian/70 bg-obsidian/5 px-2.5 py-0.5 rounded-full border border-obsidian/10">
            05 SECTIONS
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            const Icon = link.icon;

            return (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`px-3 py-2 rounded-xl transition-transform duration-200 flex items-center justify-between group text-left ${
                  isActive
                    ? "bg-obsidian text-paper-white shadow-sm font-bold"
                    : "text-obsidian hover:bg-obsidian/5 border border-transparent active:scale-[0.98]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform shrink-0 ${
                      isActive
                        ? "bg-white/20 text-paper-white shadow-2xs"
                        : "bg-obsidian/5 border border-obsidian/10 text-obsidian/80 group-hover:bg-obsidian group-hover:text-paper-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm tracking-tight ${
                      isActive ? "font-bold text-paper-white" : "font-semibold text-obsidian"
                    }`}
                  >
                    {link.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      isActive ? "text-paper-white/70" : "text-obsidian/45 group-hover:text-obsidian/80"
                    }`}
                  >
                    {link.code}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? "text-paper-white translate-x-0.5"
                        : "text-obsidian/30 group-hover:text-obsidian group-hover:translate-x-0.5"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Social Links Footer */}
        <div className="pt-3 mt-3 border-t border-obsidian/10 space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={PERSONAL.whatsapp}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-bold hover:bg-emerald-500/20 active:scale-[0.98] transition-transform shadow-2xs group/wa"
            >
              <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                <Image
                  src="/whatsapp.gif"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="w-full h-full object-cover mix-blend-multiply scale-110 group-hover/wa:scale-125 transition-transform"
                  unoptimized
                />
              </div>
              <span>WhatsApp</span>
            </a>

            <a
              target="_blank"
              href={PERSONAL.resumeUrl}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-obsidian text-paper-white text-xs font-bold hover:bg-deep-teal active:scale-[0.98] transition-transform shadow-2xs group/res"
            >
              <Download className="w-3.5 h-3.5 shrink-0 group-hover/res:-translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </a>
          </div>

          {/* Quick Connect Row */}
          <div className="flex items-center justify-between px-0.5 pt-0.5 text-[11px]">
            <span className="font-mono text-[10px] uppercase text-obsidian/50 font-bold tracking-wider">
              Quick Connect
            </span>
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian/5 hover:bg-obsidian/10 border border-obsidian/10 text-obsidian text-xs font-semibold transition-transform active:scale-95"
              >
                <Github className="w-3.5 h-3.5 text-obsidian" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian/5 hover:bg-obsidian/10 border border-obsidian/10 text-obsidian text-xs font-semibold transition-transform active:scale-95"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#about");

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

  const updatePill = useCallback(() => {
    if (!navRef.current || !activeSection) return;
    const activeEl = navRef.current.querySelector(
      `button[data-href="${activeSection}"]`
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

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 40);

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
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-transform duration-300">
        <div
          className={`w-full rounded-full border transition-colors duration-300 relative overflow-hidden group/bar ${
            scrolled
              ? "bg-paper-white/80 backdrop-blur-xl border-iron/80 shadow-sm shadow-obsidian/5 py-2.5 px-4 sm:px-6"
              : "bg-paper-white/60 backdrop-blur-md border-iron/50 shadow-xs py-3.5 px-4 sm:px-6"
          }`}
        >
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-obsidian/15 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <button
              type="button"
              onClick={() => handleNavClick("#hero")}
              className="flex items-center gap-2.5 group/logo text-left"
            >
              <div className="w-8 h-8 rounded-full bg-obsidian flex items-center justify-center shadow-xs relative overflow-hidden group-hover/logo:shadow-sm transition-shadow duration-300">
                <span className="font-serif text-paper-white text-xs font-bold leading-none">
                  DM
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/logo:translate-x-full transition-transform duration-700 pointer-events-none" />
              </div>
              <span className="text-obsidian font-serif font-bold text-base sm:text-lg tracking-tight block">
                {PERSONAL.name.split(" ")[0]}{" "}
                <span className="text-deep-teal font-sans font-medium text-xs sm:text-sm">
                  {PERSONAL.name.split(" ")[1]}
                </span>
              </span>
            </button>

            <nav
              ref={navRef}
              className="hidden md:flex items-center gap-1 bg-bone/70 p-1 rounded-full border border-iron/60 shadow-inner relative"
            >
              <span
                className="absolute top-1 bottom-1 rounded-full bg-paper-white shadow-2xs border border-iron/80 transition-[left,width,opacity] duration-300 ease-out pointer-events-none z-0"
                style={{
                  left: `${pillStyle.left}px`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                }}
              />

              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    type="button"
                    data-href={link.href}
                    onClick={() => handleNavClick(link.href)}
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
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                target="_blank"
                href={PERSONAL.resumeUrl}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-obsidian text-paper-white text-xs sm:text-sm font-medium tracking-tight hover:bg-deep-teal transition-colors duration-200 shadow-xs relative overflow-hidden group/btn"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />
                <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                <span>Resume</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border border-iron text-obsidian hover:bg-bone active:scale-95 transition-transform"
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
        </div>
      </header>

      {mobileOpen && (
        <MobileNavDrawer
          NAV_LINKS={NAV_LINKS}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          setMobileOpen={setMobileOpen}
        />
      )}
    </>
  );
}
