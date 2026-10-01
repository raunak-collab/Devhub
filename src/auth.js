import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import connectDb from "./lib/connectDb";
import { User } from "./models/userModels";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        await connectDb();

        const provider = account.provider;
        const providerAccountId = account.providerAccountId;

        let dbUser = await User.findOne({
          provider,
          providerAccountId,
        });

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name || "User",
            email: user.email?.toLowerCase() || undefined,
            provider,
            providerAccountId,
          });
        }

        token.id = dbUser._id.toString();
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },
});