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

function Row({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {items.map((label, i) => (
        <div
          key={`${label}-${i}`}
          className="
            whitespace-nowrap 
            rounded-full 
            border border-cyan-400/35 
            bg-slate-950/70 
            px-6 py-2.5 
            text-sm font-medium 
            text-cyan-100 
            backdrop-blur-xl
            shadow-[0_0_16px_-8px_rgba(56,189,248,0.8)]
            hover:shadow-[0_0_22px_-6px_rgba(56,189,248,0.95)]
            hover:border-cyan-300/80
            transition-all
          "
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const track = [...items, ...items]; // seamless loop

  return (
    <div className="relative py-10 marquee">
      {/* wide, centered container like the dashboard */}
      <div className="relative mx-auto max-w-7xl lg:max-w-[1600px] px-4 overflow-hidden marquee-mask">
        <div className="animate-marquee flex w-[200%]">
          <Row items={track} />
        </div>
      </div>
    </div>
  );
}
