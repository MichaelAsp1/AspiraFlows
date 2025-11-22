import { Suspense } from "react";
import { Metadata } from "next";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata: Metadata = {
  title: "Reset Password | AspiraFlows",
  description:
    "Securely reset your AspiraFlows password and get back to your AI-powered job search and outreach.",
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Starfield / gradient glow layers – softer on mobile */}
      <div className="pointer-events-none absolute inset-0 opacity-40 sm:opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_55%)]" />
      </div>

      {/* Top cyan glow – hide on very small screens if needed */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-64 w-[26rem] -translate-x-1/2 rounded-full bg-cyan-500/25 blur-3xl opacity-60 hidden sm:block" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900/70 px-3 py-1 text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.18em] text-cyan-200/80 shadow-[0_0_30px_rgba(56,189,248,0.25)]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              AspiraFlows Security
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
              Reset your password
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Choose a new password for your AspiraFlows workspace. Reset links
              are time-limited to keep your account safe.
            </p>
          </div>

          {/* Suspense boundary around client component */}
          <Suspense
            fallback={
              <div className="rounded-3xl border border-slate-700/70 bg-slate-950/85 p-4 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                <div className="mb-3 h-4 w-28 animate-pulse rounded-full bg-slate-800/80" />
                <div className="mb-3 h-9 animate-pulse rounded-2xl bg-slate-900/80" />
                <div className="mb-3 h-9 animate-pulse rounded-2xl bg-slate-900/80" />
                <div className="mt-5 h-10 w-full animate-pulse rounded-full bg-slate-800/80" />
              </div>
            }
          >
            <ResetPasswordClient />
          </Suspense>

          {/* Back to login link */}
          <p className="mt-5 text-center text-[0.7rem] sm:text-xs text-slate-500">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-medium text-cyan-300 transition hover:text-cyan-200 hover:underline"
            >
              Back to login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
