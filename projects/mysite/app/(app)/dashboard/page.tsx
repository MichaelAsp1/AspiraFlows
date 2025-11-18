// app/dashboard/page.tsx
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardWrapper() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b bg-white px-3 py-2 text-sm md:px-6 md:py-3">
        <h1 className="text-base font-semibold md:text-lg">
          Analytics dashboard
        </h1>
      </header>

      <main className="flex-1">
        <DashboardClient />
      </main>
    </div>
  );
}
