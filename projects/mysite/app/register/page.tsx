"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function RegisterPage() {
  const params = useSearchParams();
  const router = useRouter();

  // from /pricing → /register?plan=starter|professional|executive
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

      // fallback if no redirect is provided
      router.push(`/choose-plan?plan=${encodeURIComponent(selectedPlan)}`);
    } catch (err) {
      console.error("REGISTER FETCH ERROR:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md py-16 px-4">
      <h1 className="text-2xl font-bold mb-2">Create your account</h1>

      <p className="text-gray-600 mb-6">
        You selected the{" "}
        <strong className="capitalize">{selectedPlan}</strong> plan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            required
            className="w-full rounded-md border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            required
            type="email"
            className="w-full rounded-md border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>

          <div className="relative">
            <input
              required
              type={showPass ? "text" : "password"}
              className="w-full rounded-md border px-3 py-2 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Strong password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-2 top-2 text-sm text-gray-600"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Use at least 8 characters, including a number &amp; a symbol.
          </p>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Confirm password
          </label>
          <input
            required
            type="password"
            className="w-full rounded-md border px-3 py-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black text-white py-2 font-semibold disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Continue"}
        </button>
      </form>
    </main>
  );
}
