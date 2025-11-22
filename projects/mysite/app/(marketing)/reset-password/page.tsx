"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialToken = searchParams.get("token") || "";

  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
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
      setMessage(err.message || "Something went wrong");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow text-gray-900">
        <h1 className="mb-2 text-2xl font-bold">Reset password</h1>
        <p className="mb-4 text-sm text-gray-600">
          Choose a new password for your AspiraFlows account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!initialToken && (
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-900">
                Reset token
              </label>
              <input
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste the token from your email"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">
              New password
            </label>
            <input
              type="password"
              required
              minLength={8}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="••••••••"
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
            {status === "loading" ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
