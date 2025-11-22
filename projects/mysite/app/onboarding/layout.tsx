// app/onboarding/layout.tsx
import type { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 dark-grid-bg flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Brand header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50 shadow-sm neon-glow-cyan">
            <span className="text-lg font-semibold text-cyan-400">A</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-white neon-text-cyan">
              AspiraFlows
            </div>
            <div className="text-xs text-gray-400">
              Let&apos;s personalise your job search.
            </div>
          </div>
        </div>

        {/* Card wrapper */}
        <div className="bg-slate-800/90 border border-cyan-500/30 rounded-2xl shadow-xl shadow-cyan-500/20 p-5 sm:p-7 backdrop-blur-sm">
          {children}
        </div>

        <p className="mt-4 text-xs text-gray-400 text-center">
          You can update these preferences later from your dashboard.
        </p>
      </div>
    </div>
  );
}
