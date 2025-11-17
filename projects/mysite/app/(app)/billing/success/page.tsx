// app/(app)/billing/success/page.tsx
import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <main className="mx-auto max-w-lg py-16 px-4 text-center">
      <h1 className="text-2xl font-semibold mb-4">Payment successful 🎉</h1>
      <p className="text-gray-600 mb-6">
        Your subscription is active and your workspace is being set up.
      </p>

      <div className="space-y-3">
        <Link
          href="/login"
          className="inline-flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Go to login
        </Link>

        <Link
          href="/"
          className="inline-flex w-full justify-center rounded-md border px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
