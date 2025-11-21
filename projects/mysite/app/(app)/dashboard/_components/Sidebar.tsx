"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    pathname === path
      ? "flex items-center gap-2 rounded-md px-3 py-2 bg-violet-50 text-violet-700 font-medium"
      : "flex items-center gap-2 rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return (
    <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
      <Link href="/dashboard" className={linkClasses("/dashboard")}>
        <span className="text-base">📊</span>
        <span>Analytics</span>
      </Link>

      <Link href="/dashboard/profile" className={linkClasses("/dashboard/profile")}>
        <span className="text-base">👤</span>
        <span>My info</span>
      </Link>

      <Link href="/dashboard/settings" className={linkClasses("/dashboard/settings")}>
        <span className="text-base">⚙️</span>
        <span>Settings</span>
      </Link>
    </nav>
  );
}
