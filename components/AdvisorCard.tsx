import { BoardMember } from "@/data/org";

export function AdvisorCard({ member }: { member: BoardMember }) {
  return (
    <div className="rounded-lg border border-gray-150 bg-gray-50/50 p-5 hover:bg-white hover:shadow-sm transition-all">
      <h4 className="font-semibold text-gray-900 mb-1">{member.name}</h4>
      <p className="text-xs text-gray-500 mb-3">{member.domain}</p>
      <div className="flex flex-wrap gap-1.5">
        {member.frameworks.map((fw) => (
          <span
            key={fw}
            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
          >
            {fw}
          </span>
        ))}
      </div>
    </div>
  );
}
