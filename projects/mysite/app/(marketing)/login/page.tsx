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
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow text-gray-900">
            <h1 className="mb-2 text-xl font-semibold">Loading login…</h1>
            <p className="text-sm text-gray-600">
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow text-gray-900">
        <h1 className="mb-6 text-2xl font-bold">Sign in to AspiraFlows</h1>

        {error && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-black py-2 text-sm font-semibold text-white hover:bg-black/90 active:bg-black disabled:opacity-60"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
