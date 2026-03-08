import { departments, boardMembers } from "@/data/org";
import { DepartmentCard } from "@/components/DepartmentCard";
import { AdvisorCard } from "@/components/AdvisorCard";

export default function Home() {
  const totalSkills = departments.reduce((sum, d) => sum + d.skillCount, 0);
  const totalServices = departments.reduce((sum, d) => sum + d.services.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Organization
        </h1>
        <p className="text-gray-500 mt-1">
          Virtual company structure powered by Claude
        </p>
      </header>

      {/* CEO */}
      <section className="mb-10">
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-semibold">
            EL
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Eugene Levitin</div>
            <div className="text-xs text-gray-400">CEO</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 mb-10 max-w-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{departments.length}</div>
          <div className="text-xs text-gray-400">Departments</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalServices}</div>
          <div className="text-xs text-gray-400">Services</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalSkills}</div>
          <div className="text-xs text-gray-400">Claude Skills</div>
        </div>
      </section>

      {/* Departments */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept) => (
            <DepartmentCard key={dept.head} dept={dept} />
          ))}
        </div>
      </section>

      {/* Board of Directors */}
      <section className="mb-12">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Board of Directors</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {boardMembers.length} strategic advisors
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {boardMembers.map((member) => (
            <AdvisorCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-6 text-xs text-gray-400">
        Ivinco Virtual Organization
      </footer>
    </div>
  );
}
