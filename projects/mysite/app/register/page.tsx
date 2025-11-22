// app/register/page.tsx
import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="relative min-h-screen flex items-center justify-center px-4">
          {/* override layout background */}
          <div className="absolute inset-0 -z-20 bg-[#020617]" />
          <div className="absolute inset-0 -z-10 starfield" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-5 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_60%)]" />

          <div className="w-full max-w-md rounded-3xl border border-slate-700/70 bg-slate-950/85 px-6 py-7 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.9)] text-gray-100">
            <h1 className="text-2xl font-semibold mb-2 text-white">
              Create your account
            </h1>
            <p className="text-sm text-gray-300">Loading signup…</p>
          </div>
        </div>
      }
    >
      <RegisterClient />
    </Suspense>
  );
}
