"use client";

import { useEffect, useState } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const supersetDomain = process.env.NEXT_PUBLIC_SUPERSET_DOMAIN!;
const dashboardId = process.env.NEXT_PUBLIC_SUPERSET_DASHBOARD_ID!;

export default function DashboardClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        setError(null);
        setLoading(true);

        const mountPoint = document.getElementById("superset-container");
        if (!mountPoint) {
          throw new Error("Superset container element not found");
        }

        await embedDashboard({
          id: dashboardId,
          supersetDomain,
          mountPoint,
          fetchGuestToken: async () => {
            const res = await fetch("/api/superset-token");
            if (!res.ok) {
              let message = "Failed to get Superset token";
              try {
                const body = await res.json();
                if (body?.error) message = body.error;
              } catch {
                // ignore JSON parse errors
              }
              throw new Error(message);
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

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        #superset-container iframe {
          width: 100% !important;
          height: 100% !important;
          border: none;
        }
      `}</style>

      <div className="flex min-h-screen flex-col px-4 py-6">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Analytics dashboard</h1>
          {loading && !error && (
            <span className="text-sm text-slate-500">Loading…</span>
          )}
        </header>

        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            Couldn&apos;t load your dashboard:
            <span className="ml-1 font-medium">{error}</span>
          </div>
        )}

        <main className="flex-1">
          {loading && !error && (
            <div className="mb-4 rounded-lg border p-4 text-sm text-slate-600">
              Loading dashboard…
            </div>
          )}
          <div
            id="superset-container"
            className="h-[85vh] w-full overflow-hidden rounded-lg border"
          />
        </main>
      </div>
    </>
  );
}
