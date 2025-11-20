// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Not logged in → send to login
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const clientId = token.clientId as string | undefined;
  const billingSource = (token as any).billingSource;
  const subscriptionStatus = (token as any).subscriptionStatus;

  // No workspace yet → choose plan
  if (!clientId) {
    url.pathname = "/choose-plan";
    return NextResponse.redirect(url);
  }

  // TEMPORARY FREE ACCESS FOR NON-PAYING USERS
  const email = token.email as string | undefined;
  const allowlist = (process.env.TEMP_FREE_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (email && allowlist.includes(email)) {
    return NextResponse.next();
  }

  // Subscription active or comped → allow
  const isActive =
    billingSource === "COMPED" || subscriptionStatus === "ACTIVE";

  if (!isActive) {
    url.pathname = "/pricing"; // or "/billing"
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*"],
};
