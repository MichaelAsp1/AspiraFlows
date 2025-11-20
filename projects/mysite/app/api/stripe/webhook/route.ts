// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs"; // IMPORTANT for raw body

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error("Missing STRIPE_SECRET_KEY in environment");
    throw new Error("Stripe is not configured on the server");
  }
  return new Stripe(key);
}

const PLAN_MAP: Record<string, "STARTER" | "PROFESSIONAL" | "INTENSIVE"> = {
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
    console.error("Missing STRIPE_WEBHOOK_SECRET in environment");
    return new NextResponse("Webhook not configured", { status: 500 });
  }

  const body = await req.text(); // raw body for Stripe

  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("❌ Invalid signature:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const tempUserId = session.metadata?.tempUserId;
      const rawPlan = (session.metadata?.plan || "starter").toLowerCase();

      // Stripe gives customer/subscription as string or object; normalise to string
      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;

      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : (session.subscription as any)?.id;

      if (!tempUserId) {
        console.warn("Missing tempUserId in session metadata");
        return NextResponse.json({ received: true });
      }

      const user = await prisma.user.findUnique({
        where: { id: tempUserId },
      });

      if (!user) {
        console.warn("User not found for tempUserId:", tempUserId);
        return NextResponse.json({ received: true });
      }

      if (!user.clientId) {
        // Fallback: extremely old signups before we created Client on /api/register
        console.warn("User has no clientId; creating fallback Client");

        const workspaceName =
          user.name || user.email.split("@")[0] || "Workspace";

        const client = await prisma.client.create({
          data: {
            name: workspaceName,
            slug: generateSlug(workspaceName, user.id),
            // minimal billing fields
            billingSource: "STRIPE",
            subscriptionStatus: "ACTIVE",
            plan: PLAN_MAP[rawPlan] ?? "STARTER",
            stripeCustomerId: customerId ?? undefined,
            stripeSubscriptionId: subscriptionId ?? undefined,
          },
        } as any);

        await prisma.user.update({
          where: { id: user.id },
          data: { clientId: client.id },
        });

        console.log(
          "✅ Fallback workspace created & activated for",
          user.email,
          "on plan",
          rawPlan
        );

        return NextResponse.json({ received: true });
      }

      // 🔥 Normal path: update existing Client created at /api/register
      await prisma.client.update({
        where: { id: user.clientId },
        data: {
          stripeCustomerId: customerId ?? undefined,
          stripeSubscriptionId: subscriptionId ?? undefined,
          subscriptionStatus: "ACTIVE",
          billingSource: "STRIPE",
          plan: PLAN_MAP[rawPlan] ?? "STARTER",
        },
      } as any);

      console.log(
        "🎉 Subscription activated for",
        user.email,
        "on plan",
        rawPlan
      );
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
