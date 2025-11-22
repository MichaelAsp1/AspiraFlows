"use client";

const items = [
  "Personalised Outreach",
  "Smart Enrichment",
  "Real Connections",
  "Reply Tracking",
  "Sequenced Follow-ups",
  "Job & Lead Scoring",
  "Decision-Maker Discovery",
  "CRM Sync",
  "Analytics & Reports",
];

function Row({ items }) {
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4">
      {items.map((label, i) => (
        <div
          key={`${label}-${i}`}
          className="whitespace-nowrap rounded-full border border-slate-200 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur"
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  // Duplicate once for seamless loop (track width ≈ 200%)
  const track = [...items, ...items];

  return (
    <section className="relative">
      {/* light backdrop tint (optional) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent" />
      <div className="marquee marquee-mask mx-auto max-w-7xl overflow-hidden py-8">
        <div className="animate-marquee flex w-[200%]">
          <Row items={track} />
        </div>
      </div>
    </section>
  );
}
