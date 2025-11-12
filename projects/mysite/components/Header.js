// components/Header.js
"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white md:bg-white/80 md:backdrop-blur">
      <div className="mx-auto max-w-6xl h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="text-base sm:text-lg font-semibold text-gray-900">
          AspiraFlows
        </Link>

        {/* desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm font-semibold">
          <Link href="/pricing" className="text-gray-900 hover:text-indigo-600">Pricing</Link>
          <Link href="/consulting" className="text-gray-900 hover:text-indigo-600">Consulting</Link>
          <Link href="/contact" className="text-gray-900 hover:text-indigo-600">Contact</Link>

          {!session ? (
            <button
              type="button"
              onClick={() => signIn("google")}
              className="rounded-md bg-black text-white px-3 py-2 hover:bg-gray-800"
            >
              Sign in
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-md border px-3 py-2 hover:bg-gray-50"
            >
              Logout
            </button>
          )}
        </nav>

        {/* mobile trigger (you said you’ll add menu later; keeping button off for now)
        <button className="sm:hidden rounded-md border px-3 py-2 text-sm font-medium text-gray-900">
          Menu
        </button> */}
      </div>
    </header>
  );
}
