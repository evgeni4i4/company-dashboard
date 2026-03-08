import {
  calendar,
  sprintTitle,
  platformConfig,
  statusConfig,
  Platform,
  ItemStatus,
} from "@/data/calendar";
import { CalendarDayCard } from "@/components/CalendarDayCard";

export const metadata = {
  title: "Content Calendar — Ivinco",
  description: "2-week content sprint across LinkedIn, X, Blog, Instagram, and Facebook",
};

export default function CalendarPage() {
  // Compute summary stats
  const allItems = calendar.flatMap((w) => w.days.flatMap((d) => d.items));
  const byStatus = allItems.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<ItemStatus, number>
  );
  const byPlatform = allItems.reduce(
    (acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    },
    {} as Record<Platform, number>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Content Calendar
        </h1>
        <p className="text-gray-500 mt-1">{sprintTitle}</p>
      </header>

      {/* Stats row */}
      <section className="mb-8 flex flex-wrap gap-6">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {allItems.length}
            </div>
            <div className="text-xs text-gray-400">Total Items</div>
          </div>
        </div>

        {/* Status breakdown */}
        <div className="flex items-center gap-3">
          {(["ready", "draft", "todo"] as ItemStatus[]).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: statusConfig[s].color }}
              />
              <span className="text-xs text-gray-500">
                {byStatus[s] || 0} {statusConfig[s].label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Platform legend */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-3">
          {(Object.entries(byPlatform) as [Platform, number][]).map(
            ([p, count]) => (
              <div
                key={p}
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: platformConfig[p].color }}
                />
                <span className="text-gray-600">{platformConfig[p].label}</span>
                <span className="text-gray-400 font-mono">{count}</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* Weeks */}
      {calendar.map((week) => (
        <section key={week.label} className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {week.label}
          </h2>
          <div className="space-y-4">
            {week.days.map((day) => (
              <CalendarDayCard key={day.date} day={day} />
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-6 text-xs text-gray-400">
        Ivinco Virtual Organization
      </footer>
    </div>
  );
}
