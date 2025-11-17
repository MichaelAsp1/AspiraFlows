// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, plan } = await req.json();

    if (!email || !password || !plan) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    // Prisma types on Vercel still think `client` is required.
    // Runtime is fine because clientId/client are optional in the schema.
    // ts-expect-error temp user is created without client; webhook will attach one later
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });

    const res = NextResponse.json(
      { redirect: `/choose-plan?plan=${encodeURIComponent(plan)}` },
      { status: 201 }
    );

    res.cookies.set("temp_user_id", user.id, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    res.cookies.set("selected_plan", plan, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
