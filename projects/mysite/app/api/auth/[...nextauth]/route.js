import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// For passwordless later: import Email from "next-auth/providers/email";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // or Email({ server: process.env.EMAIL_SERVER, from: process.env.EMAIL_FROM })
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach your client_id to the session for embedding
      session.user.clientId = token.clientId ?? 123; // TODO: look up from DB by email
      return session;
    },
    async jwt({ token, profile, account }) {
      // Map email -> clientId (replace with a DB lookup)
      if (token.email) {
        // TODO: real lookup. For demo:
        token.clientId = 123;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
