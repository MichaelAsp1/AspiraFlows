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
    // 1) Log in to Superset to get an access token
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
        refresh: true,
      }),
    });

    if (!loginRes.ok) {
      const text = await loginRes.text();
      console.error("Superset login error:", loginRes.status, text);
      return NextResponse.json(
        { error: `Failed to log in to Superset: ${text}` },
        { status: 500 }
      );
    }

    const loginData = await loginRes.json();
    const accessToken = loginData?.access_token;

    if (!accessToken) {
      console.error("No access_token in Superset login response:", loginData);
      return NextResponse.json(
        { error: "Missing access token from Superset" },
        { status: 500 }
      );
    }

    // 2) Get CSRF token (and session cookie) tied to this access token
    const csrfRes = await fetch(
      `${SUPERSET_DOMAIN}/api/v1/security/csrf_token/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!csrfRes.ok) {
      const text = await csrfRes.text();
      console.error("Superset csrf_token error:", csrfRes.status, text);
      return NextResponse.json(
        { error: `Failed to get CSRF token from Superset: ${text}` },
        { status: 500 }
      );
    }

    const csrfData = await csrfRes.json();
    const csrfToken = csrfData?.result;

    if (!csrfToken) {
      console.error("No CSRF token in csrf_token response:", csrfData);
      return NextResponse.json(
        { error: "Missing CSRF token from Superset" },
        { status: 500 }
      );
    }

    // Grab the Set-Cookie header (session cookie) from the CSRF response
    // In Node (server-side), this header *is* accessible.
    const cookieHeader = csrfRes.headers.get("set-cookie") ?? "";

    // 3) Ask Superset for a guest token, sending Authorization + CSRF + Cookie
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

    const guestRes = await fetch(
      `${SUPERSET_DOMAIN}/api/v1/security/guest_token/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-CSRFToken": csrfToken,
          // Pass through the session cookie tied to the CSRF token
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!guestRes.ok) {
      const text = await guestRes.text();
      console.error("Superset guest_token error:", guestRes.status, text);
      return NextResponse.json(
        {
          error: `Superset guest_token error ${guestRes.status}: ${text}`,
        },
        { status: 500 }
      );
    }

    const data = await guestRes.json();
    return NextResponse.json({ token: data.token });
  } catch (err) {
    console.error("Error calling Superset guest_token API:", err);
    return NextResponse.json(
      { error: "Internal error requesting guest token" },
      { status: 500 }
    );
  }
}
