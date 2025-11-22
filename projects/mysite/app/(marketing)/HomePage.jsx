"use client";

import { motion } from "framer-motion";
import Marquee from "../../components/Marquee";


export default function Home() {
  return (
    <main className="relative text-white">
  {/* Neon corner glows */}
  <div className="pointer-events-none absolute top-[-20rem] right-[-10rem] h-[35rem] w-[35rem] rounded-full bg-cyan-500/20 blur-[160px]"></div>

  <div className="pointer-events-none absolute bottom-[-20rem] left-[-10rem] h-[35rem] w-[35rem] rounded-full bg-purple-500/20 blur-[160px]"></div>
      {/* HERO (neon dark theme) */}
      <section className="relative overflow-hidden">
        {/* Dark base with circuit pattern */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 dark-circuit-bg" />

        {/* Neon glows */}
        <div className="pointer-events-none absolute -z-10 -top-24 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-[80px]" />
        <div className="pointer-events-none absolute -z-10 -bottom-24 -left-16 h-72 w-72 rounded-full bg-purple-500/30 blur-[80px]" />

        {/* Neon grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-soft-light" />

        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          {/* Line 1: brand */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-6xl font-bold tracking-tight text-white sm:text-7xl neon-text-cyan"
          >
            AspiraFlows
          </motion.h1>

          {/* Line 2: animated gradient tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animated-gradient"
          >
            Automate Outreach. Grow Faster.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg text-gray-300"
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
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition will-change-transform hover:translate-y-[1px] neon-glow-cyan"
            >
              Get Started
            </a>
            <a
              href="/pricing"
              className="inline-block px-6 py-3 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition will-change-transform hover:translate-y-[1px]"
            >
              See Pricing
            </a>
          </motion.div>

          
        </div>
      </section>


      <section className="relative mx-auto max-w-6xl px-4 pb-16">
  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent" />

  <h2 className="text-3xl font-semibold text-center mb-2">
    What AspiraFlows Does For You
  </h2>
  <p className="text-center text-gray-600 max-w-xl mx-auto text-sm mb-10">
    No spam. No “Easy Apply”. Just real people, real replies, real chances.
  </p>

  <div className="grid md:grid-cols-3 gap-6">
    {/* Card 1 */}
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-2xl mb-2">🎯</div>
      <h3 className="font-semibold text-gray-900">Find Better Jobs</h3>
      <p className="mt-2 text-sm text-gray-600">
        We search the web and pick out roles that actually fit you. 
        No endless scrolling. No junk.
      </p>
      <p className="mt-3 text-xs text-gray-500">
        Example: “Here are 12 roles this week that match your skills.”
      </p>
    </div>

    {/* Card 2 */}
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-2xl mb-2">🧑‍💼</div>
      <h3 className="font-semibold text-gray-900">Reach Real People</h3>
      <p className="mt-2 text-sm text-gray-600">
        Skip the job portals. We find hiring managers, founders and recruiters.
      </p>
      <p className="mt-3 text-xs text-gray-500">
        Example: “Here’s the engineering manager for this role.”
      </p>
    </div>

    {/* Card 3 */}
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-2xl mb-2">✉️</div>
      <h3 className="font-semibold text-gray-900">Send Messages That Work</h3>
      <p className="mt-2 text-sm text-gray-600">
        Friendly, short messages written for you.  
        They sound human—because they are.
      </p>
      <p className="mt-3 text-xs text-gray-500">
        Example: “Hey Sarah, loved your team’s recent launch…”
      </p>
    </div>

    {/* Card 4 */}
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-2xl mb-2">🚀</div>
      <h3 className="font-semibold text-gray-900">Stay On Track</h3>
      <p className="mt-2 text-sm text-gray-600">
        See who replied, who reviewed your profile, 
        and where you’re getting interviews.
      </p>
      <p className="mt-3 text-xs text-gray-500">
        Simple. Clear. No spreadsheets.
      </p>
    </div>

    {/* Card 5 */}
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-2xl mb-2">📅</div>
      <h3 className="font-semibold text-gray-900">Weekly Progress</h3>
      <p className="mt-2 text-sm text-gray-600">
        A short weekly update: new roles found, people contacted, replies received.
      </p>
      <p className="mt-3 text-xs text-gray-500">
        “This week: 9 new roles, 4 replies, 1 interview booked.”
      </p>
    </div>

    {/* Card 6 */}
    <div className="rounded-2xl border border-pink-500/30 bg-slate-800/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-pink-400/50 transition neon-glow-pink">
      <div className="text-2xl mb-2">🔒</div>
      <h3 className="font-semibold text-white">Private & Simple</h3>
      <p className="mt-2 text-sm text-gray-300">
        Your profile stays yours. You control what gets sent and when.
      </p>
      <p className="mt-3 text-xs text-gray-400">
        No spam. No mass-blasting. Ever.
      </p>
    </div>
  </div>
</section>


      {/* 🔥 Scrolling feature strip */}
      <Marquee />

      <section className="relative border-y border-cyan-500/30 py-16 overflow-hidden">
  {/* dark background tint */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/40 via-purple-900/20 to-slate-900/40" />
  {/* small corner glow, not huge */}
  <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-cyan-500/25 blur-[60px]" />
  <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-purple-500/25 blur-[60px]" />

  <div className="relative mx-auto max-w-6xl px-4">
    <h2 className="text-2xl font-semibold text-center mb-3">
      A real example of how AspiraFlows helps you get replies
    </h2>
    <p className="text-center text-gray-600 text-sm max-w-xl mx-auto mb-10">
      Here’s a simple, friendly message that led to a call with a fintech founder —
      plus how the system found the opportunity.
    </p>

    <div className="grid gap-6 md:grid-cols-3">
      {/* SYSTEM CARD */}
      <div className="rounded-2xl border bg-indigo-50 p-6 shadow-sm flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">
          🔍 How AspiraFlows found this opportunity
        </h3>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="rounded-lg bg-white p-3 border text-xs">
            <span className="font-semibold text-indigo-600">Step 1 — Job spotted</span><br />
            “Growth Systems Engineer — Fintech Startup (Berlin)”
          </div>

          <div className="rounded-lg bg-white p-3 border text-xs">
            <span className="font-semibold text-indigo-600">Step 2 — Contact found</span><br />
            <strong>Oliver Braun</strong> — Co-Founder & CEO
          </div>

          <div className="rounded-lg bg-white p-3 border text-xs">
            <span className="font-semibold text-indigo-600">Step 3 — Message drafted</span><br />
            Friendly intro written based on your skills + their product.
          </div>
        </div>

        <p className="mt-5 text-[11px] text-gray-500">
          Names &amp; details anonymised, but flow is real.
        </p>
      </div>

      {/* YOUR EMAIL */}
      <div className="rounded-2xl border bg-gray-50 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-white text-sm font-semibold">
            S
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">
              You — “Sarah”
            </div>
            <div className="text-xs text-gray-500">
              Message sent to a fintech founder
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-3 text-xs border border-slate-200">
          <p className="text-slate-700 leading-relaxed">
            Hi Oliver, I’ve been building a small agent that finds roles where my
            background (embedded systems + ML + automation) is actually useful —
            your company popped to the top. I think I can add value by automating
            growth workflows and strengthening your data pipelines.
            <br /><br />
            If this sounds interesting, I’d love a quick chat.
            Happy to work around your schedule.
            <br /><br />
            Best,
            <br />
            Sarah
          </p>
        </div>
      </div>

      {/* THEIR REPLY */}
      <div className="rounded-2xl border border-emerald-500/30 bg-slate-800/50 backdrop-blur-sm p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-semibold">
            O
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Oliver B. — Co-Founder
            </div>
            <div className="text-xs text-gray-400">
              Reply from the founder
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-slate-700/50 p-3 text-xs border border-emerald-500/30">
          <p className="text-gray-300 leading-relaxed">
            Hi Sarah,
            <br /><br />
            You’ve got my attention.
            <br /><br />
            Are you free Monday at 10am for a quick call?
            Also — are you thinking full-time or freelance?
            <br /><br />
            Best,
            <br />
            Oliver
          </p>
        </div>

        <p className="mt-3 text-[11px] text-gray-400">
          Short, friendly message → direct reply → call booked.
        </p>
      </div>
    </div>
  </div>
</section>


      <section className="relative py-20 bg-gradient-to-b from-white to-indigo-50/40 overflow-hidden">
  <div className="relative mx-auto max-w-6xl px-4">
    <h2 className="text-3xl font-bold text-center mb-4">
      Your Simple, Personal Dashboard
    </h2>
    <p className="text-center text-gray-600 max-w-xl mx-auto mb-10 text-sm">
      See applications sent and people contacted – with a clear view of what’s
      happening in your search.–
      all in one clear view.
    </p>

    <div className="rounded-2xl border bg-white shadow-md overflow-hidden">
      <img
        src="/Dashboard1_Sens.PNG"   // 👈 matches the filename in /public
        alt="AspiraFlows dashboard"
        className="w-full h-auto"
      />
    </div>
  </div>
</section>

     {/* PRICING (with soft gradient and hover polish) */}
<section className="relative">
  {/* Dark gradient background to add depth */}
  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/40 via-purple-900/20 to-slate-900/40" />

  <div className="mx-auto max-w-6xl px-4 py-16">
    <h2 className="text-3xl font-semibold text-center mb-10 text-white neon-text-cyan">Pricing</h2>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          name: "Starter",
          price: "€19/mo",
          tagline: "For testing the waters",
          badge: "",
          features: [
            "Up to 20 job matches/week",
            "80 personalized outreach emails/month",
            "Basic AI job scoring",
            "Progress dashboard"
          ],
        },
        {
          name: "Professional",
          price: "€39/mo",
          tagline: "For serious job hunters",
          badge: "Most Popular",
          features: [
            "Up to 50 job matches/week",
            "200 outreach emails/month",
            "Multi-contact targeting (recruiter + hiring manager)",
            "Reply tracking & analytics dashboard",
          ],
        },
        {
          name: "Intensive",
          price: "€79/mo",
          tagline: "For maximum momentum",
          badge: "",
          features: [
            "Up to 100 job matches/week",
            "500 outreach emails/month",
            "Multi-channel campaigns (email + LinkedIn)",
            "Custom templates & weekly summary reports",
          ],
        },
      ].map((p) => (
        <div
          key={p.name}
          className="relative rounded-xl border border-cyan-500/30 bg-slate-800/50 backdrop-blur-sm p-6 shadow-sm text-center hover:shadow-lg hover:border-cyan-400/50 transition-all duration-300"
        >
          {p.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
              {p.badge}
            </div>
          )}

          <h3 className="text-xl font-semibold text-white">{p.name}</h3>
          <p className="text-sm text-gray-400 mt-1 mb-3">{p.tagline}</p>

          <p className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {p.price}
          </p>

          <ul className="text-sm text-gray-300 space-y-2 mb-6 text-left">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-5 py-2.5 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 neon-glow-cyan"
          >
            Choose Plan
          </a>
        </div>
      ))}
    </div>

    <p className="text-center text-gray-300 mt-8">
      <strong>Bespoke (Agency/University):</strong> Bulk accounts, branded dashboards, analytics API access.{" "}
      <a href="/contact" className="underline hover:text-cyan-400 transition">
        Contact us
      </a>{" "}
      for a quote.
    </p>
  </div>
</section>


      <section className="relative py-20">
  {/* soft glow */}
  <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-[130px]" />

  <div className="relative mx-auto max-w-6xl px-4">
    <h2 className="text-2xl font-semibold mb-10 text-white neon-text-purple">
      What people say about AspiraFlows
    </h2>

    <div className="grid md:grid-cols-3 gap-10">

      {/* Sarah — LEFT (down) */}
      <div className="rounded-2xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition translate-y-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-pink-400 text-white flex items-center justify-center text-sm font-semibold">
            S
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Sarah</div>
            <div className="text-xs text-slate-500">Marketing Graduate</div>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          “I felt invisible sending applications. With AspiraFlows I finally got
          real replies. The messages sound friendly and real — that’s why they work.”
        </p>
      </div>

      {/* James — MIDDLE (up) */}
      <div className="rounded-2xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition -translate-y-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
            J
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">James</div>
            <div className="text-xs text-slate-500">Junior Software Developer</div>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          “I stopped dropping my CV into portals and actually reached managers directly.
           Two interviews in a week from messages I’d never have thought to send.”
        </p>
      </div>

      {/* Aisha — RIGHT (down, matching Sarah) */}
      <div className="rounded-2xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition translate-y-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold">
            A
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Aisha</div>
            <div className="text-xs text-slate-500">Data Analyst</div>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          “I didn’t expect much, but my first reply came from a Head of Data.
           The intro message was short, kind, and actually sounded like me.
           This feels way better than mass applying.”
        </p>
      </div>

    </div>
  </div>
</section>



      {/* CONTACT CTA */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4 text-white neon-text-cyan">Ready to reach decision-makers faster?</h2>
        <a href="/contact" className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition neon-glow-cyan">
          Contact Us
        </a>
      </section>
    </main>
  );
}
