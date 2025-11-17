// app/choose-plan/page.tsx
import { Suspense } from "react";
import ChoosePlanClient from "./ChoosePlanClient";

export default function ChoosePlanPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-md px-4 py-16">
          <h1 className="text-2xl font-bold mb-2">Confirm your plan</h1>
          <p className="text-gray-600">Loading plan details…</p>
        </main>
      }
    >
      <ChoosePlanClient />
    </Suspense>
  );
}
