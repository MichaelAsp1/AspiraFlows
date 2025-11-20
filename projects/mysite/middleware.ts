// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "./lib/prisma";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Not logged in → redirect to login
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Extract clientId properly with a TS-safe cast
  const clientId = token.clientId as string | undefined;

  if (!clientId) {
    url.pathname = "/choose-plan";
    return NextResponse.redirect(url);
  }

  // Fetch billing state from DB
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    select: { billingSource: true, subscriptionStatus: true },
  });

  if (!client) {
    url.pathname = "/choose-plan";
    return NextResponse.redirect(url);
  }

  // Determine if user is allowed access
  const isActive =
    client.billingSource === "COMPED" ||
    client.subscriptionStatus === "ACTIVE";

  if (!isActive) {
    url.pathname = "/billing";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*"],
};
