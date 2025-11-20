// app/api/debug-client/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const meta = prisma.client.fields; // this prints known fields
  return NextResponse.json(meta);
}
