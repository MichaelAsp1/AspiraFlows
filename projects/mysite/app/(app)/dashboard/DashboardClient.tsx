// app/dashboard/DashboardClient.tsx
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
          // ✅ back to clean base URL – NO query string here
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
          // 👇 UI tweaks – hide Superset chrome
          dashboardUiConfig: {
            hideTitle: true,
            hideTab: true,
            hideChartControls: true,
            filters: {
              visible: false,
              expanded: false,
            },
          },
          // 👇 ask Superset to render in embedded/standalone mode
          // (TS types may not know this yet, but it's supported at runtime)
          standalone: true as any,
          iframeSandboxExtras: [
            "allow-same-origin",
            "allow-scripts",
            "allow-forms",
          ],
        } as any); // cast whole config to any to avoid TS whining about extra props

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
      {/* Make iframe fill the container */}
      <style jsx global>{`
        #superset-container iframe {
          width: 100% !important;
          height: 100% !important;
          border: none;
        }

        @media (max-width: 768px) {
          #superset-container iframe {
            border-radius: 0 !important;
          }
        }
      `}</style>

      <div className="flex h-[calc(100vh-2.5rem)] flex-col px-2 py-2 md:h-[calc(100vh-3.5rem)] md:px-6 md:py-4">
        {error && (
          <div className="mb-2 rounded-md border border-red-300 bg-red-50 p-2 text-xs text-red-700 md:mb-4 md:p-3 md:text-sm">
            Couldn&apos;t load your dashboard:
            <span className="ml-1 font-medium">{error}</span>
          </div>
        )}

        {loading && !error && (
          <div className="mb-2 text-xs text-slate-500 md:mb-3 md:text-sm">
            Loading dashboard…
          </div>
        )}

        <div
          id="superset-container"
          className="flex-1 overflow-hidden rounded-none border-0 bg-white md:rounded-lg md:border"
        />
      </div>
    </>
  );
}
