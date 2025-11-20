import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      clientId?: string;   // 👈 add this
    } & DefaultSession["user"];
  }

  interface User {
    clientId?: string;     // 👈 add this if needed
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    clientId?: string;     // 👈 JWT token carries it
  }
}
