// app/dashboard/page.tsx
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Analytics
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Track your applications, outreach and responses in one place.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <DashboardClient />
      </div>
    </div>
  );
}
