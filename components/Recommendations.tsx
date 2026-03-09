import { Recommendation } from "@/data/analytics";

const typeConfig: Record<Recommendation["type"], { icon: string; bgColor: string; textColor: string }> = {
  positive: { icon: "\u2191", bgColor: "bg-green-50", textColor: "text-green-700" },
  negative: { icon: "!", bgColor: "bg-amber-50", textColor: "text-amber-700" },
  neutral: { icon: "\u2192", bgColor: "bg-blue-50", textColor: "text-blue-700" },
};

export function Recommendations({ recs }: { recs: Recommendation[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Auto-generated from sprint performance data
        </p>
      </div>

      <div className="p-5 space-y-3">
        {recs.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">
            Need at least one sprint of data to generate recommendations
          </p>
        ) : (
          recs.map((rec, i) => {
            const cfg = typeConfig[rec.type];
            return (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-lg px-4 py-3 ${cfg.bgColor}`}
              >
                <span
                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${cfg.textColor} bg-white`}
                >
                  {cfg.icon}
                </span>
                <p className={`text-sm ${cfg.textColor}`}>{rec.text}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
