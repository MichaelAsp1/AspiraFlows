// app/login/page.tsx
"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

// Optional but recommended for auth pages:
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
            <h1 className="mb-2 text-xl font-semibold text-slate-900">
              Loading login…
            </h1>
            <p className="text-sm text-slate-500">
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
  // We always send users to /dashboard after login
  const callbackUrl = "/dashboard";


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

  router.push("/dashboard");
}


  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">
          Sign in to AspiraFlows
        </h1>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
