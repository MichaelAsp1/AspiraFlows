// app/api/superset-token/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const DASHBOARD_ID = process.env.NEXT_PUBLIC_SUPERSET_DASHBOARD_ID!;
const SUPERSET_DOMAIN = process.env.SUPERSET_DOMAIN!;
const SUPERSET_ADMIN_USERNAME = process.env.SUPERSET_ADMIN_USERNAME!;
const SUPERSET_ADMIN_PASSWORD = process.env.SUPERSET_ADMIN_PASSWORD!;

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = (session.user as any).clientId as string | undefined;

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing clientId on user session" },
      { status: 400 }
    );
  }

  try {
    const payload = {
      user: {
        username: session.user.email ?? clientId,
        first_name: (session.user.name ?? "").split(" ")[0] ?? "",
        last_name: (session.user.name ?? "").split(" ").slice(1).join(" ") ?? "",
      },
      resources: [
        {
          type: "dashboard",
          id: DASHBOARD_ID,
        },
      ],
      rls: [
        {
          clause: `client_id = '${clientId}'`,
        },
      ],
    };

    const res = await fetch(
      `${SUPERSET_DOMAIN}/api/v1/security/guest_token/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Superset 3.x default: basic auth with admin user
          Authorization:
            "Basic " +
            Buffer.from(
              `${SUPERSET_ADMIN_USERNAME}:${SUPERSET_ADMIN_PASSWORD}`
            ).toString("base64"),
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Superset guest_token error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to get guest token from Superset" },
        { status: 500 }
      );
    }

    const data = await res.json();
    // Superset responds with { token: "..." }
    return NextResponse.json({ token: data.token });
  } catch (err) {
    console.error("Error calling Superset guest_token API:", err);
    return NextResponse.json(
      { error: "Internal error requesting guest token" },
      { status: 500 }
    );
  }
}
