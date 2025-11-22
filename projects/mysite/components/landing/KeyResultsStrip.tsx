"use client";

const stats = [
  {
    label: "AI Powered Outreach",
    primary: "AI",
    accent: "Powered",
    sub: "Smart, human-sounding messages for every role.",
    icon: "💡",
    glowClass:
      "group-hover:bg-[radial-gradient(circle_at_top_right,_rgba(244,114,182,0.45),_transparent_55%)]",
  },
  {
    label: "Pipeline Visibility",
    primary: "100",
    accent: "% Clarity",
    sub: "See roles, contacts and replies in one simple view.",
    icon: "🛡️",
    glowClass:
      "group-hover:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.5),_transparent_55%)]",
  },
  {
    label: "Interview Lift",
    primary: "3x",
    accent: "+",
    sub: "More warm intros, fewer ghosted applications.",
    icon: "📈",
    glowClass:
      "group-hover:bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.45),_transparent_55%)]",
  },
];

export default function KeyResultsStrip() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl lg:max-w-[1600px] px-4">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/70">
            Outcomes
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            What AspiraFlows actually changes
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
            A clean, AI-driven pipeline that quietly runs in the background while you
            focus on conversations — not spreadsheets.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative">
              {/* OUTER “other-side” glow */}
              <div
                className={`pointer-events-none absolute -inset-[1px] rounded-[2.4rem] opacity-0 blur-2xl transition duration-500 ${stat.glowClass}`}
              />

              {/* OUTER FRAME */}
              <div className="relative h-full rounded-[2.3rem] border border-slate-800/60 bg-slate-950/40 p-1 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(15,23,42,0.9)] transition duration-300 group-hover:border-slate-100/30">
                {/* INNER TILE */}
                <div
                  className="relative flex h-full flex-col justify-between rounded-[2rem]
                             border border-slate-900/80 bg-slate-950/85 px-8 py-7
                             shadow-[0_18px_50px_rgba(15,23,42,0.95)]
                             transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1
                             group-hover:shadow-[0_0_55px_rgba(15,118,211,0.4)]"
                >
                  {/* FLOATING STARS LAYER */}
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    {/* star 1 */}
                    <span
                      className="absolute left-6 top-7 h-1.5 w-1.5 rounded-full
                                 bg-cyan-300/80 blur-[0.5px]
                                 shadow-[0_0_14px_rgba(56,189,248,0.9)]
                                 animate-star-float-1"
                    />
                    {/* star 2 */}
                    <span
                      className="absolute right-9 top-10 h-1 w-1 rounded-full
                                 bg-pink-400/80 blur-[0.5px]
                                 shadow-[0_0_12px_rgba(244,114,182,0.9)]
                                 animate-star-float-2"
                    />
                    {/* star 3 */}
                    <span
                      className="absolute left-10 bottom-7 h-1 w-1 rounded-full
                                 bg-purple-400/75 blur-[0.5px]
                                 shadow-[0_0_12px_rgba(168,85,247,0.9)]
                                 animate-star-float-3"
                    />
                  </div>

                  {/* CONTENT LAYER */}
                  <div className="relative z-10">
                    {/* icon pill */}
                    <div
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl
                                 bg-slate-900/90 ring-1 ring-pink-500/40
                                 shadow-[0_0_24px_rgba(236,72,153,0.45)]
                                 transition duration-300 group-hover:ring-pink-400/80 group-hover:shadow-[0_0_34px_rgba(236,72,153,0.7)]"
                    >
                      <span className="text-lg" aria-hidden="true">
                        {stat.icon}
                      </span>
                      <span className="sr-only">{stat.label}</span>
                    </div>

                    {/* primary metric */}
                    <div className="mt-6 mb-1 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
                        {stat.primary}
                      </span>
                      <span className="text-2xl sm:text-3xl font-semibold text-pink-400">
                        {stat.accent}
                      </span>
                    </div>

                    {/* label + subcopy */}
                    <p className="text-sm font-medium text-slate-200">{stat.label}</p>
                    <p className="mt-2 text-sm text-slate-400">{stat.sub}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
