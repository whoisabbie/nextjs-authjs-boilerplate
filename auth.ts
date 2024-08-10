import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import db from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    jwt({ token, user }) {
      // the user object in jwt is present only when the user is logging in initially
      // so after first API call, the user object will not be available in jwt
      // NOTE: https://github.com/nextauthjs/next-auth/discussions/9438#discussioncomment-8963254
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
