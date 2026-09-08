"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL = [
  { icon: Github, href: PERSONAL.github, label: "GitHub" },
  { icon: Linkedin, href: PERSONAL.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${PERSONAL.email}`, label: "Email" },
];

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer() {

  return (
    <footer className="bg-paper-white border-t border-iron py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-obsidian flex items-center justify-center">
                <span className="font-serif text-paper-white text-xs font-bold leading-none">
                  DM
                </span>
              </div>
              <span className="text-obsidian font-serif font-bold text-base tracking-tight">
                {PERSONAL.name}
              </span>
            </div>
            <p className="text-obsidian/70 text-xs font-normal max-w-xs leading-relaxed">
              Backend-focused Full-Stack Developer building AI-integrated
              systems and scalable infrastructure for clients worldwide.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  document
                    .querySelector(link.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-obsidian/80 text-xs font-medium hover:text-obsidian transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-iron mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-obsidian/60 text-xs font-normal">
            &copy; {new Date().getFullYear()} {PERSONAL.name}. Built with Next.js & TypeScript.
          </p>

          {/* Social + Scroll top */}
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-obsidian/70 hover:text-obsidian transition-colors duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}

            <span className="w-px h-4 bg-iron" />

            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-full bg-bone border border-iron flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-paper-white transition-colors duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
