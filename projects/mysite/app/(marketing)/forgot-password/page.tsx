import { Suspense } from "react";
import { Metadata } from "next";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Forgot Password | AspiraFlows",
  description:
    "Request a secure password reset link for your AspiraFlows workspace.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* background / glows ... */}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-md">
          {/* heading ... */}

          <Suspense
            fallback={
              <div className="rounded-3xl border border-slate-700/70 bg-slate-950/85 p-5 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                <div className="mb-4 h-4 w-28 animate-pulse rounded-full bg-slate-800/80" />
                <div className="mb-3 h-10 animate-pulse rounded-2xl bg-slate-900/80" />
                <div className="mt-4 h-10 w-full animate-pulse rounded-full bg-slate-800/80" />
              </div>
            }
          >
            <ForgotPasswordClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
