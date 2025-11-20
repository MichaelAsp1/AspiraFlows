// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "../../../../lib/prisma";
import { BillingSource, SubscriptionStatus, Plan } from "@prisma/client";

export const runtime = "nodejs";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error("Missing STRIPE_SECRET_KEY");
    throw new Error("Stripe misconfigured");
  }
  return new Stripe(key, { apiVersion: null });
}

// Map from metadata → DB ENUM
const PLAN_MAP: Record<string, Plan> = {
  starter: "STARTER",
  professional: "PROFESSIONAL",
  intensive: "INTENSIVE",
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig) {
    return new NextResponse("Missing stripe-signature", { status: 400 });
  }

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return new NextResponse("Webhook not configured", { status: 500 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("❌ Invalid signature:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const tempUserId = session.metadata?.tempUserId;
      const planRaw = (session.metadata?.plan || "starter").toLowerCase();

      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;

      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : (session.subscription as any)?.id;

      if (!tempUserId) {
        console.warn("Missing tempUserId");
        return NextResponse.json({ received: true });
      }

      const user = await prisma.user.findUnique({
        where: { id: tempUserId },
      });

      if (!user) {
        console.warn("Temp user not found:", tempUserId);
        return NextResponse.json({ received: true });
      }

      const planEnum = PLAN_MAP[planRaw] || "STARTER";

      //
      // --- CASE 1: user had no client (old flow fallback) ---
      //
      if (!user.clientId) {
        const workspaceName =
          user.name || user.email.split("@")[0] || "Workspace";

        const client = await prisma.client.create({
          data: {
            name: workspaceName,
            slug: generateSlug(workspaceName, user.id),
            billingSource: "STRIPE" satisfies BillingSource,
            subscriptionStatus: "ACTIVE" satisfies SubscriptionStatus,
            plan: planEnum,
            stripeCustomerId: customerId ?? null,
            stripeSubscriptionId: subscriptionId ?? null,
          },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { clientId: client.id },
        });

        console.log(
          "✅ Created fallback client & activated subscription for",
          user.email
        );

        return NextResponse.json({ received: true });
      }

      //
      // --- CASE 2: Normal flow: update existing Client ---
      //
      await prisma.client.update({
        where: { id: user.clientId },
        data: {
          billingSource: "STRIPE",
          subscriptionStatus: "ACTIVE",
          plan: planEnum,
          stripeCustomerId: customerId ?? null,
          stripeSubscriptionId: subscriptionId ?? null,
        },
      });

      console.log("🎉 Subscription ACTIVE for:", user.email);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new NextResponse("Webhook handler error", { status: 500 });
  }
}

function generateSlug(name: string, id: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 40) +
    "-" +
    id.slice(0, 6)
  );
}
