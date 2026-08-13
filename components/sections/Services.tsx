"use client";

import { Bug, Rocket, Layers, Check, MessageSquare } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const icons = { bug: Bug, rocket: Rocket, layers: Layers };

const PLATFORMS = [
  { name: "Fiverr", color: "#1DBF73", initial: "Fi" },
  { name: "Upwork", color: "#6FDA44", initial: "Up" },
  { name: "Direct", color: "var(--color-cream)", initial: "DM" },
];

const pastelBgs = ["bg-dusty-sky", "bg-mist-mint", "bg-wisteria"];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-paper-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Services</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-4">
            What I <span className="italic font-normal">build for you</span>
          </h2>
          <p className="text-obsidian/70 text-base sm:text-lg font-normal max-w-lg mx-auto leading-relaxed">
            From quick bug fixes to full product builds — tailored solutions for
            startups, agencies, and growing teams.
          </p>
        </div>

        {/* Service cards with Pastel Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Rocket;
            const pastelBg = pastelBgs[i % pastelBgs.length];
            return (
              <div
                key={service.id}
                className={`${pastelBg} p-8 rounded-2xl flex flex-col justify-between h-full border border-obsidian/10 transition-all duration-300 hover:border-obsidian hover:-translate-y-1`}
              >
                {/* Top row */}
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-paper-white flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-obsidian" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-paper-white/80 text-obsidian border border-obsidian/10">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-obsidian tracking-[-0.03em] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-obsidian/80 text-sm font-normal leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-obsidian text-paper-white flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-obsidian text-xs font-medium leading-relaxed">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price + CTA */}
                <div className="pt-5 border-t border-obsidian/15 flex items-center justify-between">
                  <p className="text-obsidian text-xs font-bold">
                    {service.price}
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-obsidian text-paper-white text-xs font-medium hover:bg-deep-teal hover:scale-105 active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Get Quote
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-2xl bg-sandstone border border-iron flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div>
            <p className="text-obsidian font-serif text-lg font-bold mb-1">
              Work with me securely
            </p>
            <p className="text-obsidian/70 text-xs font-normal">
              Projects can be handled through established freelance platforms or
              direct contracts.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-paper-white border border-iron hover:border-obsidian hover:scale-105 hover:-translate-y-0.5 transition-all cursor-default"
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                  style={{ background: p.color }}
                >
                  {p.initial.charAt(0)}
                </span>
                <span className="text-obsidian text-xs font-medium">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
