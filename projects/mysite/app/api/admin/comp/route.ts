// app/api/admin/comp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "../../../../lib/auth";

export const runtime = "nodejs";

// Simple comp endpoint: mark a client's subscription as ACTIVE/COMPED
export async function POST(req: NextRequest) {
  // Optional: lock this down to your own email or an ADMIN role
  const session = await auth();
  const requesterEmail = session?.user?.email;

  // ⚠️ For now: only allow your own account to comp users.
  // Replace with a proper role check when you add roles.
  if (!requesterEmail || requesterEmail !== process.env.SUPERADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null) as
    | { email?: string; plan?: string }
    | null;

  if (!body?.email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const plan = (body.plan || "professional").toUpperCase();

  const user = await prisma.user.findUnique({
    where: { email: body.email },
    select: { id: true, clientId: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!user.clientId) {
    return NextResponse.json(
      { error: "User has no client/workspace yet" },
      { status: 400 }
    );
  }

  await prisma.client.update({
    where: { id: user.clientId },
    data: {
      billingSource: "COMPED",
      subscriptionStatus: "ACTIVE",
      plan: plan as any, // "STARTER" | "PROFESSIONAL" | "INTENSIVE"
    },
  });

  return NextResponse.json({ ok: true });
}
