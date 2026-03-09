import { PlatformSummary } from "@/data/analytics";
import { platformConfig } from "@/data/calendar";

export function PlatformStats({ platforms }: { platforms: PlatformSummary[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          Platform Comparison
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Performance across {platforms.length} platforms
        </p>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((ps) => {
          const config = platformConfig[ps.platform];
          return (
            <div
              key={ps.platform}
              className="rounded-lg border border-gray-150 p-4 hover:shadow-sm transition-shadow"
              style={{ borderLeftColor: config.color, borderLeftWidth: 3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: config.color + "12",
                    color: config.color,
                  }}
                >
                  {config.shortLabel}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {ps.postCount} posts
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500">Avg impressions</span>
                  <span className="text-sm font-mono font-semibold text-gray-900">
                    {ps.avgImpressions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500">Total reach</span>
                  <span className="text-sm font-mono text-gray-700">
                    {ps.totalReach.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500">Total engagement</span>
                  <span className="text-sm font-mono text-gray-700">
                    {ps.totalEngagement.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Eng. rate</span>
                  <span
                    className={`text-sm font-mono font-semibold ${
                      ps.avgEngagementRate >= 0.04
                        ? "text-green-600"
                        : ps.avgEngagementRate >= 0.02
                          ? "text-gray-700"
                          : "text-gray-400"
                    }`}
                  >
                    {(ps.avgEngagementRate * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
