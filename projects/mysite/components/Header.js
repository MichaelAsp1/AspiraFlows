"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white">
      <Link href="/" className="text-xl font-semibold">AspiraFlows</Link>

      <nav className="flex gap-4 items-center">
        <Link href="/pricing" className="hover:underline">Pricing</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>

        {!session ? (
          <button
            type="button"
            onClick={() => signIn("google")}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Sign in
          </button>
        ) : (
          <button
            type="button"
            onClick={() => signOut()}
            className="border px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
