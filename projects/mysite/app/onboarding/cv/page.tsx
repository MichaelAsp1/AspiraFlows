// app/onboarding/cv/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CvStep() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleNext() {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      if (file) form.append("file", file);

      // 1) Save CV + mark onboardingCompleted in DB
      const res = await fetch("/api/onboarding/cv", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to save CV");
      }

      // 2) Refresh NextAuth session so proxy sees onboardingCompleted = true
      await fetch("/api/auth/session?update");

      // 3) Go to dashboard
      router.push("/dashboard");
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="w-full h-2 rounded-full bg-violet-100">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{ width: "100%" }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">Step 3 of 3</p>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 text-slate-900">
        Upload your CV (optional)
      </h1>
      <p className="text-sm text-slate-500 mb-5">
        We&apos;ll use this later to generate more tailored applications and
        outreach. You can skip this and add a CV from your profile anytime.
      </p>

      {/* Error message */}
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <label className="flex flex-col items-center justify-center w-full border border-dashed border-slate-200 rounded-xl py-6 px-4 text-center text-slate-500 text-sm cursor-pointer hover:border-violet-300 hover:bg-violet-50/60 transition-colors mb-4 bg-white">
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <span className="mb-1 font-medium text-slate-800">
          {file ? file.name : "Click to upload your CV"}
        </span>
        <span className="text-xs text-slate-400">PDF only is best.</span>
      </label>

      {loading && (
        <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm">
          <svg
            className="animate-spin h-4 w-4 text-violet-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
            />
          </svg>
          Uploading your CV…
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleNext}
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center rounded-lg bg-violet-500 text-white text-sm font-semibold py-2.5 shadow-md shadow-violet-200 hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Processing…" : "Finish & go to dashboard"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={handleNext}
          className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-50 hover:border-violet-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
