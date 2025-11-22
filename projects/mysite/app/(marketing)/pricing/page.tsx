import Link from "next/link";

export const metadata = {
  title: "Pricing | AspiraFlows",
  description: "Simple, transparent plans for AspiraFlows.",
};

const plans = [
  {
    name: "Starter",
    price: "€19",
    cadence: "/mo",
    cta: { label: "Get Started", href: "/register?plan=starter" },
    tagline: "For early-stage job searches",
    features: [
      "Up to 80 personalized outreach messages/mo",
      "AI job matching & scoring",
      "Verified contacts (1 per company)",
      "Basic email outreach automation",
      "Progress dashboard",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "€39",
    cadence: "/mo",
    highlighted: true,
    badge: "Most Popular",
    cta: { label: "Get Started", href: "/register?plan=professional" },
    tagline: "For active searches and career moves",
    features: [
      "Up to 200 outreach messages/mo",
      "Multi-contact outreach (3+ per company)",
      "AI-generated emails & follow-ups",
      "Reply tracking & analytics",
      "LinkedIn contact enrichment",
      "Priority support",
    ],
  },
  {
    name: "Intensive",
    price: "€79",
    cadence: "/mo",
    cta: { label: "Get Started", href: "/register?plan=intensive" },
    tagline: "For intensive, time-bound job pushes",
    features: [
      "Up to 500 outreach messages/mo",
      "Email + LinkedIn (coming soon) multi-channel outreach",
      "Custom templates & targeting filters",
      "Weekly performance reports",
      "Advanced analytics dashboard",
      "Faster sending queue",
    ],
  },
];

export default function PricingPage() {
  return (
    // Full-page wrapper that overrides the layout background
    <div className="relative min-h-[calc(100vh-56px-56px)]">
      {/* Solid dark base so the grid from layout can't show through */}
      <div className="absolute inset-0 -z-20 bg-[#020617]" />

      {/* Stars on top of the solid base */}
      <div className="absolute inset-0 -z-10 starfield" />

      {/* Soft cyan glow at the top behind the heading */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-5 h-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),transparent_65%)]" />

      {/* Actual pricing content */}
      <main className="relative mx-auto max-w-6xl px-4 py-20 text-gray-100">
        {/* Header */}
        <section className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-2">
            Simple, transparent pricing
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-white">
            Choose the plan that matches your search pace
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Start with the plan that fits your current job search — you can
            upgrade or cancel anytime.
          </p>
        </section>

        {/* Plans */}
        <section className="grid gap-8 md:grid-cols-3">
          {plans.map((p) => {
            const isHighlight = p.highlighted;

            return (
             <div
                  key={p.name}
                  className={`
                    relative rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col
                    border shadow-[0_24px_80px_rgba(15,23,42,0.85)]
                    transition-all duration-300

                    ${
                      isHighlight
                        ? `
                          bg-gradient-to-b from-cyan-500/15 via-slate-950/90 to-slate-950 
                          border-cyan-400/80 scale-[1.03]
                          hover:shadow-[0_0_55px_rgba(56,189,248,0.75)]
                          hover:border-cyan-300
                          hover:-translate-y-2
                        `
                        : `
                          bg-slate-950/80 border-slate-700/70
                          hover:shadow-[0_0_40px_rgba(56,189,248,0.55)]
                          hover:border-cyan-300/60
                          hover:-translate-y-1
                        `
                    }
                  `}
                >

                {/* badge */}
                {p.badge && (
                  <div className="mb-4 inline-flex items-center rounded-full bg-cyan-500/15 border border-cyan-400/60 px-3 py-1 text-[11px] font-medium text-cyan-200">
                    {p.badge}
                  </div>
                )}

                {/* plan name */}
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                {p.tagline && (
                  <p className="mt-1 text-xs text-gray-400">{p.tagline}</p>
                )}

                {/* price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-semibold text-cyan-300">
                    {p.price}
                  </span>
                  <span className="text-sm text-gray-400">{p.cadence}</span>
                </div>

                {/* features */}
                <ul className="mt-6 space-y-2.5 text-sm text-gray-200 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={p.cta.href}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all
                    ${
                      isHighlight
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 shadow-[0_12px_30px_rgba(8,47,73,0.9)]"
                        : "border border-slate-600 text-gray-100 hover:border-cyan-400 hover:bg-slate-900"
                    }
                  `}
                >
                  {p.cta.label}
                </Link>
              </div>
            );
          })}
        </section>

        <p className="mt-10 text-center text-xs text-gray-400">
          Prices exclude VAT. You can cancel anytime.
        </p>
      </main>
    </div>
  );
}
