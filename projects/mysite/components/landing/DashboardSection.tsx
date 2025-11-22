"use client";

import { motion } from "framer-motion";

// -----------------------------------------------------------------------------
// Main Section
// -----------------------------------------------------------------------------

export default function DashboardSection() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(89,174,255,0.18),_transparent_70%)]" />

      <div className="max-w-[1500px] mx-auto px-4">
        {/* Heading */}
        <Header />

        {/* Dashboard Preview */}
        <DashboardPreview />

        {/* Stats */}
        <DashboardStats />
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Header
// -----------------------------------------------------------------------------

function Header() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl sm:text-4xl font-semibold text-white">
        Your Simple, Personal Dashboard
      </h2>
      <p className="mt-3 text-sm sm:text-base text-gray-300">
        A unified view of your applications, contacts, and pipeline — all updated
        automatically.
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Dashboard Preview (image + glow)
// -----------------------------------------------------------------------------

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center"
    >
      <div className="relative w-full max-w-[1200px]">
        {/* Soft Cyan/Purple Glow */}
        <div
          className="
            pointer-events-none absolute -inset-8
            rounded-[2.8rem]
            bg-[conic-gradient(from_180deg,_rgba(56,189,248,0.22),_rgba(168,85,247,0.22),_rgba(56,189,248,0.22))]
            blur-3xl opacity-80
          "
        />

        <div
          className="
            relative rounded-[2.6rem] overflow-hidden
            bg-slate-900/80 border border-white/10 
            shadow-[0_40px_90px_rgba(0,0,0,0.7)]
          "
        >
          <img
            src="/Dashboard1_Sens.PNG"
            alt="AspiraFlows dashboard preview"
            className="w-full h-auto"
          />
        </div>
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Stats Section
// -----------------------------------------------------------------------------

function DashboardStats() {
  return (
    <div className="max-w-[900px] mx-auto mt-14 space-y-8">
      <QualityBar
        label="AI Role Quality"
        percent={87}
        subtitle="Highly relevant roles"
        gradient="from-emerald-400 via-cyan-400 to-emerald-400"
      />

      <QualityBar
        label="Contact Quality"
        percent={91}
        subtitle="Strong decision-makers"
        gradient="from-purple-400 via-cyan-400 to-purple-400"
      />

      <QualityBar
        label="Pipeline Strength"
        percent={74}
        subtitle="Balanced & improving"
        gradient="from-cyan-300 via-indigo-400 to-cyan-300"
      />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Quality Bar (Animated)
// -----------------------------------------------------------------------------

function QualityBar({
  label,
  percent,
  subtitle,
  gradient,
}: {
  label: string;
  percent: number;
  subtitle: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Label Row */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-200">{label}</span>
        <span className="text-xs text-gray-400">
          {percent}% • {subtitle}
        </span>
      </div>

      {/* Background track */}
      <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
        {/* Animated Fill */}
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} animate-barGlow`}
        />
      </div>
    </motion.div>
  );
}
