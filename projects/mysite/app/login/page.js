"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <button
        onClick={() => signIn("google")}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Sign in with Google
      </button>
    </main>
  );
}
