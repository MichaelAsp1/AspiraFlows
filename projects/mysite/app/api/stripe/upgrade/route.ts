// app/api/stripe/upgrade/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.clientId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { newPlan } = await req.json();
  const priceId = {
    starter: process.env.STRIPE_PRICE_STARTER!,
    professional: process.env.STRIPE_PRICE_PROFESSIONAL!,
    intensive: process.env.STRIPE_PRICE_INTENSIVE!,
  }[newPlan];

  const client = await prisma.client.findUnique({
    where: { id: session.user.clientId },
    select: { stripeSubscriptionId: true },
  });

  if (!client?.stripeSubscriptionId)
    return NextResponse.json({ error: "Not subscribed" }, { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  await stripe.subscriptions.update(client.stripeSubscriptionId, {
    items: [{ price: priceId }],
    proration_behavior: "always_invoice",
  });

  await prisma.client.update({
    where: { id: session.user.clientId },
    data: { plan: newPlan.toUpperCase() },
  });

  return NextResponse.json({ ok: true });
}
