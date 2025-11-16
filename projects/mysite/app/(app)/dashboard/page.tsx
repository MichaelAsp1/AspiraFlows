import { auth } from "../../..//lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardWrapper() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <DashboardClient />;
}
