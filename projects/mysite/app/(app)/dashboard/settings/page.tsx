// app/dashboard/settings/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export default async function SettingsPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;
  const clientId = (session?.user as any)?.clientId as string | undefined;

  if (!userId) {
    redirect("/login");
  }

  const [user, client] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId! },
      select: {
        email: true,
        name: true,
        createdAt: true,
      },
    }),
    clientId
      ? prisma.client.findUnique({
          where: { id: clientId },
          select: {
            name: true,
            slug: true,
            plan: true,
            billingSource: true,
            subscriptionStatus: true,
            createdAt: true,
          },
        })
      : Promise.resolve(null),
  ]);

  if (!user) {
    redirect("/login");
  }

  const planLabel = client?.plan ?? "STARTER";
  const billingSource = client?.billingSource ?? "STRIPE";
  const subscriptionStatus = client?.subscriptionStatus ?? "NONE";

  const subscriptionLabelMap: Record<string, string> = {
    ACTIVE: "Active",
    INCOMPLETE: "Incomplete",
    PAST_DUE: "Past due",
    CANCELED: "Canceled",
    NONE: "No subscription",
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account and workspace.
        </p>
      </div>

      {/* Account settings */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Account
        </h3>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Name</dt>
            <dd className="text-slate-900">{user.name || "Not set"}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="text-slate-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Member since</dt>
            <dd className="text-slate-900">
              {user.createdAt.toLocaleDateString()}
            </dd>
          </div>
        </dl>

        {/* Future: change password / delete account */}
        <p className="mt-2 text-xs text-slate-400">
          Password changes and account deletion will be configurable here later.
        </p>
      </section>

      {/* Workspace / subscription */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">
            Workspace &amp; billing
          </h3>
          {/* Hook this up to Stripe billing portal later */}
          <a
            href="/billing"
            className="text-xs font-medium text-violet-600 hover:underline"
          >
            Manage subscription
          </a>
        </div>

        {client ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Workspace name</dt>
              <dd className="text-slate-900">{client.name}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Workspace slug</dt>
              <dd className="text-slate-900">
                {client.slug || <span className="text-slate-400">Not set</span>}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Plan</dt>
              <dd className="text-slate-900">
                {planLabel.charAt(0) +
                  planLabel.slice(1).toLowerCase().replace("_", " ")}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Subscription status</dt>
              <dd className="text-slate-900">
                {subscriptionLabelMap[subscriptionStatus]}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Billing source</dt>
              <dd className="text-slate-900">{billingSource}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Workspace created</dt>
              <dd className="text-slate-900">
                {client.createdAt.toLocaleDateString()}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-slate-500">
            This account is not attached to a workspace yet.
          </p>
        )}
      </section>
    </div>
  );
}
