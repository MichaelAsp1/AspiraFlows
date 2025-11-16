// app/api/superset-token/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const DASHBOARD_ID = process.env.NEXT_PUBLIC_SUPERSET_DASHBOARD_ID!;
const SUPERSET_DOMAIN = process.env.SUPERSET_DOMAIN!;
const SUPERSET_ADMIN_USERNAME = process.env.SUPERSET_ADMIN_USERNAME!;
const SUPERSET_ADMIN_PASSWORD = process.env.SUPERSET_ADMIN_PASSWORD!;

// merge cookies safely
function mergeCookies(...cookieHeaders: Array<string | null>): string {
  return cookieHeaders
    .filter(Boolean)
    .flatMap((header) => header!.split(/,(?=[^;]+=[^;]+)/))
    .map((c) => c.split(";")[0].trim())
    .filter(Boolean)
    .join("; ");
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clientId = (session.user as any).clientId;
    if (!clientId) {
      return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
    }

    // -----------------------------------------
    // 1) LOGIN (Superset 3.1 uses "provider": "db")
    // -----------------------------------------
    const loginRes = await fetch(`${SUPERSET_DOMAIN}/api/v1/security/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: SUPERSET_ADMIN_USERNAME,
        password: SUPERSET_ADMIN_PASSWORD,
        provider: "db",
      }),
    });

    if (!loginRes.ok) {
      const text = await loginRes.text();
      console.error("Superset login error:", loginRes.status, text);
      return NextResponse.json(
        { error: `Failed to log in: ${text}` },
        { status: 500 }
      );
    }

    const loginData = await loginRes.json();
    const accessToken = loginData?.access_token;

    if (!accessToken) {
      console.error("Missing access token", loginData);
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 500 }
      );
    }

    const loginCookie = loginRes.headers.get("set-cookie");

    // -----------------------------------------
    // 2) GET CSRF TOKEN
    // -----------------------------------------
    const csrfRes = await fetch(
      `${SUPERSET_DOMAIN}/api/v1/security/csrf_token/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...(loginCookie ? { Cookie: mergeCookies(loginCookie) } : {}),
        },
      }
    );

    if (!csrfRes.ok) {
      const text = await csrfRes.text();
      console.error("CSRF error:", text);
      return NextResponse.json(
        { error: `Failed to get CSRF token: ${text}` },
        { status: 500 }
      );
    }

    const csrfData = await csrfRes.json();
    const csrfToken = csrfData?.result;

    const csrfCookie = csrfRes.headers.get("set-cookie");

    const finalCookie = mergeCookies(loginCookie, csrfCookie);

    // -----------------------------------------
    // 3) REQUEST GUEST TOKEN WITH RLS
    // -----------------------------------------
    const payload = {
      user: {
        username: session.user.email ?? (session.user as any).id,
        first_name: session.user.name ?? "User",
        last_name: "",
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

    const guestRes = await fetch(
      `${SUPERSET_DOMAIN}/api/v1/security/guest_token/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-CSRFToken": csrfToken,
          Cookie: finalCookie,
          Referer: SUPERSET_DOMAIN, 
        },
        body: JSON.stringify(payload),
      }
    );

    if (!guestRes.ok) {
      const text = await guestRes.text();
      console.error("guest_token error:", text);
      return NextResponse.json(
        { error: `guest_token error: ${text}` },
        { status: 500 }
      );
    }

    const data = await guestRes.json();
    return NextResponse.json({ token: data.token });
  } catch (err) {
    console.error("Superset error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
