export const metadata = {
  title: "Pricing | AspiraFlows",
  description: "Simple, transparent plans for AspiraFlows.",
};

const plans = [
  {
    name: "Starter",
    price: "€49",
    cadence: "/mo",
    cta: { label: "Get started", href: "/login" },
    features: [
      "Up to 80 personalized outreach messages/mo",
      "AI job matching & scoring",
      "Verified contacts (1 per company)",
      "Email outreach automation",
      "Progress dashboard",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "€99",
    cadence: "/mo",
    highlighted: true,
    badge: "Most Popular",
    cta: { label: "Get Started", href: "/login" },
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
    name: "Executive",
    price: "€199",
    cadence: "/mo",
    cta: { label: "Contact sales", href: "/contact" },
    features: [
      "Up to 500 outreach messages/mo",
      "Email + LinkedIn multi-channel campaigns",
      "Custom templates & targeting filters",
      "Weekly performance reports",
      "Dedicated onboarding & optimization",
      "Advanced analytics dashboard (Metabase)",
    ],
  },
];


export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 text-gray-900">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Pricing
        </h1>
        <p className="text-gray-700">
          Start free. Upgrade when you’re ready to scale.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border p-6 bg-white shadow-sm ${
              p.highlighted ? "ring-2 ring-black" : ""
            }`}
          >
            {/* plan name */}
            <h3 className="text-lg font-semibold text-gray-900">
              {p.name}
            </h3>

            {/* price */}
            <div className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold text-gray-900">
                {p.price}
              </span>
              <span className="text-gray-600">{p.cadence}</span>
            </div>

            {/* features */}
            <ul className="mt-6 space-y-2 text-sm text-gray-800">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-900" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={p.cta.href}
              className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold ${
                p.highlighted
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border text-gray-900 hover:bg-gray-50"
              }`}
            >
              {p.cta.label}
            </a>
          </div>
        ))}
      </section>

      <p className="mt-10 text-center text-xs text-gray-600">
        Prices exclude VAT. You can cancel anytime.
      </p>
    </main>
  );
}
