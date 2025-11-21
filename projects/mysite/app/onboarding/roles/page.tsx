//onboarding/roles/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PRESET_ROLES = [
  "Software Engineering",
  "Marketing",
  "Operations",
  "Data & Analytics",
  "Social Work",
  "Healthcare",
  "Finance",
  "Customer Support",
  "Product / UX",
];

export default function RolesStep() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleRole(role: string) {
    setSelected((prev) =>
      prev.includes(role) ? prev.filter((x) => x !== role) : [...prev, role]
    );
  }

  function handleAddCustomRole() {
    if (!customRole.trim()) return;

    const role = customRole.trim();
    if (!selected.includes(role)) {
      setSelected((prev) => [...prev, role]);
    }

    setCustomRole("");
    setShowOtherInput(false);
  }

  async function handleNext() {
    if (selected.length === 0 || loading) return;
    setLoading(true);

    await fetch("/api/onboarding/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roles: selected }),
    });

    router.push("/onboarding/location");
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="w-full h-2 rounded-full bg-violet-100">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{ width: "33%" }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">Step 1 of 3</p>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 text-slate-900">
        What roles are you targeting?
      </h1>
      <p className="text-sm text-slate-500 mb-5">
        Pick a few to start. This helps AspiraFlows prioritise the right jobs
        and outreach for you.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESET_ROLES.map((role) => {
          const active = selected.includes(role);
          return (
            <button
              key={role}
              type="button"
              onClick={() => toggleRole(role)}
              className={[
                "px-3 py-1.5 rounded-full border text-xs sm:text-sm transition-all",
                "focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:ring-offset-2 focus:ring-offset-white",
                active
                  ? "bg-violet-500 text-white border-violet-500 shadow-sm shadow-violet-300"
                  : "bg-white text-slate-800 border-slate-200 hover:border-violet-200 hover:bg-violet-50",
              ].join(" ")}
            >
              {role}
            </button>
          );
        })}

        {!showOtherInput && (
          <button
            type="button"
            onClick={() => setShowOtherInput(true)}
            className="px-3 py-1.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-600 bg-white hover:border-violet-200 hover:bg-violet-50"
          >
            Other…
          </button>
        )}
      </div>

      {showOtherInput && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter your own role"
            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400/70"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddCustomRole}
            className="px-3 py-2 bg-violet-500 text-white rounded-lg text-xs font-semibold hover:bg-violet-400"
          >
            Add
          </button>
        </div>
      )}

      {selected.length > 0 && (
        <p className="mb-5 text-xs text-slate-500">
          Selected:{" "}
          <span className="font-medium text-slate-800">
            {selected.join(", ")}
          </span>
        </p>
      )}

      <button
        onClick={handleNext}
        disabled={selected.length === 0 || loading}
        className="w-full inline-flex items-center justify-center rounded-lg bg-violet-500 text-white text-sm font-semibold py-2.5 shadow-md shadow-violet-200 hover:bg-violet-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Saving…" : "Continue"}
      </button>
    </div>
  );
}
