import { PostPerformance } from "@/data/analytics";

interface TopicStats {
  topic: string;
  label: string;
  count: number;
  avgEngagementRate: number;
  totalImpressions: number;
  platforms: string[];
}

function computeTopicStats(posts: PostPerformance[]): TopicStats[] {
  const byTopic: Record<string, PostPerformance[]> = {};
  for (const post of posts) {
    const key = post.topic || "other";
    if (!byTopic[key]) byTopic[key] = [];
    byTopic[key].push(post);
  }

  const labels: Record<string, string> = {
    "agentic-commerce": "Agentic Commerce",
    personal: "Personal / Range",
    other: "Other",
  };

  return Object.entries(byTopic)
    .map(([topic, tPosts]) => {
      const rates = tPosts.map((p) => p.engagementRate || 0).filter((r) => r > 0);
      const avgEngagementRate = rates.length > 0 ? rates.reduce((s, r) => s + r, 0) / rates.length : 0;
      const totalImpressions = tPosts.reduce((s, p) => s + (p.metrics.impressions || 0), 0);
      const platforms = [...new Set(tPosts.map((p) => p.platform))];

      return {
        topic,
        label: labels[topic] || topic,
        count: tPosts.length,
        avgEngagementRate,
        totalImpressions,
        platforms,
      };
    })
    .sort((a, b) => b.avgEngagementRate - a.avgEngagementRate);
}

export function TopicAnalysis({ posts }: { posts: PostPerformance[] }) {
  const topics = computeTopicStats(posts);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Topic Analysis</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Which topics and angles resonate most
        </p>
      </div>

      <div className="p-5 space-y-4">
        {topics.map((t, i) => (
          <div
            key={t.topic}
            className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-sm font-semibold ${
                    i === 0 ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {t.label}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  {t.count} posts
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{t.totalImpressions.toLocaleString()} impressions</span>
                <span>across {t.platforms.length} platform{t.platforms.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span
                className={`text-lg font-mono font-bold ${
                  t.avgEngagementRate >= 0.04
                    ? "text-green-600"
                    : t.avgEngagementRate >= 0.02
                      ? "text-gray-700"
                      : "text-gray-400"
                }`}
              >
                {(t.avgEngagementRate * 100).toFixed(1)}%
              </span>
              <p className="text-[10px] text-gray-400">avg engagement</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
