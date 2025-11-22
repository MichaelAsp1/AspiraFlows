"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "🎯",
    title: "Find roles that match you",
    body: "AspiraFlows scans curated sources for roles that fit your skills, region, and goals.",
  },
  {
    icon: "🧑‍💼",
    title: "Reach real decision-makers",
    body: "We attach hiring managers, founders, and recruiters to each role – not just generic inboxes.",
  },
  {
    icon: "✉️",
    title: "Send personalised outreach",
    body: "AI drafts warm, human messages you can review, edit, and schedule in a few clicks.",
  },
  {
    icon: "📊",
    title: "Track replies & progress",
    body: "One clear view for roles, people, messages, replies, and interviews.",
  },
];

// static positions so SSR === client
const STAR_POSITIONS = [
  { top: "8%", opacity: "0.5", delay: "0.6s" },
  { top: "22%", opacity: "0.8", delay: "1.4s" },
  { top: "36%", opacity: "0.45", delay: "2.2s" },
  { top: "50%", opacity: "0.7", delay: "0.9s" },
  { top: "64%", opacity: "0.55", delay: "1.9s" },
  { top: "78%", opacity: "0.8", delay: "2.8s" },
  { top: "92%", opacity: "0.45", delay: "3.3s" },
];

export default function FeatureTimelineStrip() {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden">
      {/* soft radial background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12),_transparent_60%)] sm:bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.15),_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center text-[0.7rem] sm:text-sm font-semibold tracking-[0.28em] text-cyan-300/80 uppercase"
        >
          How it works
        </motion.p>

        {/* main vertical timeline container */}
        <div className="relative mt-10 sm:mt-14 mx-auto max-w-5xl">
          {/* DESKTOP: glowing center spine */}
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden sm:block -translate-x-1/2 w-[3px] bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400" />

          {/* DESKTOP: star trail along the spine */}
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden sm:block -translate-x-1/2">
            {STAR_POSITIONS.map((star, idx) => (
              <div
                key={idx}
                className="absolute h-[4px] w-[4px] rounded-full bg-white/70 animate-floatStar"
                style={{
                  top: star.top,
                  left: "-2px",
                  opacity: star.opacity,
                  animationDelay: star.delay,
                }}
              />
            ))}
          </div>

          {/* steps */}
          <div className="space-y-10 sm:space-y-16">
            {steps.map((step, index) => {
              const isRightSide = index % 2 === 0; // step 1,3 right; 2,4 left

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex items-center"
                >
                  {/* LEFT COLUMN (desktop only) */}
                  <div className="hidden sm:block flex-1">
                    {!isRightSide && (
                      <StepContent index={index} step={step} align="right" />
                    )}
                  </div>

                  {/* CENTER DOT + ICON */}
                  <div className="relative flex flex-col items-center mx-4 sm:mx-8">
                    {/* MOBILE: local vertical line that moves with the emoji */}
                    <div className="absolute inset-y-[-32px] w-[2px] bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 sm:hidden" />

                    {/* glowing dot with slow pulse */}
                    <div className="relative mb-3">
                      <div className="absolute inset-0 rounded-full bg-cyan-300/60 blur-md opacity-70 animate-ping-slow" />
                      <div className="relative h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-br from-cyan-300 to-purple-300 shadow-[0_0_18px_rgba(56,189,248,0.85)] sm:shadow-[0_0_22px_rgba(56,189,248,0.85)]" />
                    </div>

                    {/* icon bubble */}
                    <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-slate-900/95 text-xl sm:text-2xl shadow-[0_0_18px_rgba(15,23,42,0.95)]">
                      <span aria-hidden="true">{step.icon}</span>
                    </div>
                  </div>

                  {/* RIGHT COLUMN / MOBILE CONTENT */}
                  <div className="flex-1">
                    {/* Mobile: always centered content here */}
                    <div className="sm:hidden">
                      <StepContent index={index} step={step} align="center" />
                    </div>
                    {/* Desktop: content on right if isRightSide */}
                    <div className="hidden sm:block">
                      {isRightSide && (
                        <StepContent index={index} step={step} align="left" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Small helper so we don't repeat the markup
 */
function StepContent({
  index,
  step,
  align,
}: {
  index: number;
  step: { title: string; body: string };
  align: "left" | "right" | "center";
}) {
  const alignmentClasses =
    align === "left"
      ? "text-left sm:pl-4"
      : align === "right"
      ? "text-right sm:pr-4"
      : "text-center mx-auto";

  return (
    <div className={`max-w-md ${alignmentClasses}`}>
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80 mb-3">
        <span className="opacity-80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-[3px] w-[3px] rounded-full bg-cyan-300" />
        <span>Step {index + 1}</span>
      </div>

      <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-white">
        {step.title}
      </h3>
      <p className="mt-2 text-sm sm:text-base text-gray-300">{step.body}</p>
    </div>
  );
}
