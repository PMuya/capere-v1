"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { getUser } from "@/lib/auth";
import { useUser } from "@/lib/useUser";

import { ChevronDown } from "lucide-react";

export default function Sidebar() {
  const { user, loading } = useUser();

  return (
    <aside className="w-72 border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col">

      {/* LOGO */}
      <div className="px-8 py-8 border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-tight">
          Capere
        </h1>

        <p className="text-sm text-zinc-400 mt-1">
          {loading ? "Loading..." : user?.institution?.name || "No School"}
        </p>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

        {routes.map((item: any) => {
          const Icon = item.icon;

          if (!item.children) {
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          }

          return (
            <div key={item.title} className="relative group">

              <div className="flex items-center justify-between px-5 py-4 rounded-2xl text-zinc-300 hover:bg-white/10 hover:text-white transition-all">

                <div className="flex items-center gap-4">
                  <Icon size={20} />
                  <span className="font-medium">{item.title}</span>
                </div>

                <ChevronDown className="transition-transform group-hover:rotate-180" />
              </div>

              <div className="hidden group-hover:block mt-2 ml-6 w-60 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">

                {item.children.map((child: any) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {child.title}
                  </Link>
                ))}

              </div>
            </div>
          );
        })}

      </nav>

      {/* FOOTER */}
      <div className="p-5 border-t border-white/10 text-sm text-zinc-500">
        Adaptive Educational System
      </div>

    </aside>
  );
}