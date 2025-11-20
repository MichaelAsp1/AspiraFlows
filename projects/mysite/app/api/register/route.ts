// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

const ALLOWED_PLANS = ["starter", "professional", "intensive"] as const;
type PlanId = (typeof ALLOWED_PLANS)[number];

function normalizePlan(raw: string | undefined): PlanId | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  return (ALLOWED_PLANS as readonly string[]).includes(lower)
    ? (lower as PlanId)
    : null;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, plan } = await req.json();

    const normalizedPlan = normalizePlan(plan);

    if (!email || !password || !normalizedPlan) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        {
          error:
            "An account with this email already exists. Try logging in instead.",
        },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    // 1️⃣ Create the Client with only fields Prisma definitely knows
    const client = await prisma.client.create({
      data: {
        name: name || email,
        // DB defaults will handle billingSource + subscriptionStatus
        // plan will be set later via Stripe webhook
      },
    });

    // 2️⃣ Create the User linked to that Client
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        clientId: client.id,
      },
    });

    // 3️⃣ Response + cookies
    const res = NextResponse.json(
      { redirect: `/choose-plan?plan=${encodeURIComponent(normalizedPlan)}` },
      { status: 201 }
    );

    res.cookies.set("temp_user_id", user.id, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    res.cookies.set("selected_plan", normalizedPlan, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
