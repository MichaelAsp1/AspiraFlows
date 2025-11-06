"use client";

import "./globals.css";
import React from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";


function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white">
      <a href="/" className="text-xl font-semibold">
        AspiraFlows
      </a>
      <nav className="flex gap-4 items-center">
        <a href="/pricing" className="hover:underline">
          Pricing
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>

        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Sign in
          </button>
        ) : (
          <button
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="text-center text-sm text-gray-500 py-6 border-t">
            © {new Date().getFullYear()} AspiraFlows
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
