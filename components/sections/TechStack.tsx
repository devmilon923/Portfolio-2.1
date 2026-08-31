"use client";

import { useState } from "react";
import { TECH_STACK, TECH_CATEGORIES } from "@/lib/constants";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiTanstack,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiNginx,
  SiGithubactions,
  SiVercel,
  SiLinux,
} from "react-icons/si";
import { TbBrandOpenai, TbBrandAws, TbBinaryTree, TbStack3 } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";

// Map tech item name to official brand SVG component & high-contrast brand color for dark backgrounds
const TECH_ICON_MAP: Record<
  string,
  { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }
> = {
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  TypeScript: { icon: SiTypescript, color: "#529CFF" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  "React Query": { icon: SiTanstack, color: "#FF4154" },
  "Shadcn UI": { icon: SiShadcnui, color: "#FFFFFF" },
  "Node.js": { icon: SiNodedotjs, color: "#68BC55" },
  "Express.js": { icon: SiExpress, color: "#F0F0F0" },
  "Socket.IO": { icon: SiSocketdotio, color: "#FFFFFF" },
  BullMQ: { icon: TbStack3, color: "#FF7A50" },
  GraphQL: { icon: SiGraphql, color: "#E10098" },
  PostgreSQL: { icon: SiPostgresql, color: "#6B96FF" },
  MongoDB: { icon: SiMongodb, color: "#52C453" },
  Redis: { icon: SiRedis, color: "#FF5252" },
  Prisma: { icon: SiPrisma, color: "#8B9BFF" },
  Pinecone: { icon: TbBinaryTree, color: "#00F5B2" },
  "OpenAI API": { icon: TbBrandOpenai, color: "#10C895" },
  "AWS EC2": { icon: TbBrandAws, color: "#FF9900" },
  Docker: { icon: SiDocker, color: "#38A5FF" },
  Nginx: { icon: SiNginx, color: "#00C84B" },
  "GitHub Actions": { icon: SiGithubactions, color: "#389BFF" },
  Vercel: { icon: SiVercel, color: "#FFFFFF" },
  "AWS S3": { icon: FaAws, color: "#FF9900" },
  Linux: { icon: SiLinux, color: "#FCC624" },
};

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = TECH_STACK.filter(
    (t) => activeCategory === "all" || t.category === activeCategory
  );

  return (
    <section
      id="stack"
      className="py-20 lg:py-28 bg-deep-teal text-paper-white relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(197, 213, 232, 0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-dusty-sky font-semibold text-xs uppercase tracking-wider mb-3">
            Tech Stack
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paper-white tracking-[-0.045em] mb-4">
            Tools of the <span className="font-normal">craft</span>
          </h2>
          <p className="text-paper-white/70 text-base sm:text-lg font-normal max-w-md mx-auto leading-relaxed">
            Technologies I use daily to build, ship, and scale production
            applications.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                activeCategory === cat.id
                  ? "bg-paper-white text-obsidian font-bold shadow-sm"
                  : "text-paper-white/70 hover:text-paper-white border border-paper-white/20 hover:border-paper-white/40"
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Tech grid with official high-contrast vector brand icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {filtered.map((tech) => {
            const mapped = TECH_ICON_MAP[tech.name];
            const IconComponent = mapped?.icon;
            const brandColor = mapped?.color ?? "#FFFFFF";

            return (
              <div
                key={tech.name}
                className="group p-4 sm:p-5 rounded-2xl bg-paper-white/[0.04] border border-paper-white/5 flex flex-col items-center text-center gap-3 cursor-default hover:bg-paper-white/[0.09] hover:border-paper-white/20 hover:-translate-y-1 hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Vector Brand Icon Badge */}
                <div className="w-12 h-12 rounded-xl bg-paper-white/[0.08] border border-paper-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-paper-white/15 group-hover:border-paper-white/25 transition-transform duration-300">
                  {IconComponent ? (
                    <IconComponent
                      className="w-6 h-6 sm:w-6.5 sm:h-6.5 transition-colors duration-300"
                      style={{ color: brandColor }}
                    />
                  ) : (
                    <span className="text-base font-bold text-paper-white leading-none">
                      {tech.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-paper-white text-xs sm:text-sm font-bold tracking-tight group-hover:text-paper-white transition-colors">
                    {tech.name}
                  </p>
                  <p className="text-paper-white/60 text-[10px] sm:text-[11px] font-medium mt-0.5 capitalize">
                    {tech.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="mt-14 flex flex-wrap gap-8 sm:gap-12 justify-center border-t border-paper-white/10 pt-10">
          {[
            { label: "Technologies", value: TECH_STACK.length + "+" },
            {
              label: "Frontend",
              value: TECH_STACK.filter((t) => t.category === "frontend").length,
            },
            {
              label: "Backend",
              value: TECH_STACK.filter((t) => t.category === "backend").length,
            },
            {
              label: "DevOps Tools",
              value: TECH_STACK.filter((t) => t.category === "deployment")
                .length,
            },
          ].map((item) => (
            <div key={item.label} className="text-center min-w-[100px]">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-paper-white tracking-[-0.045em]">
                {item.value}
              </p>
              <p className="text-dusty-sky text-xs sm:text-sm font-medium mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
