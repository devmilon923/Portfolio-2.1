"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  ArrowUpRight,
  Sparkles,
  Copy,
  Check,
  GitBranch,
  Star,
  Code2,
  Layers,
  ChevronDown,
} from "lucide-react";
import { PERSONAL } from "@/lib/constants";

interface GitHubData {
  publicRepos: number;
  followers: number;
  avatarUrl: string;
  lastUpdated: string;
  latestRepo?: {
    name: string;
    url: string;
    description: string;
    language: string;
    stars: number;
  };
}

export default function GithubCTAButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const [transformPos, setTransformPos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [showRepoDrawer, setShowRepoDrawer] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const [githubData, setGithubData] = useState<GitHubData>({
    publicRepos: 68,
    followers: 6,
    avatarUrl: "https://avatars.githubusercontent.com/u/104084043?v=4",
    lastUpdated: "Active today",
    latestRepo: {
      name: "Portfolio-2.1",
      url: "https://github.com/devmilon923/Portfolio-2.1",
      description:
        "Personal developer portfolio built with Next.js & TypeScript.",
      language: "TypeScript",
      stars: 1,
    },
  });

  // Fetch real-time public activity on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchGitHubProfile = async () => {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch("https://api.github.com/users/devmilon923"),
          fetch(
            "https://api.github.com/users/devmilon923/events/public?per_page=5"
          ),
        ]);

        if (userRes.ok && isMounted) {
          const userData = await userRes.json();
          let lastActivityDate = userData.updated_at;
          let targetRepoFullName = "devmilon923/Portfolio-2.1";

          if (eventsRes.ok) {
            const events = await eventsRes.json();
            if (Array.isArray(events) && events.length > 0) {
              const firstEvent =
                events.find(
                  (e: { type: string }) => e.type === "PushEvent"
                ) || events[0];
              if (firstEvent?.created_at) {
                lastActivityDate = firstEvent.created_at;
              }
              if (firstEvent?.repo?.name) {
                targetRepoFullName = firstEvent.repo.name;
              }
            }
          }

          let latestRepoData = {
            name: targetRepoFullName.replace("devmilon923/", ""),
            url: `https://github.com/${targetRepoFullName}`,
            description:
              "Personal developer portfolio built with Next.js & TypeScript.",
            language: "TypeScript",
            stars: 1,
          };

          try {
            const repoRes = await fetch(
              `https://api.github.com/repos/${targetRepoFullName}`
            );
            if (repoRes.ok) {
              const r = await repoRes.json();
              latestRepoData = {
                name: r.name,
                url: r.html_url,
                description:
                  r.description ||
                  "Public GitHub repository by @devmilon923.",
                language: r.language || "TypeScript",
                stars: r.stargazers_count ?? 0,
              };
            }
          } catch (err) {
            console.error("Repo metadata fetch error:", err);
          }

          const getRelativeTime = (dateString: string) => {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = Math.max(0, now.getTime() - date.getTime());
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffMinutes < 5) return "Active just now";
            if (diffMinutes < 60) return `Active ${diffMinutes}m ago`;
            if (diffHours < 24) return `Active ${diffHours}h ago`;
            if (diffDays === 1) return "Active yesterday";
            if (diffDays < 30) return `Active ${diffDays}d ago`;
            return `Updated ${date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`;
          };

          setGithubData({
            publicRepos: userData.public_repos ?? 68,
            followers: userData.followers ?? 6,
            avatarUrl:
              userData.avatar_url ||
              "https://avatars.githubusercontent.com/u/104084043?v=4",
            lastUpdated: getRelativeTime(lastActivityDate),
            latestRepo: latestRepoData,
          });
          setIsLive(true);
        }
      } catch (err) {
        console.error("GitHub API fetch error:", err);
      }
    };

    fetchGitHubProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y, opacity: 1 });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) * 0.06;
    const deltaY = (y - centerY) * 0.06;
    setTransformPos({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    setTransformPos({ x: 0, y: 0 });
  };

  const handleCopyHandle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL.github);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-16 max-w-xl mx-auto w-full px-2 sm:px-0">
      {/* ── Top System Bar: Integrated Live GitHub Telemetry ─────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-md py-3 sm:rounded-full shadow-2xs text-xs">
        {/* Handle Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-paper-white border border-iron/70 font-semibold text-obsidian shadow-2xs">
          <Github className="w-3.5 h-3.5 text-obsidian flex-shrink-0" />
          <span className="text-[11px] sm:text-xs">@devmilon923</span>
          {isLive && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5 flex-shrink-0" />
          )}
        </div>

        {/* Public Repos Count */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-obsidian/80 font-medium text-[11px] sm:text-xs">
          <Layers className="w-3.5 h-3.5 text-slate-teal flex-shrink-0" />
          <span>{githubData.publicRepos} Repositories</span>
        </div>

        {/* Latest Activity Dropdown Trigger */}
        {githubData.latestRepo && (
          <button
            onClick={() => setShowRepoDrawer(!showRepoDrawer)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-slate-teal/10 hover:bg-paper-white border border-slate-teal/20 text-slate-teal font-semibold text-[11px] sm:text-xs transition-all duration-200 cursor-pointer"
            title="Click to peek recent GitHub activity"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="whitespace-nowrap">{githubData.lastUpdated}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 flex-shrink-0 ${
                showRepoDrawer ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* ── Latest Activity Drawer (Expandable Glassmorphic Peek) ───────── */}
      {githubData.latestRepo && showRepoDrawer && (
        <div className="w-full bg-paper-white border border-iron/90 rounded-2xl p-4 sm:p-5 shadow-xs transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-slate-teal" />
              <span className="text-xs font-bold text-obsidian uppercase tracking-wider">
                Latest Active Repository
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-bone border border-iron/70 text-obsidian/80 font-medium">
              {githubData.latestRepo.language}
            </span>
          </div>

          <a
            href={githubData.latestRepo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group/repo pt-1"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm sm:text-base text-obsidian group-hover/repo:text-slate-teal transition-colors flex items-center gap-1.5">
                <span>{githubData.latestRepo.name}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-teal opacity-0 group-hover/repo:opacity-100 transition-opacity" />
              </h4>
              {githubData.latestRepo.stars > 0 && (
                <span className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {githubData.latestRepo.stars}
                </span>
              )}
            </div>
            <p className="text-xs text-obsidian/75 mt-1 line-clamp-2 leading-relaxed">
              {githubData.latestRepo.description}
            </p>
          </a>
        </div>
      )}

      {/* ── Main Premium Tactile Spotlight CTA Container ───────────────── */}
      <div
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate3d(${transformPos.x}px, ${transformPos.y}px, 0)`,
          transition:
            transformPos.x === 0 && transformPos.y === 0
              ? "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "none",
        }}
        className="w-full relative group p-[1.5px] rounded-full bg-gradient-to-r from-iron via-slate-teal/40 to-iron hover:from-slate-teal hover:via-obsidian hover:to-slate-teal transition-all duration-500 shadow-2xs hover:shadow-md"
      >
        {/* Cursor Spotlight Radial Canvas */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 z-10"
          style={{
            opacity: spotlightPos.opacity,
            background: `radial-gradient(280px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(15, 23, 42, 0.08), transparent 80%)`,
          }}
        />

        {/* Inner Interactive Pill Container */}
        <div className="relative z-20 flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-paper-white group-hover:bg-white transition-colors duration-300">
          {/* Direct Link & Profile Info */}
          <Link
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 sm:gap-3.5 text-obsidian group/link flex-1 min-w-0"
          >
            {/* Real Avatar Container with Ring Glow */}
            <div className="relative flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-bone border border-iron/80 flex items-center justify-center shadow-2xs group-hover/link:ring-2 group-hover/link:ring-slate-teal/40 group-hover/link:scale-105 transition-all duration-300 overflow-hidden">
              {githubData.avatarUrl ? (
                <Image
                  src={githubData.avatarUrl}
                  alt="Milon Mia GitHub Avatar"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover group-hover/link:scale-110 transition-transform duration-300"
                  unoptimized
                />
              ) : (
                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-obsidian transition-transform duration-300 group-hover/link:scale-110" />
              )}
              <Sparkles className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 text-amber-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 animate-pulse z-20" />
            </div>

            {/* Content Details */}
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5 font-bold text-xs sm:text-base text-obsidian group-hover/link:text-slate-teal transition-colors leading-tight">
                <span className="hidden sm:inline truncate">Explore Source Code on GitHub</span>
                <span className="inline sm:hidden truncate">Explore GitHub Source</span>
                <GitBranch className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-teal flex-shrink-0 opacity-80 group-hover/link:rotate-45 transition-transform duration-300" />
              </div>
              <p className="text-[10.5px] sm:text-xs text-obsidian/70 font-normal leading-tight mt-0.5">
                <span className="hidden sm:inline truncate">
                  {githubData.publicRepos} public repositories • Active open-source engineer
                </span>
                <span className="inline sm:hidden truncate">
                  {githubData.publicRepos} repos • Active engineer
                </span>
              </p>
            </div>
          </Link>

          {/* Vertical Divider */}
          <div className="w-px h-6 sm:h-7 bg-iron/70 my-auto flex-shrink-0" />

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Copy Handle Button */}
            <button
              onClick={handleCopyHandle}
              title={copied ? "Copied profile URL!" : "Copy GitHub URL"}
              className="p-1.5 sm:p-2.5 rounded-full text-obsidian/70 hover:text-obsidian hover:bg-paper-white active:scale-95 transition-all duration-200 relative group/btn border border-transparent hover:border-iron/70 shadow-2xs"
              aria-label="Copy GitHub profile URL"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 animate-in zoom-in-75 duration-200" />
              ) : (
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-obsidian text-paper-white text-[10px] font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                {copied ? "Copied!" : "Copy URL"}
              </span>
            </button>

            {/* Direct Open Link Button */}
            <Link
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2.5 rounded-full bg-obsidian text-paper-white hover:bg-deep-teal hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xs flex items-center justify-center"
              aria-label="Open GitHub profile in new tab"
            >
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
