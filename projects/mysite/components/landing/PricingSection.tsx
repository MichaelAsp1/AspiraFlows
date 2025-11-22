"use client";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "€19/mo",
      tagline: "For testing the waters",
      badge: "",
      features: [
        "Up to 20 job matches/week",
        "80 personalized outreach emails/month",
        "Basic AI job scoring",
        "Progress dashboard",
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
  ];

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/40 via-purple-900/20 to-slate-900/40" />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10 text-white">Pricing</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className="relative rounded-xl border border-cyan-500/30 bg-slate-800/50 backdrop-blur-sm p-6 text-center shadow-sm hover:shadow-lg hover:border-cyan-400/50 transition-all duration-300"
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
                className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-5 py-2.5 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300"
              >
                Choose Plan
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-300 mt-8 text-sm">
          <strong>Bespoke (Agency/University):</strong> Bulk accounts, branded dashboards,
          analytics API access{" "}
          <a href="/contact" className="underline hover:text-cyan-400 transition">
            Contact us
          </a>{" "}
          for a quote.
        </p>
      </div>
    </section>
  );
}
