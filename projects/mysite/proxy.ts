// proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/app/:path*",
    "/onboarding/:path*",
  ],
};

export default async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const token = await getToken({
    req: request as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Not logged in → login
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const clientId = token.clientId as string | undefined;
  const billingSource = (token as any).billingSource;
  const subscriptionStatus = (token as any).subscriptionStatus;
  const onboardingCompleted = (token as any).onboardingCompleted;

  const isOnboardingPath = pathname.startsWith("/onboarding");

  // Must have workspace (still required even for onboarding)
  if (!clientId && !isOnboardingPath) {
    url.pathname = "/choose-plan";
    return NextResponse.redirect(url);
  }

  // TEMP free access allowlist
  const email = token.email as string | undefined;
  const allowlist = (process.env.TEMP_FREE_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (email && allowlist.includes(email)) {
    // allowlisted users bypass billing, but we can still force onboarding if you want
    if (!onboardingCompleted && !isOnboardingPath) {
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Subscription active or comped?
  const isActive =
    billingSource === "COMPED" || subscriptionStatus === "ACTIVE";

  if (!isActive && !isOnboardingPath) {
    url.pathname = "/pricing"; // or "/billing"
    return NextResponse.redirect(url);
  }

  // 🔑 Onboarding happens AFTER payment
  // Only redirect to /onboarding if we are NOT already on an onboarding route
  if (!onboardingCompleted && !isOnboardingPath) {
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
