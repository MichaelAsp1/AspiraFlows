// app/choose-plan/ChoosePlanClient.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

type PlanId = "starter" | "professional" | "executive";

const PLANS: { id: PlanId; label: string; price: string; description: string }[] = [
  {
    id: "starter",
    label: "Starter",
    price: "€49/mo",
    description: "Best for early-stage job search automation.",
  },
  {
    id: "professional",
    label: "Professional",
    price: "€99/mo",
    description: "For serious, multi-contact outreach and scaling.",
  },
  {
    id: "executive",
    label: "Executive",
    price: "€199/mo",
    description: "For high-volume, multi-channel campaigns with support.",
  },
];

export default function ChoosePlanClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFromUrl = searchParams.get("plan") as PlanId | null;
  const initialPlan: PlanId = initialFromUrl || "starter";

  const [selectedPlan, setSelectedPlan] = useState<PlanId>(initialPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleContinue() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || "Unable to start checkout.");
        setLoading(false);
        return;
      }

      router.push(data.url); // Stripe Checkout URL
    } catch (err) {
      console.error(err);
      setError("Something went wrong starting checkout.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">Confirm your plan</h1>
      <p className="text-gray-600 mb-6">
        You can upgrade or downgrade later from billing.
      </p>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="space-y-3">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelectedPlan(plan.id)}
            className={`w-full text-left rounded-xl border px-4 py-3 transition ${
              selectedPlan === plan.id
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{plan.label}</div>
                <div className="text-sm text-gray-600">{plan.description}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {plan.price}
                </div>
                {selectedPlan === plan.id && (
                  <span className="mt-1 inline-block rounded-full bg-black px-2 py-0.5 text-xs font-medium text-white">
                    Selected
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={loading}
        className="mt-6 w-full rounded-md bg-black py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Redirecting to Stripe…" : "Continue to payment"}
      </button>
    </main>
  );
}
