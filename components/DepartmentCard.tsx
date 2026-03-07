import { Department } from "@/data/org";

export function DepartmentCard({ dept }: { dept: Department }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: dept.color }}
          />
          <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
        </div>
        <span
          className="text-xs font-mono px-2 py-1 rounded-md"
          style={{
            backgroundColor: dept.color + "15",
            color: dept.color,
          }}
        >
          {dept.head}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4">{dept.focus}</p>

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
  );
}
