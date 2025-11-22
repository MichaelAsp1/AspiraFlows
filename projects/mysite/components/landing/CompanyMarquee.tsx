"use client";

import { motion } from "framer-motion";

type Company = {
  name: string;
  logoSrc: string;
};

const companies: Company[] = [
  {
    name: "Nike",
    logoSrc: "/logos/002_nike-logos-swoosh-white.png",
  },
  {
    name: "Airbnb",
    logoSrc: "/logos/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "Hilton",
    logoSrc: "/logos/Hilton_For-The-Stay_Logo_RGB_Vertical_White.png",
  },
  {
    name: "Microsoft",
    logoSrc: "/logos/Microsoft-logo_rgb_c-wht.png",
  },
  {
    name: "Netflix",
    logoSrc: "/logos/Netflix_Logo_CMYK.png",
  },
  {
    name: "Wise",
    logoSrc: "/logos/New_Wise_(formerly_TransferWise)_logo.svg",
  },
  {
    name: "Revolut",
    logoSrc: "/logos/Revolut-White-Transparent.png",
  },
  {
    name: "Stripe",
    logoSrc: "/logos/Stripe wordmark - Blurple.svg",
  },
  {
    name: "Deloittee",
    logoSrc: "/logos/Deloitte_idUZmqOXQ3_1.png",
  },
  {
    name: "Booking.com",
    logoSrc: "/logos/Booking.com_Logo_1.png",
  },

    
];

function CompanyLogo({ company }: { company: Company }) {
  return (
    <div
      className="
        group flex items-center justify-center
        rounded-2xl border border-slate-800/70 bg-slate-950/70
        px-4 sm:px-6 py-3 sm:py-4
        shadow-[0_18px_40px_rgba(15,23,42,0.9)]
        backdrop-blur-xl transition
        hover:border-cyan-400/70 hover:shadow-[0_0_40px_rgba(56,189,248,0.6)]
      "
    >
      <img
        src={company.logoSrc}
        alt={company.name}
        className="h-6 sm:h-7 w-auto opacity-80 group-hover:opacity-100"
      />
    </div>
  );
}

export default function CompanyMarquee() {
  // duplicate list so the marquee loops smoothly
  const loopCompanies = [...companies, ...companies];

  return (
    <section className="relative py-10 sm:py-14">
      {/* subtle cyan glow background across full width */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.16),_transparent_60%)]" />

      {/* Heading container (centered, constrained) */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h3 className="text-center text-sm sm:text-base text-slate-300">
          <span className="text-slate-100 font-medium">
            AspiraFlows helps users reach decision-makers
          </span>{" "}
          at companies like
        </h3>
      </div>

      {/* Full-width marquee strip */}
      <div className="mt-6 sm:mt-8 relative overflow-hidden">
        <motion.div
          className="flex w-max gap-3 sm:gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 26,
            ease: "linear",
          }}
        >
          {loopCompanies.map((company, idx) => (
            <CompanyLogo key={`${company.name}-${idx}`} company={company} />
          ))}
        </motion.div>

        {/* gradient fade edges touching screen edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="mt-3 mx-auto max-w-4xl px-4 sm:px-6">
        
      </div>
    </section>
  );
}
