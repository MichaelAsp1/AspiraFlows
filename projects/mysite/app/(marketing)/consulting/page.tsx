import type { Metadata } from "next";
import { Hero, HowItWorks, UseCases, Systems, Results, CTA } from "./Sections";
import { SITE } from "./data";

export const metadata: Metadata = {
  title: `Consulting & Automation — ${SITE.brand}`,
  description:
    "We design AI-driven growth systems for real businesses: lead capture, personalized outreach, CRM workflows, and analytics.",
};

export default function ConsultingPage() {
  return (
    <main className="relative overflow-hidden">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(34,197,94,0.1),transparent_40%)]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <HowItWorks />
        <UseCases />
        <Systems />
        <Results />
        <CTA />
      </div>
    </main>
  );
}
