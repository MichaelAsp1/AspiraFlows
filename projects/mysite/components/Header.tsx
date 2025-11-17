// components/Header.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white md:bg-white/80 md:backdrop-blur">
      <div className="w-full flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight"
        >
          AspiraFlows
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm font-semibold">
          <Link href="/pricing" className="text-gray-900 hover:text-indigo-600">
            Pricing
          </Link>
          <Link href="/consulting" className="text-gray-900 hover:text-indigo-600">
            Consulting
          </Link>
          <Link href="/contact" className="text-gray-900 hover:text-indigo-600">
            Contact
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                className="text-gray-900 hover:text-indigo-600"
              >
                Log in
              </Link>
              <Link
                href="/pricing"
                className="rounded-md bg-black text-white px-3 py-2 hover:bg-gray-800"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-gray-900 hover:text-indigo-600"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-md border px-3 py-2 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="sm:hidden inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-gray-900"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className={`sm:hidden overflow-hidden border-t bg-white transition-[max-height,opacity] duration-200 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-3 space-y-2">
          <Link
            href="/pricing"
            className="block rounded px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/consulting"
            className="block rounded px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Consulting
          </Link>
          <Link
            href="/contact"
            className="block rounded px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block mt-2 w-full rounded-md border px-3 py-2 text-sm font-semibold text-center text-gray-900 hover:bg-gray-50"
              >
                Log in
              </Link>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="block mt-2 w-full rounded-md bg-black text-white px-3 py-2 text-sm font-semibold text-center hover:bg-gray-800"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block mt-2 w-full rounded-md border px-3 py-2 text-sm font-semibold text-center text-gray-900 hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
