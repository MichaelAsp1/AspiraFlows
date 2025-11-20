// app/api/admin/comp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "../../../../lib/auth";
import { Plan } from "@prisma/client";

export const runtime = "nodejs";

const VALID_PLANS = ["STARTER", "PROFESSIONAL", "INTENSIVE"] as const;

export async function POST(req: NextRequest) {
  const session = await auth();
  const requesterEmail = session?.user?.email;

  if (!process.env.SUPERADMIN_EMAIL) {
    console.error("❌ Missing SUPERADMIN_EMAIL env var");
    return NextResponse.json({ error: "SERVER_MISCONFIGURED" }, { status: 500 });
  }

  // Only you can comp accounts
  if (!requesterEmail || requesterEmail !== process.env.SUPERADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null) as {
    email?: string;
    plan?: string;
  } | null;

  if (!body?.email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const planRaw = (body.plan || "professional").toUpperCase();
  const plan = planRaw as Plan;

  if (!VALID_PLANS.includes(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
    select: { id: true, clientId: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!user.clientId) {
    return NextResponse.json(
      { error: "User has no workspace yet" },
      { status: 400 }
    );
  }

  await prisma.client.update({
    where: { id: user.clientId },
    data: {
      billingSource: "COMPED",
      subscriptionStatus: "ACTIVE",
      plan,
    },
  });

  return NextResponse.json({ ok: true });
}
