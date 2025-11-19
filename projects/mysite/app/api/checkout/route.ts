// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";

type PlanId = "starter" | "professional" | "intensive";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error("Missing STRIPE_SECRET_KEY in environment");
    throw new Error("Stripe is not configured on the server");
  }
  return new Stripe(key, {
  });
}

// 🔥 We KNOW these env vars exist from /api/debug-env
const PRICE_MAP: Record<PlanId, string> = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL!,
  intensive: process.env.STRIPE_PRICE_INTENSIVE!,
};

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const tempUserId = cookieStore.get("temp_user_id")?.value;

    if (!tempUserId) {
      return NextResponse.json(
        { error: "No temp user. Please sign up again." },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawPlan = (body.plan as string | undefined)?.toLowerCase() || "starter";

    // 🔍 Normalise & validate plan
    const allowedPlans: PlanId[] = ["starter", "professional", "intensive"];

    if (!allowedPlans.includes(rawPlan as PlanId)) {
      return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
    }

    const plan = rawPlan as PlanId;
    const priceId = PRICE_MAP[plan];

    // Extra safety: if somehow env was missing at build
    if (!priceId) {
      console.error("PRICE_MAP at runtime:", PRICE_MAP);
      return NextResponse.json(
        {
          error: `Plan "${plan}" is not configured. Missing STRIPE_PRICE_${plan.toUpperCase()} in env.`,
        },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        tempUserId,
        plan,
      },
      success_url: `${baseUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/billing/cancel`,
    });

    const res = NextResponse.json({ url: session.url }, { status: 200 });

    res.cookies.set("selected_plan", plan, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("CHECKOUT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
