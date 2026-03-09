import { FrameworkStats } from "@/data/analytics";

export function FrameworkChart({ stats }: { stats: FrameworkStats[] }) {
  const filtered = stats.filter((s) => s.count >= 2);
  const singleUse = stats.filter((s) => s.count < 2);
  const maxRate = Math.max(...filtered.map((s) => s.avgEngagementRate), 0.01);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          Framework Effectiveness
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Average engagement rate by framework (min 2 uses)
        </p>
      </div>

      <div className="p-5 space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">
            Need at least 2 uses of a framework for comparison data
          </p>
        ) : (
          filtered.map((fw, i) => {
            const barWidth = (fw.avgEngagementRate / maxRate) * 100;
            return (
              <div key={fw.framework}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        i === 0 ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {fw.framework}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {fw.count} posts
                    </span>
                  </div>
                  <span
                    className={`text-sm font-mono font-semibold ${
                      i === 0 ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {(fw.avgEngagementRate * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      i === 0 ? "bg-green-500" : "bg-gray-400"
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {singleUse.length > 0 && (
        <div className="px-5 pb-4">
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">
              Single use (need more data):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {singleUse.map((fw) => (
                <span
                  key={fw.framework}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-mono"
                >
                  {fw.framework} ({(fw.avgEngagementRate * 100).toFixed(1)}%)
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
