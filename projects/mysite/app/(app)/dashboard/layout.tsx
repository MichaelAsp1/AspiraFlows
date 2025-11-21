// app/dashboard/layout.tsx
import type { ReactNode } from "react";
import { auth } from "../../../lib/auth";
import Sidebar from "./_components/Sidebar";

function getInitials(nameOrEmail?: string | null) {
  if (!nameOrEmail) return "?";
  const parts = nameOrEmail.trim().split(" ");
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return nameOrEmail.slice(0, 2).toUpperCase();
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const user = session?.user as any;

  const displayName = user?.name || user?.email || "Your account";
  const initials = getInitials(user?.name || user?.email);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-slate-200 bg-white flex flex-col">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-violet-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-violet-600">A</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            AspiraFlows
          </span>
        </div>

        {/* Client-side nav with active highlighting */}
        <Sidebar />

        <div className="px-4 py-4 border-t border-slate-200 text-xs text-slate-400">
          © {new Date().getFullYear()} AspiraFlows
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Your applications and outreach performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Signed in as
            </span>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
              <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-[0.75rem] font-semibold text-violet-700">
                {initials}
              </div>
              <div className="leading-tight hidden sm:block">
                <div className="text-xs font-medium text-slate-900">
                  {displayName}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
