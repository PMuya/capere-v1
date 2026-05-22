"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import AssistantPanel from "./AssistantPanel";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
      "
    >

      {/* LEFT */}
      <Sidebar />

      {/* CENTER */}
      <div className="flex-1 flex flex-col">

        <Topbar />

        <section className="flex-1 p-8 overflow-auto">
        {children}
        </section>
      </div>

      {/* RIGHT */}
      <AssistantPanel />
    </main>
  );
}