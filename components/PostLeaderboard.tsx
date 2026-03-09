"use client";

import { useState } from "react";
import { PostPerformance } from "@/data/analytics";
import { platformConfig } from "@/data/calendar";

type SortKey = "date" | "impressions" | "engagement" | "rate";

export function PostLeaderboard({ posts }: { posts: PostPerformance[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("rate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortBy(key);
      setSortDir("desc");
    }
  };

  const sorted = [...posts].sort((a, b) => {
    let aVal: number, bVal: number;
    switch (sortBy) {
      case "date":
        aVal = new Date(a.publishedDate).getTime();
        bVal = new Date(b.publishedDate).getTime();
        break;
      case "impressions":
        aVal = a.metrics.impressions || 0;
        bVal = b.metrics.impressions || 0;
        break;
      case "engagement":
        aVal = (a.metrics.likes || 0) + (a.metrics.comments || 0) + (a.metrics.shares || 0);
        bVal = (b.metrics.likes || 0) + (b.metrics.comments || 0) + (b.metrics.shares || 0);
        break;
      case "rate":
        aVal = a.engagementRate || 0;
        bVal = b.engagementRate || 0;
        break;
      default:
        aVal = 0;
        bVal = 0;
    }
    return sortDir === "desc" ? bVal - aVal : aVal - bVal;
  });

  const arrow = (key: SortKey) => {
    if (sortBy !== key) return "";
    return sortDir === "desc" ? " \u2193" : " \u2191";
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Post Leaderboard</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {posts.length} posts published — click column headers to sort
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-xs">
              <th className="text-left py-3 px-5 font-medium">Platform</th>
              <th className="text-left py-3 px-3 font-medium">Title</th>
              <th
                className="text-left py-3 px-3 font-medium cursor-pointer hover:text-gray-900 select-none"
                onClick={() => handleSort("date")}
              >
                Date{arrow("date")}
              </th>
              <th className="text-left py-3 px-3 font-medium">Framework</th>
              <th
                className="text-right py-3 px-3 font-medium cursor-pointer hover:text-gray-900 select-none"
                onClick={() => handleSort("impressions")}
              >
                Impressions{arrow("impressions")}
              </th>
              <th
                className="text-right py-3 px-3 font-medium cursor-pointer hover:text-gray-900 select-none"
                onClick={() => handleSort("engagement")}
              >
                Engagement{arrow("engagement")}
              </th>
              <th
                className="text-right py-3 px-5 font-medium cursor-pointer hover:text-gray-900 select-none"
                onClick={() => handleSort("rate")}
              >
                Rate{arrow("rate")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((post, i) => {
              const platform = platformConfig[post.platform];
              const engagement =
                (post.metrics.likes || 0) +
                (post.metrics.comments || 0) +
                (post.metrics.shares || 0);
              const rate = post.engagementRate || 0;

              return (
                <tr
                  key={post.id}
                  className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                    i === 0 && sortBy === "rate" ? "bg-green-50/30" : ""
                  }`}
                >
                  <td className="py-3 px-5">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: platform.color + "12",
                        color: platform.color,
                      }}
                    >
                      {platform.shortLabel}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-gray-900 font-medium truncate block max-w-[280px]">
                      {post.title}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                    {new Date(post.publishedDate + "T12:00:00").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-3">
                    {post.framework ? (
                      <span className="text-[10px] text-gray-400 font-mono">
                        {post.framework}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-700 font-mono text-xs">
                    {(post.metrics.impressions || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-700 font-mono text-xs">
                    {engagement.toLocaleString()}
                  </td>
                  <td className="py-3 px-5 text-right font-mono text-xs">
                    <span
                      className={`font-semibold ${
                        rate >= 0.04
                          ? "text-green-600"
                          : rate >= 0.02
                            ? "text-gray-700"
                            : "text-gray-400"
                      }`}
                    >
                      {(rate * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
