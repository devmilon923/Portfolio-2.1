"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, ArrowUpRight, GitBranch, Layers } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

interface GitHubData {
  publicRepos: number;
  avatarUrl: string;
  lastUpdated: string;
}

export default function GithubCTAButton() {
  const [isLive, setIsLive] = useState(false);
  const [githubData, setGithubData] = useState<GitHubData>({
    publicRepos: 68,
    avatarUrl: "https://avatars.githubusercontent.com/u/104084043?v=4",
    lastUpdated: "Active today",
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchGitHubProfile = async () => {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch("https://api.github.com/users/devmilon923", { signal }),
          fetch(
            "https://api.github.com/users/devmilon923/events/public?per_page=5",
            { signal },
          ),
        ]);

        if (userRes.ok && !signal.aborted) {
          const userData = await userRes.json();
          let lastActivityDate = userData.updated_at;

          if (eventsRes.ok) {
            const events = await eventsRes.json();
            if (Array.isArray(events) && events.length > 0) {
              const firstEvent =
                events.find((e: { type: string }) => e.type === "PushEvent") ||
                events[0];
              if (firstEvent?.created_at) {
                lastActivityDate = firstEvent.created_at;
              }
            }
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

          if (!signal.aborted) {
            setGithubData({
              publicRepos: userData.public_repos ?? 68,
              avatarUrl:
                userData.avatar_url ||
                "https://avatars.githubusercontent.com/u/104084043?v=4",
              lastUpdated: getRelativeTime(lastActivityDate),
            });
            setIsLive(true);
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("GitHub API fetch error:", err);
      }
    };

    fetchGitHubProfile();
    return () => controller.abort();
  }, []);

  return (
    <div className="flex justify-center mt-14">
      <Link
        href={PERSONAL.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 px-5 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-paper-white border border-iron/80 hover:border-obsidian/30 hover:shadow-sm transition-all duration-200 shadow-2xs max-w-lg w-full"
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bone border border-iron/80 overflow-hidden shadow-2xs group-hover:ring-2 group-hover:ring-slate-teal/30 transition-all duration-200">
          <Image
            src={githubData.avatarUrl}
            alt="GitHub Avatar"
            width={44}
            height={44}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-obsidian font-bold text-sm sm:text-base group-hover:text-slate-teal transition-colors leading-tight">
            <span>Explore Source Code</span>
            <GitBranch className="w-3.5 h-3.5 text-slate-teal opacity-70" />
          </div>
          <p className="text-obsidian/60 text-xs font-normal leading-tight mt-0.5 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-slate-teal flex-shrink-0" />
            <span>{githubData.publicRepos} repositories</span>
            {isLive && (
              <>
                <span className="text-obsidian/30">·</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {githubData.lastUpdated}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Arrow */}
        <ArrowUpRight className="w-4 h-4 text-obsidian/40 group-hover:text-obsidian group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0" />
      </Link>
    </div>
  );
}
