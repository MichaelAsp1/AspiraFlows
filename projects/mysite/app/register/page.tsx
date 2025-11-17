// app/register/page.tsx
import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-md px-4 py-16">
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-gray-600">Loading signup…</p>
        </main>
      }
    >
      <RegisterClient />
    </Suspense>
  );
}
