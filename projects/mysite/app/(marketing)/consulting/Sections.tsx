"use client";

import { motion } from "framer-motion";
import { BadgeSpark, IconFlow, IconTarget, IconSpark, IconChart, IconShield, IconCalendar, IconMail, IconDb, IconZap } from "./Icons";
import { SITE, HOW_IT_WORKS, USE_CASES, SYSTEMS, RESULTS } from "./data";

const fade = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export function Hero() {
  return (
    <section className="pt-16 md:pt-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={fade}
        className="text-center"
      >
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600">
          <BadgeSpark />
          {SITE.brand} Consulting & Automation
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          AI automation for real-world businesses
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          We design intelligent workflows that replace manual prospecting and follow-ups — from lead capture to personalized outreach and analytics.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="/contact"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            Book a free automation audit
          </a>
          <a
            href="/#workflows"
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            See example workflows
          </a>
        </div>
        {/* hero visual */}
        <motion.div
          variants={fade}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3"
        >
          <Node label="Lead Capture" icon={<IconTarget />} />
          <Connector />
          <Node label="AI Personalization" icon={<IconSpark />} />
          <Connector />
          <Node label="Outreach & CRM" icon={<IconMail />} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="mt-16 md:mt-24">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="text-center text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl"
      >
        How it works
      </motion.h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {HOW_IT_WORKS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
              {s.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function UseCases() {
  return (
    <section className="mt-16 md:mt-24">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="text-center text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl"
      >
        Built for your industry
      </motion.h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {USE_CASES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-indigo-50">
              {c.icon}
            </div>
            <h3 className="text-base font-semibold text-gray-900">{c.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Systems() {
  return (
    <section id="workflows" className="mt-16 md:mt-24">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="text-center text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl"
      >
        What we build
      </motion.h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {SYSTEMS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
              {s.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
            <ul className="mt-3 list-inside list-disc text-sm text-gray-600">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Results() {
  return (
    <section className="mt-16 md:mt-24">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="text-center text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl"
      >
        Outcomes that matter
      </motion.h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {RESULTS.map((r, i) => (
          <motion.div
            key={r.kpi}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm"
          >
            <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
              {r.icon}
            </div>
            <div className="text-2xl font-semibold text-gray-900">{r.kpi}</div>
            <div className="mt-1 text-sm text-gray-600">{r.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="mt-16 md:mt-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-tr from-indigo-50 to-white p-8 md:p-10"
      >
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-gray-900 md:text-2xl">
            Let’s automate your next bottleneck
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-gray-700">
            Book a free audit. We’ll map your highest-leverage automations and deliver a practical plan in days.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            >
              Get my free audit
            </a>
            <a
              href="/pricing"
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              See pricing
            </a>
          </div>
        </div>
        <IconFlow className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-20" />
      </motion.div>
    </section>
  );
}

/** small building blocks */
function Node({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">{icon}</div>
      <div className="text-xs font-medium text-gray-700">{label}</div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center">
      <span className="h-px w-8 bg-gray-200" />
    </div>
  );
}
