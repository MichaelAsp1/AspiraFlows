// app/(marketing)/page.tsx
import { auth } from "../../lib/auth";          // or "../../lib/auth" if no alias
import { redirect } from "next/navigation";
import HomePage from "./HomePage";

export default async function MarketingRootPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <HomePage />;
}
