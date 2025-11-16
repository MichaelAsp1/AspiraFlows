import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import HomePage from "./(marketing)/HomePage";

export default async function RootPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <HomePage />;
}
