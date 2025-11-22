"use client";

import { useState, FormEvent } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("sent");
      setMessage(
        "If an account exists for that email, we’ve sent a reset link."
      );
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow text-gray-900">
        <h1 className="mb-2 text-2xl font-bold">Forgot password</h1>
        <p className="mb-4 text-sm text-gray-600">
          Enter the email you used to sign up and we&apos;ll send you a reset
          link if an account exists.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {message && (
            <p
              className={`text-xs ${
                status === "error" ? "text-red-600" : "text-gray-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-1 w-full rounded-md bg-black py-2 text-sm font-semibold text-white hover:bg-black/90 disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  );
}
