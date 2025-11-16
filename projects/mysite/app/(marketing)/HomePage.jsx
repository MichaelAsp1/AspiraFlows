"use client";

import { motion } from "framer-motion";
import Marquee from "../../components/Marquee";


export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* HERO (modern gradient + glow + motion, stacked layout) */}
      <section className="relative overflow-hidden">
         
        {/* Ambient gradient backdrop */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />

        {/* Diffused glow from top-right */}
        <div className="pointer-events-none absolute -z-10 top-[-10rem] right-[-10rem] h-[40rem] w-[40rem] bg-gradient-to-tr from-indigo-300/30 via-purple-300/20 to-transparent blur-[120px]" />

        {/* Secondary glow from bottom-left */}
        <div className="pointer-events-none absolute -z-10 bottom-[-10rem] left-[-10rem] h-[30rem] w-[30rem] bg-gradient-to-br from-blue-300/20 via-indigo-200/10 to-transparent blur-[120px]" />
        
        {/* Soft background gradient */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />

        {/* Blurred color glow */}
        <div className="pointer-events-none absolute -z-10 top-1/2 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-500/30 via-purple-400/30 to-blue-400/30 blur-[120px]" />

        {/* Subtle radial accent */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_45%)]" />

        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          {/* Line 1: brand */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl"
          >
            AspiraFlows
          </motion.h1>

          {/* Line 2: animated gradient tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 bg-clip-text text-transparent animated-gradient"
          >
            Automate Outreach. Grow Faster.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg text-gray-600"
          >
            Stand out and connect directly with decision-makers. AI-driven personalisation
            and workflow automation to reduce time-to-interview.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <a
              href="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition will-change-transform hover:translate-y-[1px]"
            >
              Get Started
            </a>
            <a
              href="/pricing"
              className="inline-block px-6 py-3 rounded-lg border hover:bg-white transition will-change-transform hover:translate-y-[1px]"
            >
              See Pricing
            </a>
          </motion.div>

          <div className="mt-4 text-xs text-gray-500">
            No credit card required • Cancel anytime
          </div>
        </div>
      </section>


      {/* OVERVIEW / FEATURES (with subtle background gradient) */}
      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        {/* Soft gradient highlight behind this section */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent" />

        <h2 className="text-3xl font-semibold mb-6 text-center">
          What AspiraFlows Automates
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "AI Job Matching", d: "Scan job boards & LinkedIn, filter by skills/location, score relevance (0–100), send daily/weekly digests." },
            { t: "Decision-Maker Discovery", d: "Identify recruiters, hiring managers, team leads via enrichment (Apollo, Clay, Apify), verify email/LinkedIn." },
            { t: "Personalized Outreach", d: "GPT-based intros, icebreakers & follow-ups across email/LinkedIn; each message tailored to contact & company." },
            { t: "Automated Campaigns", d: "n8n-powered workflows track sends, opens, replies; update dashboards (Metabase / internal portal)." },
            { t: "Analytics & Insights", d: "See outreach volume, response rates, and conversion (reply → interview → offer); refine targeting & tone." },
            { t: "Privacy & Flexibility", d: "GDPR-compliant pipelines, anonymization where needed, custom workflows for job seekers or agencies." },
          ].map(({ t, d }) => (
            <div key={t} className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-gray-600">{d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* 🔥 Scrolling feature strip */}
      <Marquee />

      {/* PRICING (with soft gradient and hover polish) */}
      <section className="relative bg-white">
        {/* Gentle gradient background to add depth */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent" />

        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold text-center mb-10">Pricing</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "€49/mo",
                desc: "Up to 20 job matches/week, 80 personalized outreach messages/month, AI job scoring & progress dashboard",
              },
              {
                name: "Professional",
                price: "€99/mo",
                desc: "Up to 50 job matches/week, 200 outreach messages/month, multi-contact targeting, analytics & reply tracking",
                badge: "Most Popular",
              },
              {
                name: "Executive",
                price: "€199/mo",
                desc: "Up to 100 job matches/week, 500 outreach messages/month, multi-channel campaigns (email + LinkedIn), custom templates & weekly reports",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-xl border bg-gray-50 p-6 shadow-sm text-center hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-3xl font-bold my-2 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {p.price}
                </p>
                <p className="text-gray-600 mb-6">{p.desc}</p>
                <a
                  href="/contact"
                  className="inline-block bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
                >
                  Choose Plan
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            <strong>Bespoke (Agency/University):</strong> Bulk accounts, branded dashboards, analytics API access.{" "}
            <a href="/contact" className="underline hover:text-indigo-600 transition">Contact us</a> for a quote.
          </p>
        </div>
      </section>

      {/* CONTACT CTA (unchanged) */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Ready to reach decision-makers faster?</h2>
        <a href="/contact" className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Contact Us
        </a>
      </section>
    </main>
  );
}
