"use client";

import { useState } from "react";
import { Department } from "@/data/org";

export function DepartmentCard({ dept }: { dept: Department }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: dept.color }}
            />
            <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-1 rounded-md"
              style={{
                backgroundColor: dept.color + "15",
                color: dept.color,
              }}
            >
              {dept.head}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{dept.focus}</p>
      </button>

      {open && (
        <div className="px-6 pb-6 pt-0">
          <div className="space-y-1.5 mb-4">
            {dept.services.map((service) => (
              <div key={service} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-gray-300">-</span>
                {service}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>{dept.services.length} services</span>
            {dept.skillCount > 0 ? (
              <span>{dept.skillCount} Claude skills</span>
            ) : (
              <span className="italic">General knowledge</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
