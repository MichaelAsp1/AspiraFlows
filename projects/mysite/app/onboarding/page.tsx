// app/onboarding/page.tsx
import { redirect } from "next/navigation";

export default function OnboardingIndex() {
  // Always start onboarding at Step 1 (roles)
  redirect("/onboarding/roles");
}
