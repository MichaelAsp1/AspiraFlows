// app/register/RegisterClient.tsx
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function RegisterClient() {
  const params = useSearchParams();
  const router = useRouter();

  const selectedPlan = params.get("plan") || "starter";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, plan: selectedPlan }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      if (data.redirect) {
        router.push(data.redirect);
        return;
      }

      router.push(`/choose-plan?plan=${encodeURIComponent(selectedPlan)}`);
    } catch (err) {
      console.error("REGISTER FETCH ERROR:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-56px-56px)]">
      {/* Solid dark base + stars (override any layout background) */}
      <div className="absolute inset-0 -z-20 bg-[#020617]" />
      <div className="absolute inset-0 -z-10 starfield" />

      {/* Soft glow behind header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-5 h-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_60%)]" />

      <main className="relative mx-auto max-w-md px-4 py-16 text-gray-100">
        <div className="rounded-3xl border border-slate-700/70 bg-slate-950/85 px-6 py-7 sm:px-8 sm:py-8 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-white mb-1">
            Create your account
          </h1>
          <p className="text-sm text-gray-300 mb-4">
            You selected the{" "}
            <span className="inline-flex items-center rounded-full border border-cyan-400/60 bg-cyan-500/10 px-3 py-0.5 text-xs font-semibold capitalize text-cyan-200">
              {selectedPlan}
            </span>{" "}
            plan.
          </p>

          {/* Error */}
          {error && (
            <p className="mb-4 rounded-lg border border-red-400/70 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200">
              {error}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
                Name
              </label>
              <input
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
                Email
              </label>
              <input
                required
                type="email"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  required
                  type={showPass ? "text" : "password"}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 pr-16 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-1 text-xs text-gray-400">
                Use at least 8 characters, including a number &amp; a symbol.
              </p>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
                Confirm password
              </label>
              <input
                required
                type="password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(8,47,73,0.9)] transition-all hover:from-cyan-400 hover:to-purple-400 hover:shadow-[0_20px_55px_rgba(8,47,73,1)] disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-cyan-300 hover:text-cyan-200 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
