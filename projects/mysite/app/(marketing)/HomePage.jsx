import HeroSection from "../../components/landing/HeroSection";
import WhatAspiraFlowsSection from "../../components/landing/WhatAspiraFlowsSection";
import ExampleFlowSection from "../../components/landing/ExampleFlowSection";
import DashboardSection from "../../components/landing/DashboardSection";
import PricingSection from "../../components/landing/PricingSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import ContactCTASection from "../../components/landing/ContactCTASection";
import KeyResultsStrip from "../../components/landing/KeyResultsStrip";
import Marquee from "../../components/Marquee";
import CompanyMarquee from "../../components/landing/CompanyMarquee";

export default function Home() {
  return (
    <main className="relative bg-slate-950 text-white">
      <HeroSection />

      {/* NEW: resumax-style key stats strip */}
      <KeyResultsStrip />

      <WhatAspiraFlowsSection />
      <Marquee />
      <DashboardSection />
      <ExampleFlowSection />
      <CompanyMarquee />
      <PricingSection />
      <TestimonialsSection />
      <ContactCTASection />
    </main>
  );
}
