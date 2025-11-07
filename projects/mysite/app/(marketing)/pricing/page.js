export const metadata = {
  title: "Pricing | AspiraFlows",
  description: "Simple, transparent plans for AspiraFlows.",
};

const plans = [
  {
    name: "Starter",
    price: "€0",
    cadence: "/mo",
    cta: { label: "Get started", href: "/login" },
    features: [
      "Basic outreach (100 emails/mo)",
      "Manual imports (CSV)",
      "Simple templates",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "€49",
    cadence: "/mo",
    highlighted: true,
    cta: { label: "Start free trial", href: "/login" },
    features: [
      "Up to 5,000 emails/mo",
      "Sequences & throttling",
      "Gmail SMTP integration",
      "AI icebreakers",
      "Basic analytics",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    price: "€149",
    cadence: "/mo",
    cta: { label: "Contact sales", href: "/contact" },
    features: [
      "High-volume sending",
      "Team workspaces",
      "Custom domains",
      "Webhooks & API",
      "Metabase dashboards",
      "SLA & onboarding",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-gray-600">
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
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold">{p.price}</span>
              <span className="text-gray-500">{p.cadence}</span>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-900" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={p.cta.href}
              className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium ${
                p.highlighted
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border hover:bg-gray-50"
              }`}
            >
              {p.cta.label}
            </a>
          </div>
        ))}
      </section>

      <p className="mt-10 text-center text-xs text-gray-500">
        Prices exclude VAT. You can cancel anytime.
      </p>
    </main>
  );
}
