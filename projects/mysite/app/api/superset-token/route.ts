// app/api/superset-token/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import jwt from "jsonwebtoken";

const DASHBOARD_ID = process.env.NEXT_PUBLIC_SUPERSET_DASHBOARD_ID;
const GUEST_SECRET = process.env.SUPERSET_GUEST_TOKEN_JWT_SECRET;

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

  if (!DASHBOARD_ID || !GUEST_SECRET) {
    return NextResponse.json(
      { error: "Superset embedding not configured" },
      { status: 500 }
    );
  }

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    // 👈 tell Superset this is a guest token
    type: "guest",
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
    // 👈 RLS clause: keep it column-only, Superset will attach this to the dataset
    rls: [
      {
        clause: `client_id = '${clientId}'`,
      },
    ],
    iat: now,
    exp: now + 15 * 60, // 15 minutes
  };

  const token = jwt.sign(payload, GUEST_SECRET, { algorithm: "HS256" });

  return NextResponse.json({ token });
}
