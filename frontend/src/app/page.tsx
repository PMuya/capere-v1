"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type HomeData = {
  recent_events: any[];
  top_modules: { event_category: string; count: number }[];
  last_event: string | null;
};

export default function HomePage() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    // 1. Health check
    fetch("https://capere-v1-backend.onrender.com/api/health/")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => setBackendStatus("Connected"))
      .catch(() => setBackendStatus("Backend Error"));

    // 2. Institutional memory fetch
    fetch("https://capere-v1-backend.onrender.com/api/v1/events/home/", {
      headers: {
        Authorization: `Bearer YOUR_TOKEN_HERE`, // replace later with auth state
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setHomeData(data.data);
      })
      .catch(() => setHomeData(null));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white text-black p-2 rounded-2xl">
            <Sparkles size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Capere</h1>
            <p className="text-gray-400 text-sm">
              Adaptive Institutional Intelligence
            </p>
          </div>
        </div>

        {/* STATUS */}
        <p className="text-sm mb-4 text-gray-400">
          Backend:{" "}
          <span className={backendStatus === "Connected" ? "text-green-400" : "text-red-400"}>
            {backendStatus}
          </span>
        </p>

        {/* CONTINUE CARD */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-4"
        >
          <h2 className="text-xl font-semibold mb-2">
            Continue your work
          </h2>

          <p className="text-gray-400 text-sm mb-4">
            {homeData?.last_event
              ? `Last session: ${homeData.last_event}`
              : "No previous activity yet"}
          </p>

          <button className="w-full bg-white text-black py-3 rounded-2xl font-semibold">
            Continue
          </button>
        </motion.div>

        {/* TOP MODULES */}
        <motion.div
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-4"
        >
          <h2 className="text-lg font-semibold mb-3">
            Frequently used modules
          </h2>

          <div className="space-y-2">
            {homeData?.top_modules?.length ? (
              homeData.top_modules.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm text-gray-300"
                >
                  <span>{m.event_category || "unknown"}</span>
                  <span className="text-gray-500">{m.count}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No usage data yet
              </p>
            )}
          </div>
        </motion.div>

        {/* RECENT ACTIVITY */}
        <motion.div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <h2 className="text-lg font-semibold mb-3">
            Recent activity
          </h2>

          <div className="space-y-2 max-h-40 overflow-auto">
            {homeData?.recent_events?.length ? (
              homeData.recent_events.map((e, i) => (
                <div key={i} className="text-xs text-gray-400">
                  {e.event_type} • {e.created_at}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No events yet
              </p>
            )}
          </div>
        </motion.div>

      </motion.div>
    </main>
  );
}