// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "../../../../lib/prisma"; // adjust path

export const runtime = "nodejs"; // IMPORTANT for Stripe webhooks (raw body)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  // Use req.headers, NOT headers()
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!sig) {
    return new NextResponse("Missing stripe-signature", { status: 400 });
  }

  const body = await req.text(); // raw body required

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
      const plan = session.metadata?.plan || "starter";

      if (!tempUserId) {
        console.warn("Missing tempUserId");
        return NextResponse.json({ received: true });
      }

      const user = await prisma.user.findUnique({
        where: { id: tempUserId },
      });

      if (!user) {
        console.warn("User not found:", tempUserId);
        return NextResponse.json({ received: true });
      }

      if (user.clientId) {
        return NextResponse.json({ received: true });
      }

      // Create Client
      const workspaceName = user.name || user.email.split("@")[0] || "Workspace";

      const client = await prisma.client.create({
        data: {
          name: workspaceName,
          slug: generateSlug(workspaceName, user.id),
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { clientId: client.id },
      });

      console.log("✅ Workspace created for", user.email);
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
