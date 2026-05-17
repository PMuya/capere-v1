"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [level, setLevel] = useState("");

  useEffect(() => {
    fetch("https://capere-v1-backend.onrender.com/api/health/")
      .then((res) => {
        if (!res.ok) throw new Error("Network response failed");
        return res.json();
      })
      .then(() => setBackendStatus("Connected"))
      .catch(() => setBackendStatus("Backend Error"));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl"
      >

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white text-black p-2 rounded-2xl">
            <Sparkles size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Capere</h1>
            <p className="text-gray-400 text-sm">
              Adaptive Educational Intelligence
            </p>
          </div>
        </div>

        {/* STATUS */}
        <p className="text-sm mb-4 text-gray-400">
          Backend:{" "}
          <span
            className={
              backendStatus === "Connected"
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {backendStatus}
          </span>
        </p>

        {/* CARD */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
        >

          {/* TITLE */}
          <h2 className="text-2xl font-bold mb-2">
            Let’s personalize your learning experience
          </h2>

          <p className="text-gray-400 mb-6">
            Capere adapts to your goals and learning style.
          </p>

          {/* INPUT */}
          <label className="block text-sm text-gray-400 mb-2">
            What level are you in?
          </label>

          <input
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            type="text"
            placeholder="Primary, Secondary, College..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-lg outline-none focus:border-white transition mb-6"
          />

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-lg"
            onClick={() => {
              alert(`Level saved: ${level}`);
            }}
          >
            Continue
          </motion.button>

        </motion.div>

      </motion.div>
    </main>
  );
}