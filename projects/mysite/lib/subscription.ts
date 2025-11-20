// lib/subscription.ts
import { prisma } from "./prisma";
import type { BillingSource, SubscriptionStatus } from "@prisma/client";

type ClientBillingInfo = {
  billingSource: BillingSource;
  subscriptionStatus: SubscriptionStatus;
};

export async function clientHasActiveSubscription(clientId: string) {
  if (!clientId) return false;

  const client = (await prisma.client.findUnique({
    where: { id: clientId },
    select: {
      billingSource: true,
      subscriptionStatus: true,
    },
  })) as ClientBillingInfo | null; // 👈 explicit type, bypasses the stale ClientSelect

  if (!client) return false;

  return (
    client.billingSource === "COMPED" ||
    client.subscriptionStatus === "ACTIVE"
  );
}
