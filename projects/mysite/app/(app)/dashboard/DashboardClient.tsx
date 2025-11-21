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
            hideTitle: true,
            hideTab: true,
            hideChartControls: true,
            filters: {
              visible: false,
              expanded: false,
            },
          },
          standalone: true as any,
          iframeSandboxExtras: [
            "allow-same-origin",
            "allow-scripts",
            "allow-forms",
          ],
        } as any);

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

      {error && (
        <div className="mb-3 rounded-md border border-red-300 bg-red-50 p-3 text-xs text-red-700">
          Couldn&apos;t load your dashboard:
          <span className="ml-1 font-medium">{error}</span>
        </div>
      )}

      {loading && !error && (
        <div className="mb-3 text-xs text-slate-500 px-3 pt-3">
          Loading dashboard…
        </div>
      )}

      <div
        id="superset-container"
        className="w-full h-[600px] md:h-[720px]"
      />
    </>
  );
}
