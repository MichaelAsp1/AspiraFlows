import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { WorkMode } from "@prisma/client";

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

  const { regions, countries, city, mode } = body;

  // Validation
  if (!Array.isArray(regions) || !regions.every((r: any) => typeof r === "string")) {
    return NextResponse.json(
      { error: "regions must be an array of strings" },
      { status: 400 }
    );
  }

  if (!Array.isArray(countries) || !countries.every((c: any) => typeof c === "string")) {
    return NextResponse.json(
      { error: "countries must be an array of strings" },
      { status: 400 }
    );
  }

  // Convert mode string → WorkMode enum
  let workMode: WorkMode | null = null;
  if (typeof mode === "string" && mode.trim().length > 0) {
    const m = mode.trim().toLowerCase();
    if (m === "remote") workMode = WorkMode.REMOTE;
    else if (m === "hybrid") workMode = WorkMode.HYBRID;
    else if (m === "on-site" || m === "onsite") workMode = WorkMode.ONSITE;
    else {
      return NextResponse.json(
        { error: "Invalid mode: must be Remote | Hybrid | On-site" },
        { status: 400 }
      );
    }
  }

  const cleanedRegions = regions.map((r: string) => r.trim()).filter(Boolean);
  const cleanedCountries = countries.map((c: string) => c.trim()).filter(Boolean);
  const cleanedCity =
    typeof city === "string" && city.trim().length > 0 ? city.trim() : null;

  await prisma.userProfile.upsert({
    where: { userId: session.user.id },
    update: {
      regions: cleanedRegions,
      countries: cleanedCountries,
      city: cleanedCity,
      workMode,
    },
    create: {
      userId: session.user.id,
      targetRoles: [],
      regions: cleanedRegions,
      countries: cleanedCountries,
      city: cleanedCity,
      workMode,
    },
  });

  return NextResponse.json({ success: true });
}
