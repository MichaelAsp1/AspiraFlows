// app/onboarding/layout.tsx
import type { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-violet-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Brand header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-violet-100 flex items-center justify-center border border-violet-200 shadow-sm">
            <span className="text-lg font-semibold text-violet-600">A</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-slate-900">
              AspiraFlows
            </div>
            <div className="text-xs text-slate-500">
              Let&apos;s personalise your job search.
            </div>
          </div>
        </div>

        {/* Card wrapper */}
        <div className="bg-white/90 border border-slate-200 rounded-2xl shadow-xl shadow-violet-100/80 p-5 sm:p-7">
          {children}
        </div>

        <p className="mt-4 text-xs text-slate-500 text-center">
          You can update these preferences later from your dashboard.
        </p>
      </div>
    </div>
  );
}
