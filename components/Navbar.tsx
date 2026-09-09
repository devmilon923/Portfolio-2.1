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
  isDarkSection: boolean;
  handleNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
  setMobileOpen: (open: boolean) => void;
  navHeight: number;
}

function MobileNavDrawer({
  NAV_LINKS,
  activeSection,
  isDarkSection,
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
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
        className="fixed inset-0 z-40 bg-obsidian/50 backdrop-blur-sm md:hidden transition-opacity animate-in fade-in duration-300"
      />

      {/* Floating Mobile Menu Card (Semantic Dialog) */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        style={{ top: `${navHeight}px` }}
        className={`fixed left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 backdrop-blur-2xl backdrop-saturate-200 rounded-2xl md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-4 max-h-[calc(100vh-6.5rem)] overflow-y-auto transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${
          isDarkSection
            ? "bg-obsidian/95 border border-white/10 text-paper-white"
            : "bg-paper-white/95 border border-iron/80 text-obsidian"
        }`}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-obsidian/10">
          <span
            className={`text-xs  font-bold uppercase tracking-wider ${
              isDarkSection ? "text-dusty-sky" : "text-slate-teal"
            }`}
          >
            Navigation
          </span>
          <span
            className={`text-[10px]  font-medium px-2 py-0.5 rounded-full border ${
              isDarkSection
                ? "bg-white/10 text-paper-white/80 border-white/10"
                : "bg-bone text-obsidian/60 border-iron/60"
            }`}
          >
            Quick Links
          </span>
        </div>

        {/* Dynamic Nav links list */}
        <nav className="space-y-1">
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
                    ? isDarkSection
                      ? "bg-paper-white text-obsidian shadow-sm font-bold"
                      : "bg-obsidian text-paper-white shadow-sm font-bold"
                    : isDarkSection
                      ? "text-paper-white hover:bg-white/10 border border-transparent"
                      : "text-obsidian hover:bg-obsidian/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${
                      isActive
                        ? isDarkSection
                          ? "bg-obsidian/10 text-obsidian shadow-2xs"
                          : "bg-white/20 text-paper-white shadow-2xs"
                        : isDarkSection
                          ? "bg-white/10 border border-white/10 text-paper-white group-hover:bg-paper-white group-hover:text-obsidian"
                          : "bg-obsidian/5 border border-obsidian/10 text-obsidian/80 group-hover:bg-obsidian group-hover:text-paper-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm tracking-tight font-semibold">
                    {link.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs  font-bold opacity-60">
                    {link.code}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? "translate-x-0.5"
                        : "opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
                    }`}
                  />
                </div>
              </a>
            );
          })}
        </nav>

        {/* Streamlined Action Footer */}
        <div
          className={`pt-3 mt-3 border-t flex items-center gap-2 ${
            isDarkSection ? "border-white/10" : "border-obsidian/10"
          }`}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={PERSONAL.resumeUrl}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors duration-200 shadow-2xs group/res ${
              isDarkSection
                ? "bg-paper-white text-obsidian hover:bg-bone"
                : "bg-obsidian text-paper-white hover:bg-deep-teal"
            }`}
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download Resume</span>
          </a>

          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub Profile"
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 shadow-2xs border ${
              isDarkSection
                ? "bg-white/10 hover:bg-white/20 border-white/10 text-paper-white"
                : "bg-paper-white hover:bg-bone border-obsidian/15 text-obsidian"
            }`}
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [navHeight, setNavHeight] = useState(72);
  const headerRef = useRef<HTMLElement>(null);

  const DARK_SECTIONS = ["#stack"];
  const isDarkSection = DARK_SECTIONS.includes(activeSection);

  const [pillStyle, setPillStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLElement>(null);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic pill positioning
  const updatePill = useCallback(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(
      `a[data-href="${activeSection}"]`,
    );

    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      setPillStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  // Update nav height dynamically
  useEffect(() => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setNavHeight(rect.bottom + 8);
    }
  }, [scrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
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
              link.href.replace("#", ""),
            );
            let currentSection = "#about";
            const threshold = 140;

            for (let i = sections.length - 1; i >= 0; i--) {
              const el = document.getElementById(sections[i]);
              if (el && el.getBoundingClientRect().top <= threshold) {
                currentSection = `#${sections[i]}`;
                break;
              }
            }
            setActiveSection(currentSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveSection(href);
    isClickScrollingRef.current = true;

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    if (window.history.pushState) window.history.pushState(null, "", href);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
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
            isDarkSection
              ? "bg-obsidian/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/30 py-2.5 px-4 sm:px-6 text-paper-white"
              : scrolled
                ? "bg-paper-white/85 backdrop-blur-xl border-iron/80 shadow-sm shadow-obsidian/5 py-2.5 px-4 sm:px-6 text-obsidian"
                : "bg-paper-white/60 backdrop-blur-md border-iron/50 shadow-xs py-3 sm:py-3.5 px-4 sm:px-6 text-obsidian"
          }`}
        >
          <div
            className={`absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r ${
              isDarkSection
                ? "from-transparent via-white/15 to-transparent"
                : "from-transparent via-obsidian/15 to-transparent"
            } pointer-events-none`}
          />

          <div className="flex items-center justify-between relative z-10">
            {/* Logo Link */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              aria-label="DM Portfolio Home"
              className="flex items-center gap-2.5 group/logo text-left"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs relative overflow-hidden group-hover/logo:shadow-sm transition-all duration-300 ${
                  isDarkSection
                    ? "bg-paper-white text-obsidian"
                    : "bg-obsidian text-paper-white"
                }`}
              >
                <span className="font-serif text-xs font-bold leading-none">
                  DM
                </span>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                    isDarkSection ? "via-black/15" : "via-white/25"
                  } to-transparent -translate-x-full group-hover/logo:translate-x-full transition-transform duration-700 pointer-events-none`}
                />
              </div>
              <span
                className={`font-serif font-bold text-base sm:text-lg tracking-tight block transition-colors duration-300 ${
                  isDarkSection ? "text-paper-white" : "text-obsidian"
                }`}
              >
                {PERSONAL.name.split(" ")[0]}{" "}
                <span
                  className={`font-sans font-medium text-xs sm:text-sm transition-colors duration-300 ${
                    isDarkSection ? "text-dusty-sky" : "text-slate-teal"
                  }`}
                >
                  {PERSONAL.name.split(" ")[1]}
                </span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav
              ref={navRef}
              className={`hidden md:flex items-center gap-1 p-1 rounded-full border transition-all duration-300 relative ${
                isDarkSection
                  ? "bg-white/10 border-white/10 shadow-inner"
                  : "bg-bone/70 border-iron/60 shadow-inner"
              }`}
            >
              <span
                className={`absolute top-1 bottom-1 rounded-full shadow-2xs border transition-[left,width,opacity,background-color,border-color] duration-300 ease-out pointer-events-none z-0 ${
                  isDarkSection
                    ? "bg-paper-white border-paper-white/80"
                    : "bg-paper-white border-iron/80"
                }`}
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
                        ? "text-obsidian font-bold"
                        : isDarkSection
                          ? "text-paper-white/80 hover:text-paper-white"
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
                className={`hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 shadow-xs relative overflow-hidden group/btn ${
                  isDarkSection
                    ? "bg-paper-white text-obsidian hover:bg-bone"
                    : "bg-obsidian text-paper-white hover:bg-deep-teal"
                }`}
              >
                <span
                  className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                    isDarkSection ? "via-black/10" : "via-white/20"
                  } to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none`}
                />
                <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                <span>Resume</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden w-8 h-8 flex items-center justify-center rounded-full border active:scale-95 transition-all duration-200 ${
                  isDarkSection
                    ? "border-white/10 text-paper-white hover:bg-paper-white/10"
                    : "border-iron text-obsidian hover:bg-bone"
                }`}
                aria-label={
                  mobileOpen ? "Close navigation menu" : "Open navigation menu"
                }
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
          isDarkSection={isDarkSection}
          handleNavClick={handleNavClick}
          setMobileOpen={setMobileOpen}
          navHeight={navHeight}
        />
      )}
    </>
  );
}
