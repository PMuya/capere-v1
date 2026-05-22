"use client";

import { Search, Bell } from "lucide-react";
import { useUser } from "@/lib/useUser";

export default function Topbar() {
  const { user, loading } = useUser();

  return (
    <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between px-8">

      {/* SEARCH */}
      <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-2xl px-4 py-3 w-100">
        <Search size={18} className="text-zinc-400" />

        <input
          placeholder="Ask Capere anything..."
          className="bg-transparent outline-none text-sm w-full placeholder:text-zinc-500"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Bell size={18} />
        </button>

        <div className="text-right">
          <p className="font-semibold">
            {loading ? "..." : user?.username}
          </p>

          <p className="text-sm text-zinc-400">
            {loading ? "" : user?.role}
          </p>
        </div>

        <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-zinc-200 to-zinc-500" />
      </div>
    </header>
  );
}