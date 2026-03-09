import {
  sprintAnalytics,
  sprintMeta,
  computeSprintSummary,
  computeFrameworkStats,
  computePlatformSummary,
  generateRecommendations,
} from "@/data/analytics";
import { PostLeaderboard } from "@/components/PostLeaderboard";
import { FrameworkChart } from "@/components/FrameworkChart";
import { PlatformStats } from "@/components/PlatformStats";
import { TopicAnalysis } from "@/components/TopicAnalysis";
import { Recommendations } from "@/components/Recommendations";

export const metadata = {
  title: "Analytics — Ivinco",
  description: "Content sprint performance analytics and recommendations",
};

export default function AnalyticsPage() {
  const posts = sprintAnalytics;
  const summary = computeSprintSummary(
    posts,
    sprintMeta.planned,
    sprintMeta.label,
    sprintMeta.startDate,
    sprintMeta.endDate
  );
  const frameworkStats = computeFrameworkStats(posts);
  const platformSummary = computePlatformSummary(posts);
  const recommendations = generateRecommendations(posts, frameworkStats, platformSummary);

  const totalEngagement = posts.reduce(
    (s, p) => s + (p.metrics.likes || 0) + (p.metrics.comments || 0) + (p.metrics.shares || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Analytics
        </h1>
        <p className="text-gray-500 mt-1">{sprintMeta.label}</p>
      </header>

      {/* Sprint Overview */}
      <section className="mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
            <div className="text-2xl font-bold text-gray-900">
              {summary.published}
              <span className="text-sm font-normal text-gray-400">
                /{summary.planned}
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Posts Published</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
            <div className="text-2xl font-bold text-gray-900">
              {summary.totalImpressions.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Total Impressions</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
            <div className="text-2xl font-bold text-gray-900">
              {totalEngagement.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Total Engagement</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
            <div className="text-2xl font-bold text-gray-900">
              {(summary.avgEngagementRate * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Avg Engagement Rate</div>
          </div>
        </div>
      </section>

      {/* Post Leaderboard */}
      <section className="mb-10">
        <PostLeaderboard posts={posts} />
      </section>

      {/* Framework + Platform side by side */}
      <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FrameworkChart stats={frameworkStats} />
        <TopicAnalysis posts={posts} />
      </section>

      {/* Platform Stats */}
      <section className="mb-10">
        <PlatformStats platforms={platformSummary} />
      </section>

      {/* Recommendations */}
      <section className="mb-12">
        <Recommendations recs={recommendations} />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-6 text-xs text-gray-400">
        Ivinco Virtual Organization
      </footer>
    </div>
  );
}
