// app/api/onboarding/cv/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  // TODO: upload file somewhere (S3, etc.) – we’ll just stub metadata for now
  let cvUrl: string | null = null;
  let cvFilename: string | null = null;

  if (file) {
    cvFilename = file.name;
    // in future: upload and set cvUrl
  }

  // Upsert profile + mark onboardingCompleted
  await prisma.$transaction([
    prisma.userProfile.upsert({
      where: { userId },
      create: {
        userId,
        cvUrl,
        cvFilename,
        cvUploadedAt: cvFilename ? new Date() : null,
      },
      update: {
        cvUrl,
        cvFilename,
        cvUploadedAt: cvFilename ? new Date() : null,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
