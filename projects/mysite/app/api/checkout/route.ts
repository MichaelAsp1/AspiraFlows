// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL,
  executive: process.env.STRIPE_PRICE_EXECUTIVE,
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
    const plan = (body.plan as string | undefined)?.toLowerCase() || "starter";

    if (!["starter", "professional", "executive"].includes(plan)) {
      return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
    }

    const priceId = PRICE_MAP[plan];

    if (!priceId) {
      return NextResponse.json(
        {
          error: `Plan "${plan}" is not configured. Missing STRIPE_PRICE_${plan.toUpperCase()} in .env.local`,
        },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

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
