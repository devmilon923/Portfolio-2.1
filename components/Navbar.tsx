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
} from "lucide-react";
import { PERSONAL } from "@/lib/constants";

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
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  setMobileOpen: (open: boolean) => void;
  navHeight: number;
}

function MobileNavDrawer({
  NAV_LINKS,
  activeSection,
  handleNavClick,
  setMobileOpen,
  navHeight,
}: MobileNavDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap & Escape key handling
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus first focusable link/element in drawer
    const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables && focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }

      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [setMobileOpen]);

  return (
    <>
      {/* Non-interactive Backdrop Overlay */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-40 bg-obsidian/40 backdrop-blur-sm md:hidden transition-opacity animate-in fade-in duration-300"
      />

      {/* Floating Mobile Menu Card (Semantic Dialog) */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        style={{ top: `${navHeight}px` }}
        className="fixed left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 bg-paper-white/95 backdrop-blur-2xl backdrop-saturate-200 border border-iron/80 rounded-2xl md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-4 max-h-[calc(100vh-6.5rem)] overflow-y-auto transition-all animate-in fade-in slide-in-from-top-4 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-obsidian/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-wider text-obsidian/80">
              Navigation Menu
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-obsidian/70 bg-obsidian/5 px-2.5 py-0.5 rounded-full border border-obsidian/10">
            05 SECTIONS
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            const Icon = link.icon;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                  isActive
                    ? "bg-obsidian text-paper-white shadow-sm font-bold"
                    : "text-obsidian hover:bg-obsidian/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-white/20 text-paper-white shadow-2xs"
                        : "bg-obsidian/5 border border-obsidian/10 text-obsidian/80 group-hover:bg-obsidian group-hover:text-paper-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm tracking-tight ${
                      isActive
                        ? "font-bold text-paper-white"
                        : "font-semibold text-obsidian"
                    }`}
                  >
                    {link.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isActive
                        ? "text-paper-white/70"
                        : "text-obsidian/50 group-hover:text-obsidian/80"
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
              </a>
            );
          })}
        </nav>

        {/* Streamlined Action Footer */}
        <div className="pt-3 mt-3 border-t border-obsidian/10 flex items-center gap-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={PERSONAL.resumeUrl}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-obsidian text-paper-white text-xs font-semibold hover:bg-deep-teal transition-colors duration-200 shadow-2xs group/res"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download Resume</span>
          </a>

          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub Profile"
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-paper-white hover:bg-bone border border-obsidian/15 text-obsidian text-xs font-semibold transition-colors duration-200 shadow-2xs"
          >
            <Github className="w-4 h-4 text-obsidian" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [navHeight, setNavHeight] = useState<number>(72);

  const headerRef = useRef<HTMLElement | null>(null);
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
      `a[data-href="${activeSection}"]`
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

  // ResizeObserver for pill accuracy across layout shifts & font loading
  useEffect(() => {
    updatePill();
    if (!navRef.current) return;

    const ro = new ResizeObserver(() => {
      updatePill();
    });
    ro.observe(navRef.current);

    window.addEventListener("resize", updatePill);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePill);
    };
  }, [updatePill]);

  // Measure dynamic navbar bottom position for zero-overlap drawer placement
  const updateNavHeight = useCallback(() => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setNavHeight(Math.round(rect.bottom) + 12);
    }
  }, []);

  useEffect(() => {
    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, [updateNavHeight, scrolled, mobileOpen]);

  // Prevent layout shift when body scroll is locked
  useEffect(() => {
    if (mobileOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveSection(href);

    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    }

    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-transform duration-300"
      >
        <div
          className={`w-full rounded-full border transition-all duration-300 ease-out relative overflow-hidden group/bar ${
            scrolled
              ? "bg-paper-white/85 backdrop-blur-xl border-iron/80 shadow-sm shadow-obsidian/5 py-2.5 px-4 sm:px-6"
              : "bg-paper-white/60 backdrop-blur-md border-iron/50 shadow-xs py-3 sm:py-3.5 px-4 sm:px-6"
          }`}
        >
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-obsidian/15 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            {/* Logo Link */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              aria-label="DM Portfolio Home"
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
            </a>

            {/* Desktop Navigation */}
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
                  <a
                    key={link.href}
                    href={link.href}
                    data-href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative z-10 px-3.5 py-1.5 text-xs sm:text-sm font-medium tracking-tight transition-colors duration-200 rounded-full flex items-center ${
                      isActive
                        ? "text-obsidian font-semibold"
                        : "text-obsidian/75 hover:text-obsidian"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                target="_blank"
                rel="noopener noreferrer"
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
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border border-iron text-obsidian hover:bg-bone active:scale-95 transition-all duration-200"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
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
          navHeight={navHeight}
        />
      )}
    </>
  );
}

