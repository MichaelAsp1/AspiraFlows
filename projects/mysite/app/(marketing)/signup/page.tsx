// app/(marketing)/signup/page.tsx
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";
import SignupForm from "./SignupForm";

export default async function SignupPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-md py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-4">Create your AspiraFlows account</h1>
      <p className="text-sm text-gray-600 mb-6">
        Start your workspace with a personal account. You can invite others later.
      </p>

      <SignupForm />
    </div>
  );
}
