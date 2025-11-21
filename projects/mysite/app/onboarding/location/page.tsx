//onboarding/location/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const REGIONS = [
  "Entire world",
  "Europe",
  "North America",
  "South America",
  "Asia",
  "Africa",
  "Middle East",
  "Oceania",
];

export default function LocationStep() {
  const router = useRouter();

  const [regions, setRegions] = useState<string[]>([]);
  const [countries, setCountries] = useState("");
  const [city, setCity] = useState("");
  const [mode, setMode] = useState("Remote");
  const [loading, setLoading] = useState(false);

  function toggleRegion(region: string) {
    setRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  }

  const canContinue = regions.length > 0 || countries.trim().length > 0;

  async function handleNext() {
    if (!canContinue || loading) return;
    setLoading(true);

    const res = await fetch("/api/onboarding/location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        regions,
        countries: countries
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        city: city.trim() || null,
        mode,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    router.push("/onboarding/cv");
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="w-full h-2 rounded-full bg-violet-100">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{ width: "66%" }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">Step 2 of 3</p>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 text-slate-900">
        Where are you job searching?
      </h1>
      <p className="text-sm text-slate-500 mb-5">
        Choose regions, then narrow down with countries or a city. This helps
        us prioritise the right geography for you.
      </p>

      {/* Regions */}
      <div className="mb-5">
        <p className="text-xs font-medium text-slate-700 mb-2">
          Regions (optional, choose one or more)
        </p>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((region) => {
            const active = regions.includes(region);
            return (
              <button
                key={region}
                type="button"
                onClick={() => toggleRegion(region)}
                className={[
                  "px-3 py-1.5 rounded-full border text-xs transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:ring-offset-2 focus:ring-offset-white",
                  active
                    ? "bg-violet-500 text-white border-violet-500 shadow-sm shadow-violet-300"
                    : "bg-white text-slate-800 border-slate-200 hover:border-violet-200 hover:bg-violet-50",
                ].join(" ")}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Countries */}
      <div className="mb-4">
        <p className="text-xs font-medium text-slate-700 mb-1">
          Countries (optional, comma-separated)
        </p>
        <input
          className="w-full border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400/70"
          placeholder="e.g. UK, Sweden, Germany"
          value={countries}
          onChange={(e) => setCountries(e.target.value)}
        />
      </div>

      {/* City */}
      <div className="mb-4">
        <p className="text-xs font-medium text-slate-700 mb-1">City (optional)</p>
        <input
          className="w-full border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400/70"
          placeholder="e.g. London, Stockholm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Work mode */}
      <div className="mb-6">
        <p className="text-xs font-medium text-slate-700 mb-1">Work mode</p>
        <select
          className="w-full border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-400/70"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>
      </div>

      <button
        onClick={handleNext}
        disabled={!canContinue || loading}
        className="w-full inline-flex items-center justify-center rounded-lg bg-violet-500 text-white text-sm font-semibold py-2.5 shadow-md shadow-violet-200 hover:bg-violet-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Saving…" : "Continue"}
      </button>
    </div>
  );
}
