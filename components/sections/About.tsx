"use client";

import {
  Code2,
  Cpu,
  GitBranch,
  Globe,
  Award,
  GraduationCap,
  Globe2,
} from "lucide-react";
import {
  PERSONAL,
  STRENGTHS,
  CERTIFICATIONS,
  EDUCATION,
  LANGUAGES,
  STATS,
} from "@/lib/constants";
import meImage from "./../../assets/me.webp";
import Image from "next/image";

const icons = [Code2, Cpu, GitBranch, Globe];

function AboutCredentialsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
      <div className="rounded-2xl bg-paper-white border border-iron/80 p-6 shadow-2xs flex flex-col justify-between hover:border-obsidian/30 hover:shadow-sm transition-all duration-200">
        <div>
          <div className="flex items-center justify-between border-b border-iron/40 pb-3 mb-4">
            <span className="text-slate-teal text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-obsidian" />
              Certifications
            </span>
            <span className="text-[10px] font-mono font-medium text-obsidian/70 bg-bone px-2 py-0.5 rounded-md border border-iron/50">
              Jun 2024
            </span>
          </div>
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.credentialId} className="space-y-1.5">
              <p className="text-obsidian font-bold text-base">{cert.title}</p>
              <p className="text-obsidian/70 text-xs font-medium">
                {cert.issuer}
              </p>
              <p className="text-obsidian/75 text-xs leading-relaxed pt-2">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-paper-white border border-iron/80 p-6 shadow-2xs flex flex-col justify-between hover:border-obsidian/30 hover:shadow-sm transition-all duration-200">
        <div>
          <div className="flex items-center justify-between border-b border-iron/40 pb-3 mb-4">
            <span className="text-slate-teal text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-obsidian" />
              Education
            </span>
            <span className="text-[10px] font-mono font-medium text-obsidian/70 bg-bone px-2 py-0.5 rounded-md border border-iron/50">
              2019 – 2023
            </span>
          </div>
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="space-y-1.5">
              <p className="text-obsidian font-bold text-base leading-snug">
                {edu.degree}
              </p>
              <p className="text-obsidian/80 text-xs font-medium">
                {edu.institution}
              </p>
              <p className="text-obsidian/60 text-xs font-normal">
                {edu.location}
              </p>
              {"description" in edu && (
                <p className="text-obsidian/75 text-xs leading-relaxed pt-2">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-paper-white border border-iron/80 p-6 shadow-2xs flex flex-col justify-between hover:border-obsidian/30 hover:shadow-sm transition-all duration-200">
        <div>
          <div className="flex items-center justify-between border-b border-iron/40 pb-3 mb-4">
            <span className="text-slate-teal text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-obsidian" />
              Languages
            </span>
            <span className="text-[10px] font-mono font-medium text-obsidian/70 bg-bone px-2 py-0.5 rounded-md border border-iron/50">
              Multilingual
            </span>
          </div>
          <div className="space-y-2.5">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="p-2.5 rounded-xl bg-bone/70 border border-iron/60 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-obsidian text-xs">
                    {lang.name}
                  </span>
                  <span className="text-obsidian/60 text-[11px] ml-1.5">
                    ({lang.level})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-bone relative overflow-hidden border-t border-iron/60"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="section-label mb-3">About The Developer</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-3 text-balance">
            Engineering precision.{" "}
            <span className="font-normal text-slate-teal">
              Business results.
            </span>
          </h2>
          <p className="text-obsidian/75 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
            Building resilient, scalable web applications and AI solutions with
            modern full-stack architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Profile Card — Deep Studio Contrast Theme for B&W Portrait */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full h-full rounded-[32px] bg-gradient-to-b from-deep-teal via-[#06191d] to-obsidian border border-iron/20 p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-lg relative group hover:border-slate-teal/50 transition-colors duration-300 overflow-hidden">
              {/* Soft ambient background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,213,232,0.12)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative z-10 w-full flex flex-col justify-between items-center h-full">
                {/* Meta stats badges */}
                <div className="w-full flex items-center justify-between gap-2 mb-4">
                  <div className="bg-paper-white/[0.05] border border-slate-teal/20 backdrop-blur-xl rounded-xl px-3.5 py-2 text-left shadow-2xs">
                    <p className="text-paper-white text-[13px] font-bold leading-tight">
                      {STATS[0].value === 1.8 ? "2~" : `${STATS[0].value}${STATS[0].suffix}`} Years
                    </p>
                    <p className="text-dusty-sky/75 text-[10px] font-medium leading-tight mt-0.5">
                      {STATS[0].description}
                    </p>
                  </div>
                  <div className="bg-paper-white/[0.05] border border-slate-teal/20 backdrop-blur-xl rounded-xl px-3.5 py-2 text-right shadow-2xs">
                    <p className="text-paper-white text-[13px] font-bold leading-tight">
                      Full-Stack + AI
                    </p>
                    <p className="text-dusty-sky/75 text-[10px] font-medium leading-tight mt-0.5">
                      Primary Technical Focus
                    </p>
                  </div>
                </div>

                {/* B&W Portrait Image Container (100% seamless dark blending without border) */}
                <div className="w-48 sm:w-56 aspect-[896/1200] rounded-2xl bg-obsidian flex items-center justify-center relative overflow-hidden my-3 shadow-2xl group/img">
                  <Image
                    src={meImage}
                    alt="Milon Mia - Full Stack Engineer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.02]"
                    sizes="(max-width: 640px) 192px, 224px"
                    priority
                  />
                </div>

                {/* Developer identity info */}
                <div className="text-center my-2">
                  <p className="text-2xl sm:text-3xl font-bold text-paper-white tracking-tight">
                    {PERSONAL.name}
                  </p>
                  <p className="text-dusty-sky text-xs sm:text-sm font-semibold mt-1">
                    {PERSONAL.title}
                  </p>
                  <p className="text-paper-white/60 text-xs font-normal mt-0.5">
                    {PERSONAL.location}
                  </p>
                </div>

                {/* Availability status badge */}
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mt-3 shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-300 text-xs font-semibold">
                    Available for Contracts &amp; SaaS Builds
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Engineering content */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="p-6 sm:p-7 rounded-[24px] bg-paper-white border border-iron/90 shadow-2xs relative overflow-hidden group hover:border-obsidian/40 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-slate-teal" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-teal">
                    Engineering Approach
                  </span>
                </div>

                <p className="text-obsidian text-base sm:text-lg font-normal leading-relaxed">
                  I engineer{" "}
                  <strong className="font-semibold text-obsidian bg-sandstone/80 px-1.5 py-0.5 rounded border border-iron/40">
                    scalable backend architectures
                  </strong>{" "}
                  and{" "}
                  <strong className="font-semibold text-obsidian bg-sandstone/80 px-1.5 py-0.5 rounded border border-iron/40">
                    AI-integrated web applications
                  </strong>{" "}
                  tailored for business growth. Grounded in systematic problem
                  solving, I transform complex requirements into maintainable,
                  production-ready code.
                </p>
              </div>

              <div className="p-5 rounded-[24px] bg-sandstone/80 border border-iron/80 relative flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-paper-white border border-iron/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-obsidian shadow-2xs">
                  <Cpu className="w-5 h-5 text-slate-teal" />
                </div>
                <div className="space-y-1">
                  <p className="text-obsidian text-xs font-bold uppercase tracking-wider">
                    Full-Stack Software Architecture
                  </p>
                  <p className="text-obsidian/85 text-xs sm:text-sm font-normal leading-relaxed">
                    Structuring software systems to be modular, fault-tolerant,
                    and optimized for low latency and high throughput.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-slate-teal text-xs font-bold uppercase tracking-wider">
                Core Engineering Capabilities
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STRENGTHS.map((strength, i) => {
                  const Icon = icons[i % icons.length];
                  const accentBg = [
                    "bg-mist-mint/30",
                    "bg-wisteria/25",
                    "bg-desert-clay/20",
                    "bg-dusty-sky/25",
                  ][i % 4];
                  return (
                    <div
                      key={strength.title}
                      className="p-4 rounded-2xl bg-paper-white border border-iron/90 hover:border-obsidian/30 hover:shadow-sm transition-all duration-200 shadow-2xs group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${accentBg} flex items-center justify-center flex-shrink-0 mt-0.5 border border-iron/40 transition-colors duration-200`}
                        >
                          <Icon className="w-4 h-4 text-obsidian/80" />
                        </div>
                        <div>
                          <p className="text-obsidian text-sm font-bold leading-tight mb-1">
                            {strength.title}
                          </p>
                          <p className="text-obsidian/65 text-xs font-normal leading-relaxed">
                            {strength.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <blockquote className="border-l-2 border-slate-teal pl-4 py-1.5">
              <p className="text-obsidian text-sm sm:text-base font-normal leading-relaxed italic">
                &ldquo;Great engineering isn&apos;t about adding complexity —
                it&apos;s about solving business problems with clean, durable
                simplicity.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        <AboutCredentialsGrid />
      </div>
    </section>
  );
}
