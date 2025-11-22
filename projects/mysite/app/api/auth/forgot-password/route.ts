// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";

const RESET_TOKEN_EXPIRY_HOURS = 2;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const email = body?.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generic response to avoid email enumeration
    const genericResponse = NextResponse.json(
      {
        ok: true,
        message:
          "If an account exists for that email, we’ve sent a reset link.",
      },
      { status: 200 }
    );

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    if (!user) {
      return genericResponse;
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(
      Date.now() + RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
    );

    // Clear any existing tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // Create new token
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    // TODO: replace with real email sending
    console.log(
      `[Password reset] Send email to ${user.email} with link: ${resetUrl}`
    );

    return genericResponse;
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
