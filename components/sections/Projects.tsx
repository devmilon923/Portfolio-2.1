"use client";

import { PROJECTS } from "@/lib/constants";
import GithubCTAButton from "@/components/sections/GithubCTAButton";
import ProjectCard from "@/components/sections/ProjectCard";

function formatLastUpdated(dateInput?: string) {
  if (!dateInput) return "";
  if (dateInput.startsWith("Updated ")) return dateInput;

  const parsedDate = new Date(
    dateInput.length === 7 ? `${dateInput}-01` : dateInput
  );

  if (!isNaN(parsedDate.getTime())) {
    const month = parsedDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    return `Updated ${month}`;
  }

  return `Updated ${dateInput}`;
}

// Soft gradient per project card
const PROJECT_GRADIENTS = [
  {
    bg: "linear-gradient(135deg, rgba(212,230,235,0.18) 0%, rgba(255,255,255,0.6) 50%, rgba(212,230,235,0.10) 100%)",
    border: "border-mist-mint/30 hover:border-mist-mint/50",
    kpi: "bg-mist-mint/15 border-mist-mint/25",
    roi: "bg-mist-mint/20 border-mist-mint/30",
    dot: "bg-deep-teal",
  },
  {
    bg: "linear-gradient(135deg, rgba(231,211,191,0.18) 0%, rgba(255,255,255,0.6) 50%, rgba(245,236,229,0.12) 100%)",
    border: "border-desert-clay/25 hover:border-desert-clay/45",
    kpi: "bg-desert-clay/12 border-desert-clay/22",
    roi: "bg-desert-clay/18 border-desert-clay/28",
    dot: "bg-saddle-brown",
  },
  {
    bg: "linear-gradient(135deg, rgba(239,229,249,0.18) 0%, rgba(255,255,255,0.6) 50%, rgba(239,229,249,0.10) 100%)",
    border: "border-wisteria/25 hover:border-wisteria/45",
    kpi: "bg-wisteria/15 border-wisteria/22",
    roi: "bg-wisteria/20 border-wisteria/28",
    dot: "bg-slate-teal",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 lg:py-28 bg-paper-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="section-label mb-3">Featured Proof Of Work</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] mb-3 text-balance">
            Engineered for scale &amp;{" "}
            <span className="font-normal text-slate-teal">business ROI</span>
          </h2>
          <p className="text-obsidian/75 text-sm sm:text-base font-normal leading-relaxed max-w-lg mx-auto">
            Real production case studies demonstrating backend architecture, AI
            memory systems, and measurable performance results.
          </p>
        </div>

        {/* Projects Cards List */}
        <div className="space-y-10">
          {PROJECTS.map((project, index) => {
            const accent = PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length];
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                accent={accent}
                formatLastUpdated={formatLastUpdated}
              />
            );
          })}
        </div>

        {/* GitHub CTA */}
        <GithubCTAButton />
      </div>
    </section>
  );
}
