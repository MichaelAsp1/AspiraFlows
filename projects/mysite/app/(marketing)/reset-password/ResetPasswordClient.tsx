// app/(marketing)/reset-password/ResetPasswordClient.tsx
"use client";

import { FormEvent, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialToken = searchParams.get("token") || "";
  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setStatus("loading");
      setMessage("");

      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        setStatus("done");
        setMessage("Password updated. Redirecting you to login…");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (err: any) {
        setStatus("error");
        setMessage(err?.message || "Something went wrong");
      }
    },
    [token, password, router]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-slate-700/70 bg-slate-950/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Token field only if not present in URL */}
        {!initialToken && (
          <div className="space-y-1.5">
            <label
              className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400"
              htmlFor="token"
            >
              Reset token
            </label>
            <input
              id="token"
              type="text"
              required
              className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/40"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste the token from your email"
            />
            <p className="text-xs text-slate-500">
              If the link didn&apos;t open automatically, paste the token from
              your email here.
            </p>
          </div>
        )}

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400"
          >
            New password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <p className="text-xs text-slate-500">
            Minimum 8 characters. Use a mix of letters, numbers, and symbols for
            better security.
          </p>
        </div>

        {message && (
          <div
            className={`rounded-2xl px-3 py-2 text-xs ${
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
          className="mt-1 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-[0_0_45px_rgba(56,189,248,0.7)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Updating…" : "Update password"}
        </motion.button>
      </form>
    </motion.div>
  );
}
