"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Dark gradient base + subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-900/30 to-teal-900/30" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-soft-light" />
        <div className="absolute -top-40 right-[-15%] h-96 w-96 rounded-full bg-cyan-600/25 blur-[140px]" />
        <div className="absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-purple-500/25 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-24 text-center">
        {/* HEADLINE */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-bold leading-[1.1] text-white"
        >
          {/* Line 1: The + coloured phrase */}
          <div className="flex flex-wrap justify-center gap-3 text-[3rem] sm:text-[3.6rem]">
            <span className="opacity-90">The</span>

            <span className="relative inline-block">
              {/* coloured phrase */}
              <motion.span
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
                className="
                  bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300
                  bg-clip-text text-transparent
                  animate-gradient-x-soft
                  whitespace-nowrap
                "
              >
                AI job search engine
              </motion.span>

              {/* underline: only under coloured part */}
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.45,
                }}
                className="
                  pointer-events-none
                  absolute -bottom-3 left-0 right-0 mx-auto
                  h-[3px] w-full origin-center
                  rounded-full
                  bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
                  shadow-[0_0_18px_rgba(236,72,153,0.6)]
                "
              />
            </span>
          </div>

          {/* Line 2 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.7,
            }}
            className="mt-6 text-[3.4rem] sm:text-[4.2rem]"
          >
            that actually gets replies
          </motion.div>
        </motion.h2>

        {/* SUBHEADLINE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
          className="max-w-2xl mx-auto mt-7 text-lg sm:text-xl text-gray-300"
        >
          Find the{" "}
          <span className="text-cyan-300 font-medium">right roles</span>. Reach{" "}
          <span className="text-purple-300 font-medium">real decision-makers</span>. Get{" "}
          <span className="text-pink-300 font-medium">more interviews</span>.
        </motion.p>

        {/* CTAs – bigger, more hero-ish */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.25 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href="/contact"
            className="
              inline-flex items-center justify-center
              min-w-[190px]
              px-8 py-4
              rounded-2xl
              text-base sm:text-lg font-medium
              bg-gradient-to-r from-cyan-500 to-purple-500
              text-white
              shadow-[0_0_30px_rgba(34,211,238,0.45)]
              hover:from-cyan-400 hover:to-purple-400
              hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]
              transition-all
            "
          >
            Get Started
          </a>

          <a
            href="/pricing"
            className="
              inline-flex items-center justify-center
              min-w-[190px]
              px-8 py-4
              rounded-2xl
              text-base sm:text-lg font-medium
              border border-cyan-500/60
              text-cyan-300
              bg-slate-900/40
              hover:bg-cyan-500/10 hover:border-cyan-300
              transition-all
            "
          >
            See Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}
