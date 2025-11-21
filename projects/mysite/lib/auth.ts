// lib/auth.ts
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        // 👇 include onboardingCompleted for JWT/session
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          clientId: user.clientId,
          onboardingCompleted: user.onboardingCompleted,
        } as any;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
  async jwt({ token, user }) {
    // figure out userId from either the freshly-logged-in user or existing token
    const userId =
      (user as any)?.id ??
      (token as any)?.id;

    if (!userId) return token;

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        clientId: true,
        onboardingCompleted: true,
        client: {
          select: {
            billingSource: true,
            subscriptionStatus: true,
          },
        },
      },
    });

    if (!dbUser) return token;

    // base identity
    token.id = dbUser.id;
    (token as any).clientId = dbUser.clientId;
    (token as any).onboardingCompleted = dbUser.onboardingCompleted;

    // subscription info (same logic you had before, just centralized)
    if (dbUser.client) {
      (token as any).billingSource = dbUser.client.billingSource;
      (token as any).subscriptionStatus = dbUser.client.subscriptionStatus;
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user && token) {
      (session.user as any).id = token.id;
      (session.user as any).clientId = (token as any).clientId;
      (session.user as any).billingSource = (token as any).billingSource;
      (session.user as any).subscriptionStatus = (token as any).subscriptionStatus;
      (session.user as any).onboardingCompleted = (token as any).onboardingCompleted;
    }
    return session;
  },
},

  pages: {
    signIn: "/login",
  },
};

// Required helper for all server components / API routes
export function auth() {
  return getServerSession(authOptions);
}
