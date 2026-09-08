"use client";

import { Check, Sparkles } from "lucide-react";

export interface ServiceFeatureCardProps {
  title: string;
  detail: string;
  isFeatured?: boolean;
}

export default function ServiceFeatureCard({
  title,
  detail,
  isFeatured = false,
}: ServiceFeatureCardProps) {
  return (
    <div
      className={`p-4 rounded-xl transition-all border  hover:border-obsidian/25 hover:shadow-xs border-iron/60 shadow-2xs duration-200 flex items-start gap-3 h-full ${
        isFeatured ? "bg-paper-white/90" : "bg-bone/60 "
      }`}
    >
      {/* Icon Column */}
      <div
        aria-hidden="true"
        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isFeatured
            ? "bg-slate-teal/12 border border-slate-teal/25 text-slate-teal"
            : "bg-emerald-500/12 border border-emerald-600/20 text-emerald-700"
        }`}
      >
        {isFeatured ? (
          <Sparkles className="w-3 h-3 stroke-[2.2]" />
        ) : (
          <Check className="w-3 h-3 stroke-[2.5]" />
        )}
      </div>

      {/* Content Column */}
      <div className="min-w-0 flex-1 space-y-1">
        <h4
          title={title}
          className="font-sans text-obsidian text-xs sm:text-sm font-bold leading-snug line-clamp-2"
        >
          {title}
        </h4>
        <p className="font-sans text-obsidian/75 text-xs font-normal leading-relaxed">
          {detail}
        </p>
      </div>
    </div>
  );
}
