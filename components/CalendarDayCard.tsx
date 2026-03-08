"use client";

import {
  CalendarDay,
  CalendarItem,
  platformConfig,
  statusConfig,
} from "@/data/calendar";

function formatDate(dateStr: string): { dayName: string; monthDay: string } {
  const date = new Date(dateStr + "T12:00:00");
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return { dayName, monthDay };
}

function ItemRow({ item }: { item: CalendarItem }) {
  const platform = platformConfig[item.platform];
  const status = statusConfig[item.status];

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      {/* Platform badge */}
      <span
        className="shrink-0 mt-0.5 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
        style={{
          backgroundColor: platform.color + "12",
          color: platform.color,
        }}
      >
        {platform.shortLabel}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 truncate">
            {item.title}
          </span>
          <span
            className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{
              backgroundColor: status.color + "15",
              color: status.color,
            }}
          >
            {status.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
          {item.details}
        </p>
        {item.framework && (
          <span className="inline-block text-[10px] text-gray-400 mt-1 font-mono">
            {item.framework}
          </span>
        )}
      </div>
    </div>
  );
}

export function CalendarDayCard({ day }: { day: CalendarDay }) {
  const { dayName, monthDay } = formatDate(day.date);
  const isToday =
    new Date().toISOString().slice(0, 10) === day.date;

  return (
    <div
      className={`rounded-xl border bg-white shadow-sm ${
        isToday ? "border-blue-300 ring-2 ring-blue-100" : "border-gray-200"
      }`}
    >
      {/* Day header */}
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-gray-900">{dayName}</span>
          <span className="text-sm text-gray-400 ml-2">{monthDay}</span>
        </div>
        <span className="text-xs text-gray-400">
          {day.items.length} item{day.items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Items */}
      <div className="px-5 py-1">
        {day.items.map((item, i) => (
          <ItemRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
