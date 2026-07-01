"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
    icon: Github,
    label: "GitHub",
    value: "devmilon923",
    href: PERSONAL.github,
    action: "View Profile",
    color: "text-white",
    bg: "bg-white/5",
    border: "border-white/10",
    isNew: false,
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
    isNew: true,
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
    isNew: true,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-void relative overflow-hidden"
      ref={ref}
    >
      {/* Background glow */}
      <div className="mist-glow absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[320px] opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Contact</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5 text-balance">
            Let's build something <span className="gradient-text">amazing</span>
          </h2>
          <p className="text-ash text-base font-light max-w-lg mx-auto leading-relaxed">
            Have a project in mind? I'm currently available for freelance work,
            full-time roles, and technical consulting. Let's talk.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.15 + i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`clay-card p-5 flex items-center gap-4 group hover:border-opacity-40 cursor-pointer`}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-11 h-11 rounded-clay flex items-center justify-center flex-shrink-0 ${link.bg} border ${link.border}`}
                  >
                    <Icon className={`w-5 h-5 ${link.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-ash text-xs font-light mb-0.5">
                        {link.label}
                      </p>
                      {link.isNew && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cream/15 border border-cream/25 text-[9px] font-medium text-cream leading-none">
                          <Sparkles className="w-2 h-2" />
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-white text-sm font-medium truncate">
                      {link.value}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-ash group-hover:text-cream transition-colors">
                    <span className="text-xs font-light hidden sm:block">
                      {link.action}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Quick copy email */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <motion.button
            onClick={copyEmail}
            className="flex items-center gap-2 px-6 py-3 rounded-[12px] bg-charcoal border border-white/[0.08] text-white text-sm font-light hover:border-cream/20 transition-all group"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <Copy className="w-4 h-4 text-ash group-hover:text-cream transition-colors" />
            {copied ? (
              <span className="text-cream">Copied!</span>
            ) : (
              <span className="font-mono text-ash">{PERSONAL.email}</span>
            )}
          </motion.button>

          <motion.a
            href={`mailto:${PERSONAL.email}?subject=Project%20Inquiry`}
            className="flex items-center gap-2 px-6 py-3 rounded-[12px] bg-cream text-void text-sm font-medium shadow-clay-cream hover:shadow-clay-hover transition-all"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle className="w-4 h-4" />
            Start a Conversation
          </motion.a>
        </motion.div>

        {/* Availability note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal border border-white/[0.06]">
            <span className="glow-dot w-1.5 h-1.5" />
            <span className="text-ash text-xs font-light">
              Typically responds within 24 hours
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
