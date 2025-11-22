"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
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

      setStatus("success");
      setMessage(
        "If an account exists for this email, we’ve sent a reset link to your inbox."
      );
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.message || "Something went wrong while requesting a reset link."
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-slate-700/70 bg-slate-950/90 p-5 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.18em] text-slate-400"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/40"
            placeholder="you@example.com"
          />
          <p className="text-[0.7rem] sm:text-xs text-slate-500">
            We&apos;ll send a secure link if we find a workspace for this email.
          </p>
        </div>

        {message && (
          <div
            className={`rounded-2xl px-3 py-2 text-[0.7rem] sm:text-xs ${
              status === "error"
                ? "border border-red-500/40 bg-red-500/10 text-red-200"
                : "border border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
            }`}
          >
            {message}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={status !== "loading" ? { y: -2 } : undefined}
          whileTap={status !== "loading" ? { y: 0 } : undefined}
          className="mt-1 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-[0_0_32px_rgba(56,189,248,0.7)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending reset link…" : "Send reset link"}
        </motion.button>
      </form>
    </motion.div>
  );
}
