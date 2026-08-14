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
  Activity,
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
        "I focused on creating an aesthetic design that reflects my design taste and development approach.",
      language: "TypeScript",
      stars: 1,
    },
  });

  // Fetch real-time public activity on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchGitHubProfile = async () => {
      try {
        // 1. Fetch live profile and public events from GitHub REST API
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

          // Parse true latest event timestamp & active repository
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

          // 2. Fetch repo metadata directly for the active repository
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

          // 3. Format precise relative activity time
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
    const deltaX = (x - centerX) * 0.08;
    const deltaY = (y - centerY) * 0.08;
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
    <div className="flex flex-col items-center gap-4 mt-16 max-w-xl mx-auto">
      {/* ── Top Live Status & Metrics Bar ───────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
        {/* Real-time Indicator Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bone border border-iron text-obsidian shadow-xs">
          <span className="font-semibold">@devmilon923</span>
          {isLive && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full">
              LIVE API
            </span>
          )}
        </div>

        {/* Real Repos Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sandstone/80 border border-iron text-obsidian/80">
          <Layers className="w-3.5 h-3.5 text-slate-teal" />
          <span className="font-semibold text-obsidian">
            {githubData.publicRepos} Repositories
          </span>
        </div>

        {/* Real-time Activity Pill / Drawer Toggle */}
        {githubData.latestRepo && (
          <button
            onClick={() => setShowRepoDrawer(!showRepoDrawer)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dusty-sky/40 hover:bg-dusty-sky/70 border border-iron text-obsidian transition-colors group cursor-pointer"
            title="Click to view live recent repo"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{githubData.lastUpdated}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-obsidian/60 transition-transform duration-300 ${
                showRepoDrawer ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* ── Latest Activity Drawer (Expandable Real-Time Peek) ───────────── */}
      {githubData.latestRepo && showRepoDrawer && (
        <div className="w-full bg-paper-white border border-iron rounded-2xl p-4 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-slate-teal" />
              <span className="text-xs font-mono font-semibold text-obsidian uppercase tracking-wider">
                Latest GitHub Activity
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sandstone border border-iron text-slate-teal font-medium">
              {githubData.latestRepo.language}
            </span>
          </div>

          <a
            href={githubData.latestRepo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group/repo"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-obsidian group-hover/repo:text-slate-teal transition-colors flex items-center gap-1.5">
                {githubData.latestRepo.name}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/repo:opacity-100 transition-opacity" />
              </h4>
              {githubData.latestRepo.stars > 0 && (
                <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  {githubData.latestRepo.stars}
                </span>
              )}
            </div>
            <p className="text-xs text-obsidian/70 mt-1 line-clamp-2 leading-relaxed">
              {githubData.latestRepo.description}
            </p>
          </a>
        </div>
      )}

      {/* ── Main Magnetic Spotlight CTA Card ───────────────────────────────── */}
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
        className="w-full relative group p-[1.5px] rounded-full bg-gradient-to-r from-iron via-slate-teal/50 to-iron hover:from-slate-teal hover:via-deep-teal hover:to-slate-teal transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-deep-teal/15"
      >
        {/* Spotlight Overlay Canvas */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 z-10"
          style={{
            opacity: spotlightPos.opacity,
            background: `radial-gradient(280px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(11, 37, 42, 0.18), transparent 80%)`,
          }}
        />

        {/* Outer Pill Container */}
        <div className="relative z-20 flex items-center justify-between gap-3 sm:gap-6 px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-bone group-hover:bg-paper-white transition-colors duration-300">
          {/* Direct Link & Profile Identity */}
          <Link
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 text-obsidian group-hover:text-deep-teal transition-colors flex-1 min-w-0"
          >
            {/* Real Avatar or GitHub Icon with Ring */}
            <div className="relative flex-shrink-0 w-11 h-11 rounded-full bg-paper-white group-hover:bg-deep-teal text-obsidian group-hover:text-paper-white border border-iron group-hover:border-deep-teal shadow-xs group-hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center">
              {githubData.avatarUrl ? (
                <Image
                  src={githubData.avatarUrl}
                  alt="Milon Mia GitHub Avatar"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
              ) : (
                <Github className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              )}
              <Sparkles className="absolute -top-0.5 -right-0.5 w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse z-20" />
            </div>

            {/* Content Details */}
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1.5 font-semibold text-sm sm:text-base text-obsidian group-hover:text-deep-teal transition-colors truncate">
                <span className="truncate">See more on GitHub</span>
                <GitBranch className="w-3.5 h-3.5 text-slate-teal flex-shrink-0 opacity-70 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <p className="text-[11px] sm:text-xs text-obsidian/60 font-medium truncate">
                {githubData.publicRepos} public repos • Live GitHub REST API
              </p>
            </div>
          </Link>

          {/* Vertical Divider */}
          <div className="w-px h-7 bg-iron/80 my-auto flex-shrink-0" />

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Quick Copy Link Button */}
            <button
              onClick={handleCopyHandle}
              title={copied ? "Copied handle!" : "Copy profile URL"}
              className="p-2.5 rounded-full text-obsidian/70 hover:text-obsidian hover:bg-sandstone active:scale-95 transition-all duration-200 relative group/btn"
              aria-label="Copy GitHub profile URL"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in-75 duration-200" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-obsidian text-paper-white text-[10px] font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                {copied ? "Copied!" : "Copy URL"}
              </span>
            </button>

            {/* External Direct Link Button */}
            <Link
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-obsidian text-paper-white group-hover:bg-deep-teal group-hover:scale-105 active:scale-95 transition-all duration-300 shadow-xs flex items-center justify-center"
              aria-label="Open GitHub in new tab"
            >
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
