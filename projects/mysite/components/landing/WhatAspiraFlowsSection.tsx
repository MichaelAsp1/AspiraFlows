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
    <section className="relative py-28 overflow-hidden">
      {/* soft radial background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.15),_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center text-xs sm:text-sm font-semibold tracking-[0.28em] text-cyan-300/80 uppercase"
        >
          How it works
        </motion.p>

        {/* main vertical timeline container */}
        <div className="relative mt-14 mx-auto max-w-5xl">
          {/* glowing center spine */}
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] bg-gradient-to-b from-cyan-400/70 via-purple-400/70 to-pink-400/70 blur-[1px]" />

          {/* star trail along the spine */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0">
            {STAR_POSITIONS.map((star, idx) => (
              <div
                key={idx}
                className="absolute h-[4px] w-[4px] rounded-full bg-white/45 animate-floatStar"
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
          <div className="space-y-14 sm:space-y-16">
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
                  {/* LEFT COLUMN */}
                  <div className="hidden sm:block flex-1">
                    {!isRightSide && (
                      <StepContent index={index} step={step} align="right" />
                    )}
                  </div>

                  {/* CENTER DOT + ICON */}
                  <div className="relative flex flex-col items-center mx-4 sm:mx-8">
                    {/* glowing dot with slow pulse */}
                    <div className="relative mb-3">
                      <div className="absolute inset-0 rounded-full bg-cyan-300/60 blur-lg opacity-80 animate-ping-slow" />
                      <div className="relative h-7 w-7 rounded-full bg-gradient-to-br from-cyan-300 to-purple-300 shadow-[0_0_22px_rgba(56,189,248,0.85)]" />
                    </div>

                    {/* icon bubble */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/95 text-2xl shadow-[0_0_22px_rgba(15,23,42,0.95)]">
                      <span aria-hidden="true">{step.icon}</span>
                    </div>
                  </div>

                  {/* RIGHT COLUMN / MOBILE CONTENT */}
                  <div className="flex-1">
                    {/* Desktop: content on right if isRightSide, otherwise left column above */}
                    {/* Mobile: always render content here centered */}
                    <div className="sm:hidden">
                      <StepContent index={index} step={step} align="center" />
                    </div>
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
      : "text-center";

  return (
    <div className={`max-w-md ${alignmentClasses}`}>
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80 mb-3">
        <span className="opacity-80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-[3px] w-[3px] rounded-full bg-cyan-300" />
        <span>Step {index + 1}</span>
      </div>

      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">
        {step.title}
      </h3>
      <p className="mt-2 text-sm sm:text-base text-gray-300">
        {step.body}
      </p>
    </div>
  );
}
