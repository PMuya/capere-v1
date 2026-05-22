"use client";

export default function AssistantPanel() {
  return (
    <aside
      className="
        w-95
        border-l
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        flex
        flex-col
      "
    >

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">
          Institutional Guide
        </h2>

        <p className="text-sm text-zinc-400 mt-1">
          Adaptive assistant for your workflows
        </p>
      </div>

      {/* MAIN CARD */}
      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-linear-to-b
          from-zinc-900
          to-black
          p-6
          mb-6
        "
      >
        <p className="text-sm text-zinc-400 mb-3">
          Welcome back
        </p>

        <h3 className="text-2xl font-bold mb-4">
          Continue timetable optimization
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed">
          Your recent activity indicates active scheduling
          workflows for Term 2 operations.
        </p>

        <button
          className="
            mt-6
            w-full
            bg-white
            text-black
            py-4
            rounded-2xl
            font-semibold
          "
        >
          Resume Workflow
        </button>
      </div>

      {/* SUGGESTIONS */}
      <div className="space-y-4">

        <div className="rounded-2xl border border-white/10 p-5">
          <p className="font-medium mb-1">
            Suggested Insight
          </p>

          <p className="text-sm text-zinc-400">
            Timetable conflicts reduced by 18% this week.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <p className="font-medium mb-1">
            Recommendation
          </p>

          <p className="text-sm text-zinc-400">
            Review teacher workload balancing analytics.
          </p>
        </div>
      </div>
    </aside>
  );
}