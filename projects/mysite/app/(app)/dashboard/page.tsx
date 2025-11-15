// app/(app)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const supersetDomain = process.env.NEXT_PUBLIC_SUPERSET_DOMAIN!;
const dashboardId = process.env.NEXT_PUBLIC_SUPERSET_DASHBOARD_ID!;

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError(null);
        setLoading(true);

        await embedDashboard({
          id: dashboardId,
          supersetDomain,
          mountPoint: document.getElementById("superset-container")!,
          fetchGuestToken: async () => {
            const res = await fetch("/api/superset-token");
            if (!res.ok) {
              const body = await res.json().catch(() => ({}));
              throw new Error(body.error || "Failed to get Superset token");
            }
            const { token } = await res.json();
            return token;
          },
          dashboardUiConfig: {
            hideTitle: false,
            filters: { expanded: true },
          },
          iframeSandboxExtras: [
            "allow-same-origin",
            "allow-scripts",
            "allow-forms",
          ],
        });

        if (!cancelled) setLoading(false);
      } catch (err: any) {
        console.error("Error embedding Superset dashboard", err);
        if (!cancelled) {
          setError(err?.message || "Failed to load dashboard");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Analytics dashboard</h1>

      {loading && !error && (
        <div className="rounded-lg border p-4 text-sm text-slate-600">
          Loading dashboard…
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load your dashboard: {error}
        </div>
      )}

      <div id="superset-container" className="mt-4 w-full" />
    </div>
  );
}
