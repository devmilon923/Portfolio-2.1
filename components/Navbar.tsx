"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-void/90 backdrop-blur-xl border-b border-white/[0.06] shadow-clay-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shadow-clay-sm">
                <span className="font-display text-void text-sm font-black leading-none">
                  DM
                </span>
              </div>
              <span className="text-white font-medium text-lg tracking-tight hidden sm:block">
                {PERSONAL.name.split(" ")[0]}{" "}
                <span className="text-ash font-light">
                  {PERSONAL.name.split(" ")[1]}
                </span>
              </span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-4 py-2 text-sm text-ash hover:text-white font-light tracking-tight transition-colors duration-200 rounded-lg hover:bg-white/[0.05]"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <motion.a
                target="_blank"
                href={PERSONAL.resumeUrl}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-[10px] bg-cream text-void text-sm font-medium tracking-tight shadow-clay-sm hover:shadow-clay-md transition-all duration-200"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </motion.a>

              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.08] text-ash hover:text-white hover:bg-white/[0.05] transition-colors"
                whileTap={{ scale: 0.93 }}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-charcoal/95 backdrop-blur-xl border-b border-white/[0.06] md:hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 text-sm text-ash hover:text-white font-light rounded-xl hover:bg-white/[0.05] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                target="_blank"
                href={PERSONAL.resumeUrl}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-cream text-void text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
