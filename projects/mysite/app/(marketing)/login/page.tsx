// app/(marketing)/login/page.tsx
"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="relative min-h-screen flex items-center justify-center px-4">
          {/* dark base + subtle glow to match marketing pages */}
          <div className="absolute inset-0 -z-20 bg-[#020617]" />
          <div className="absolute inset-0 -z-10 starfield" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-5 h-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_60%)]" />

          <div className="w-full max-w-md rounded-3xl border border-slate-700/70 bg-slate-950/85 px-6 py-7 sm:px-8 sm:py-8 text-gray-100 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            <h1 className="mb-2 text-xl font-semibold text-white">
              Loading login…
            </h1>
            <p className="text-sm text-gray-300">
              Please wait while we prepare the sign-in page.
            </p>
          </div>
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res || res.error) {
      setError("Invalid email or password");
      return;
    }

    try {
      const profileRes = await fetch("/api/auth/me");

      if (!profileRes.ok) {
        setError("Signed in, but failed to load your workspace.");
        return;
      }

      const profile = await profileRes.json();

      if (!profile.clientId) {
        router.push("/choose-plan");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-56px-56px)] flex items-center justify-center px-4">
      {/* Solid dark base + stars + glow (overrides any layout grid) */}
      <div className="absolute inset-0 -z-20 bg-[#020617]" />
      <div className="absolute inset-0 -z-10 starfield" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-5 h-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_60%)]" />

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-slate-700/70 bg-slate-950/85 px-6 py-7 sm:px-8 sm:py-8 text-gray-100 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
        <h1 className="mb-2 text-2xl font-semibold text-white">
          Sign in to AspiraFlows
        </h1>
        <p className="mb-6 text-sm text-gray-300">
          Welcome back. Enter your details to access your dashboard.
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-400/70 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
            />

            <p className="mt-2 text-right text-xs">
              <a
                href="/forgot-password"
                className="text-cyan-300 hover:text-cyan-200 hover:underline"
              >
                Forgot password?
              </a>
            </p>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(8,47,73,0.9)] transition-all hover:from-cyan-400 hover:to-purple-400 hover:shadow-[0_20px_55px_rgba(8,47,73,1)] disabled:opacity-60"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Don&apos;t have an account yet?{" "}
          <a
            href="/pricing"
            className="font-medium text-cyan-300 hover:text-cyan-200 hover:underline"
          >
            View plans
          </a>
        </p>
      </div>
    </div>
  );
}
