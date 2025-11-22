"use client";

import { motion } from "framer-motion";

const userBubble =
  "max-w-full sm:max-w-md rounded-2xl bg-indigo-600/90 text-xs sm:text-sm text-white px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.8)] break-words";
const botBubble =
  "max-w-full sm:max-w-md rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-xs sm:text-sm text-cyan-50 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.9)] break-words";
const founderBubble =
  "max-w-full sm:max-w-md rounded-2xl bg-slate-900/90 border border-emerald-400/50 text-xs sm:text-sm text-emerald-50 px-4 py-3 shadow-[0_18px_40px_rgba(16,185,129,0.35)] break-words";

export default function ExampleFlowSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-900" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-2">
            Real flow · Real reply
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            A real example of how AspiraFlows helps you get replies
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mt-3">
            From a few quick answers to a personalised outreach message — and a real reply
            from a founder. This is how one sequence actually ran.
          </p>
        </div>

        {/* Flow Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl bg-slate-900/70 border border-slate-700/60 p-5 sm:p-8 backdrop-blur-xl shadow-[0_0_60px_-20px_rgba(15,23,42,0.95)]"
        >
          {/* top label */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
              <span className="text-base">✨</span>
              <span>How one AspiraFlows sequence played out</span>
            </div>
            <span className="text-[11px] text-gray-400">
              Names and details anonymised — flow and outcome are real.
            </span>
          </div>

          {/* Conversation / Flow */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Step 1 */}
            <StepLabel step="Step 1" label="Tell AspiraFlows what you want" />

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <Avatar type="bot" />
                <div className={botBubble}>
                  What kind of roles are you interested in right now?
                </div>
              </div>

              <div className="flex items-start justify-end gap-2 sm:gap-3">
                <div className={userBubble}>
                  Growth / systems roles where my background (embedded systems + ML +
                  automation) actually helps — ideally in fast-moving fintech companies.
                </div>
                <Avatar type="user" />
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <Avatar type="bot" />
                <div className={botBubble}>
                  Got it. Which locations should I focus on?
                </div>
              </div>

              <div className="flex items-start justify-end gap-2 sm:gap-3">
                <div className={userBubble}>
                  Berlin, and remote-friendly roles across Europe.
                </div>
                <Avatar type="user" />
              </div>
            </div>

            {/* Step 2 */}
            <StepLabel step="Step 2" label="Add your profile / CV" />

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <Avatar type="bot" />
                <div className={botBubble}>
                  Perfect. Drop your CV or LinkedIn and I&apos;ll use it to personalise your
                  outreach.
                </div>
              </div>

              <div className="flex items-start justify-end gap-2 sm:gap-3">
                <div className="flex flex-col items-end gap-2">
                  <div className={userBubble}>
                    <span className="block font-semibold mb-1">Files added</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px]">
                        📄 sarah_cv.pdf
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px]">
                        🔗 LinkedIn profile
                      </span>
                    </div>
                  </div>
                </div>
                <Avatar type="user" />
              </div>
            </div>

            {/* Step 3 */}
            <StepLabel step="Step 3" label="AspiraFlows finds the opportunity" />

            <div className="flex items-start gap-2 sm:gap-3">
              <Avatar type="bot" />
              <div className={botBubble}>
                I&apos;ve found a role that matches:{" "}
                <span className="font-semibold">
                  &quot;Growth Systems Engineer — Fintech Startup (Berlin)&quot;
                </span>
                . The best contact is{" "}
                <span className="font-semibold">Oliver Braun, Co-Founder &amp; CEO</span>.
                <br />
                <br />
                Here&apos;s the personalised message I drafted for him:
              </div>
            </div>

            {/* Generated message */}
            <div className="flex items-start justify-end gap-2 sm:gap-3">
              <div className="max-w-full sm:max-w-xl rounded-2xl bg-slate-950/80 border border-slate-700/70 px-4 py-4 text-xs sm:text-sm text-gray-200 leading-relaxed">
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-gray-400">
                  Generated outreach · Ready to send
                </p>
                <p>
                  Hi Oliver, I’ve been building a small agent that finds roles where my
                  background (embedded systems + ML + automation) is actually useful — your
                  company popped to the top. I think I can add value by automating growth
                  workflows and strengthening your data pipelines.
                </p>
                <br />
                <p>
                  If this sounds interesting, I’d love a quick chat. Happy to work around
                  your schedule.
                </p>
                <br />
                <p>
                  Best,
                  <br />
                  Sarah
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400">
                  <span>Sent automatically via AspiraFlows sequence.</span>
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Delivered to Oliver
                  </span>
                </div>
              </div>
              <Avatar type="user" />
            </div>

            {/* Step 4 */}
            <StepLabel step="Step 4" label="Founder replies" />

            <div className="flex items-start justify-end gap-2 sm:gap-3">
              <div className={founderBubble}>
                Hi Sarah,
                <br />
                <br />
                You’ve got my attention.
                <br />
                <br />
                Are you free Monday at 10am for a quick call? Also — are you thinking
                full-time or freelance?
                <br />
                <br />
                Best,
                <br />
                Oliver
              </div>
              <Avatar type="founder" />
            </div>

            <p className="mt-4 text-[11px] sm:text-xs text-gray-400 text-center sm:text-left">
              A few simple inputs → targeted opportunity → personalised message → direct
              reply from a founder.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Avatar({ type }: { type: "bot" | "user" | "founder" }) {
  if (type === "user") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-semibold text-white">
        S
      </div>
    );
  }

  if (type === "founder") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
        O
      </div>
    );
  }

  // bot / AspiraFlows
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/90 text-[10px] font-semibold text-slate-950">
      AF
    </div>
  );
}

function StepLabel({ step, label }: { step: string; label: string }) {
  return (
    <div className="mt-4 mb-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-gray-400">
      <span className="inline-flex items-center justify-center rounded-full bg-slate-900/90 px-2.5 py-1 font-medium text-[11px] text-cyan-200 border border-slate-700/80">
        {step}
      </span>
      <span>{label}</span>
    </div>
  );
}
