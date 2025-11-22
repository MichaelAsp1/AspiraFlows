// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/85 backdrop-blur-md">
      <div className="w-full flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        {/* Brand: logo + AspiraFlows */}
        <Link
          href="/"
          className="flex items-center gap-2 text-base sm:text-lg font-semibold tracking-tight"
        >
          <span className="inline-flex items-center justify-center">
            {/* Light mode / default */}
            <span className="inline dark:hidden">
              <Image
                src="/logo-infinity-dark.svg"
                alt="AspiraFlows logo"
                width={24}
                height={24}
                className="h-6 w-6"
                priority
              />
            </span>
            {/* Dark mode */}
            <span className="hidden dark:inline">
              <Image
                src="/logo-infinity-light.svg"
                alt="AspiraFlows logo"
                width={24}
                height={24}
                className="h-6 w-6"
                priority
              />
            </span>
          </span>

          {/* softer gradient text, no heavy glow */}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-purple-300 bg-clip-text text-transparent">
            AspiraFlows
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-5 text-[15px] sm:text-base font-medium">
          <Link href="/pricing" className="text-gray-300 hover:text-cyan-300 transition-colors">
            Pricing
          </Link>
          <Link
            href="/consulting"
            className="text-gray-300 hover:text-cyan-300 transition-colors"
          >
            Consulting
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-cyan-300 transition-colors">
            Contact
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-cyan-300 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/pricing"
                className="
                  rounded-lg 
                  bg-gradient-to-r from-cyan-500 to-purple-500 
                  px-3 py-2 text-sm sm:text-[15px] font-semibold text-white
                  shadow-[0_8px_24px_rgba(15,23,42,0.65)]
                  hover:shadow-[0_12px_32px_rgba(15,23,42,0.9)]
                  hover:from-cyan-400 hover:to-purple-400
                  transition-all
                "
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-cyan-300 transition-colors"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-md border border-slate-600 text-cyan-300 px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:border-cyan-400/70 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="
            sm:hidden inline-flex items-center gap-2 rounded-md 
            border border-slate-700 px-3 py-2 text-sm font-medium 
            text-gray-200 hover:border-cyan-400 hover:text-cyan-300
            bg-slate-900/60
          "
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
        className={`sm:hidden overflow-hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md transition-[max-height,opacity] duration-200 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-3 space-y-2">
          <Link
            href="/pricing"
            className="block rounded px-2 py-2 text-sm font-medium text-gray-300 hover:bg-slate-800 hover:text-cyan-300"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/consulting"
            className="block rounded px-2 py-2 text-sm font-medium text-gray-300 hover:bg-slate-800 hover:text-cyan-300"
            onClick={() => setOpen(false)}
          >
            Consulting
          </Link>
          <Link
            href="/contact"
            className="block rounded px-2 py-2 text-sm font-medium text-gray-300 hover:bg-slate-800 hover:text-cyan-300"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block mt-2 w-full rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-center text-gray-200 hover:bg-slate-800 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="block mt-2 w-full rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-2 text-sm font-semibold text-center hover:from-cyan-400 hover:to-purple-400 transition-colors"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block mt-2 w-full rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-center text-gray-200 hover:bg-slate-800 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="mt-2 w-full rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-gray-200 hover:bg-slate-800 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
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
