import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, companyName, email, password } = await req.json();

    if (!companyName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Transaction: create Client + User
    const result = await prisma.$transaction(async (tx) => {
      const client = await tx.client.create({
        data: {
          name: companyName,
        },
      });

      const user = await tx.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          clientId: client.id,
        },
      });

      return { client, user };
    });

    return NextResponse.json(
      {
        message: "ok",
        clientId: result.client.id,
        userId: result.user.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
