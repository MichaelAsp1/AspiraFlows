import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { roles } = body;

  if (!Array.isArray(roles) || !roles.every((r: any) => typeof r === "string")) {
    return NextResponse.json(
      { error: "roles must be an array of strings" },
      { status: 400 }
    );
  }

  const cleanedRoles = roles
    .map((r: string) => r.trim())
    .filter((r: string) => r.length > 0);

  // At least one role is required – you can relax this if you want
  if (cleanedRoles.length === 0) {
    return NextResponse.json(
      { error: "Please select at least one role" },
      { status: 400 }
    );
  }

  await prisma.userProfile.upsert({
    where: { userId: session.user.id as string },
    update: {
      targetRoles: cleanedRoles,
    },
    create: {
      userId: session.user.id as string,
      targetRoles: cleanedRoles,
      regions: [],
      countries: [],
    },
  });

  return NextResponse.json({ success: true });
}
