"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl"
      >

        {/* LOGO / TITLE */}
        <div className="flex items-center gap-3 mb-8">

          <div className="bg-white text-black p-2 rounded-2xl">
            <Sparkles size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Capere
            </h1>

            <p className="text-gray-400 text-sm">
              Adaptive Educational Intelligence
            </p>
          </div>

        </div>


        {/* ONBOARDING CARD */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
        >

          {/* PROGRESS */}
          <div className="mb-6">

            <div className="flex justify-between mb-2 text-sm text-gray-400">
              <span>Getting Started</span>
              <span>25%</span>
            </div>

            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "25%" }}
                transition={{ duration: 1 }}
                className="h-full bg-white rounded-full"
              />

            </div>

          </div>


          {/* EMOTIONAL MESSAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >

            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
              Welcome
            </p>

            <h2 className="text-4xl font-bold leading-tight mb-4">
              Let’s personalize your learning experience.
            </h2>

            <p className="text-gray-400 text-lg">
              Capere adapts to your goals, workflow, and learning style.
            </p>

          </motion.div>


          {/* QUESTION */}
          <div className="mb-8">

            <label className="block text-sm text-gray-400 mb-3">
              What level are you in?
            </label>

            <input
              type="text"
              placeholder="e.g Secondary"
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-2xl
                px-5
                py-4
                text-lg
                outline-none
                focus:border-white
                transition
              "
            />

          </div>


          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full
              bg-white
              text-black
              py-4
              rounded-2xl
              font-semibold
              text-lg
              transition
            "
          >
            Continue
          </motion.button>

        </motion.div>

      </motion.div>

    </main>
  );
}