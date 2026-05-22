"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminDashboard() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>

      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-start">

          <div>
            <p className="text-zinc-400 mb-2">
              Welcome back
            </p>

            <h1 className="text-5xl font-bold tracking-tight">
              Institutional Command Center
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-xl"
          >
            Logout
          </button>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-6">

          {/* MAIN */}
          <div className="col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 min-h-100">

            <h2 className="text-2xl font-semibold mb-6">
              Institutional Intelligence
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-black/30 p-5 border border-white/10">
                <h3 className="text-lg font-semibold">
                  Curriculum Engine
                </h3>

                <p className="text-zinc-400 text-sm mt-2">
                  Configure academic structures, subjects, grading,
                  and institutional learning paths.
                </p>
              </div>

              <div className="rounded-2xl bg-black/30 p-5 border border-white/10">
                <h3 className="text-lg font-semibold">
                  Timetable Intelligence
                </h3>

                <p className="text-zinc-400 text-sm mt-2">
                  Adaptive timetable optimization and scheduling logic.
                </p>
              </div>

              <div className="rounded-2xl bg-black/30 p-5 border border-white/10">
                <h3 className="text-lg font-semibold">
                  Behavioral Analytics
                </h3>

                <p className="text-zinc-400 text-sm mt-2">
                  Real-time institutional engagement intelligence.
                </p>
              </div>

              <div className="rounded-2xl bg-black/30 p-5 border border-white/10">
                <h3 className="text-lg font-semibold">
                  Examination Systems
                </h3>

                <p className="text-zinc-400 text-sm mt-2">
                  Assessment pipelines, grading, and analysis tools.
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-xl font-semibold mb-6">
              System Status
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Backend
                </span>

                <span className="text-green-400">
                  Online
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Event Tracking
                </span>

                <span className="text-green-400">
                  Active
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Institution
                </span>

                <span className="text-green-400">
                  Connected
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </ProtectedRoute>
  );
}