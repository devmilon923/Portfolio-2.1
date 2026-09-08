"use client";

import {
  Github,
  Linkedin,
  Copy,
  ExternalLink,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import { useState } from "react";

const contactLinks = [
  {
    icon: MessageCircle,
    label: "Direct WhatsApp",
    value: PERSONAL.phone,
    href: PERSONAL.whatsapp,
    action: "Chat Now",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    isNew: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "devmilon",
    href: PERSONAL.linkedin,
    action: "Connect",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    isNew: false,
  },
  {
    icon: ({ className }: { className: string }) => (
      <span
        className={`${className} font-display font-black leading-none`}
        style={{ fontSize: "0.95rem" }}
      >
        fi
      </span>
    ),
    label: "Fiverr",
    value: "devmilon923",
    href: PERSONAL.fiverr,
    action: "Hire me",
    color: "text-[#1DBF73]",
    bg: "bg-[#1DBF73]/10",
    border: "border-[#1DBF73]/20",
    isNew: false,
  },
  {
    icon: ({ className }: { className: string }) => (
      <span
        className={`${className} font-display font-black leading-none`}
        style={{ fontSize: "0.8rem" }}
      >
        Up
      </span>
    ),
    label: "Upwork",
    value: "Milon Mia",
    href: PERSONAL.upwork,
    action: "Hire me",
    color: "text-[#14a800]",
    bg: "bg-[#14a800]/10",
    border: "border-[#14a800]/20",
    isNew: false,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-bone relative overflow-hidden border-t border-iron"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">Get In Touch</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-4 text-balance">
            Let&apos;s build something{" "}
            <span className=" font-normal">amazing</span>
          </h2>
          <p className="text-obsidian/75 text-base sm:text-lg font-normal max-w-lg mx-auto leading-relaxed">
            Have a web app, SaaS, or AI feature in mind? I&apos;m available for
            direct freelance projects, contract builds, and technical
            consulting.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="bg-paper-white border border-iron rounded-2xl p-5 flex items-center gap-4 group hover:border-obsidian hover:shadow-sm transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-sandstone flex items-center justify-center flex-shrink-0 border border-iron">
                    <Icon className="w-5 h-5 text-obsidian" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-slate-teal text-xs font-bold mb-0.5">
                        {link.label}
                      </p>
                      {link.isNew && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-950 border border-emerald-600/30">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                          Fastest
                        </span>
                      )}
                    </div>
                    <p className="text-obsidian text-sm sm:text-base font-bold truncate">
                      {link.value}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-obsidian/60 group-hover:text-obsidian transition-colors">
                    <span className="text-xs font-medium hidden sm:block">
                      {link.action}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Quick copy email & WhatsApp Direct CTA */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a
            href={PERSONAL.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 text-paper-white text-sm font-semibold hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-transform shadow-sm w-full sm:w-auto text-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </a>

          <button
            onClick={copyEmail}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-obsidian text-paper-white text-sm font-medium hover:bg-deep-teal hover:scale-105 active:scale-95 transition-transform shadow-sm w-full sm:w-auto"
          >
            <Copy className="w-4 h-4" />
            <span>
              {copied
                ? "Copied to clipboard!"
                : `Copy Email: ${PERSONAL.email}`}
            </span>
          </button>
        </div>

        {/* Availability note */}
        <div className="mt-10 text-center space-y-1">
          <p className="text-slate-teal text-xs font-bold uppercase tracking-wider">
            ⚡ {PERSONAL.responseTime} · {PERSONAL.timezone}
          </p>
          <p className="text-obsidian/60 text-xs">
            Direct developer communication — zero agency overhead.
          </p>
        </div>
      </div>
    </section>
  );
}
