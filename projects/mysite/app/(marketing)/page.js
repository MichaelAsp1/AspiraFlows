export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-5xl font-bold mb-4">AspiraFlows</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Stand out and connect directly with decision-makers. AI-driven personalisation
          and workflow automation to reduce time-to-interview.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="/contact"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Get Started
          </a>
          <a
            href="/pricing"
            className="inline-block px-6 py-3 rounded-lg border hover:bg-white transition"
          >
            See Pricing
          </a>
        </div>
      </section>

      {/* OVERVIEW / FEATURES */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">What AspiraFlows Automates</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "AI Job Matching", d: "Scan job boards & LinkedIn, filter by skills/location, score relevance (0–100), send daily/weekly digests." },
            { t: "Decision-Maker Discovery", d: "Identify recruiters, hiring managers, team leads via enrichment (Apollo, Clay, Apify), verify email/LinkedIn." },
            { t: "Personalized Outreach", d: "GPT-based intros, icebreakers & follow-ups across email/LinkedIn; each message tailored to contact & company." },
            { t: "Automated Campaigns", d: "n8n-powered workflows track sends, opens, replies; update dashboards (Metabase / internal portal)." },
            { t: "Analytics & Insights", d: "See outreach volume, response rates, and conversion (reply → interview → offer); refine targeting & tone." },
            { t: "Privacy & Flexibility", d: "GDPR-compliant pipelines, anonymization where needed, custom workflows for job seekers or agencies." },
          ].map(({ t, d }) => (
            <div key={t} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-gray-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold text-center mb-10">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "€49/mo",
                desc: "20 job matches/week, 80 automated messages/month, progress dashboard",
              },
              {
                name: "Professional",
                price: "€99/mo",
                desc: "50 matches/week, 200 messages/month, analytics + reply tracking",
              },
              {
                name: "Executive",
                price: "€199/mo",
                desc: "Unlimited matching and messages, custom templates, decision-maker targeting, weekly reports",
              },
            ].map((p) => (
              <div key={p.name} className="rounded-xl border bg-gray-50 p-6 shadow-sm text-center">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-3xl font-bold my-2">{p.price}</p>
                <p className="text-gray-600 mb-6">{p.desc}</p>
                <a href="/contact" className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                  Choose Plan
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            <strong>Bespoke (Agency/University):</strong> Bulk accounts, branded dashboards, analytics API access.{" "}
            <a href="/contact" className="underline">Contact us</a> for a quote.
          </p>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Ready to reach decision-makers faster?</h2>
        <a href="/contact" className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Contact Us
        </a>
      </section>
    </main>
  );
}
