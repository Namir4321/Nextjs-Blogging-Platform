import NextAuth from "next-auth";
import { authConfig } from "./authConfig";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/utils/db";
import { findUserByEmail } from "./lib/Authaction";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const existingUser = await findUserByEmail(user.email);
      if (!existingUser) {
        await db.profile.create({
          data: {
            email: user.email,
            username: user.name,
            profileImage: user.image,
            password: hashedPassword,
          },
        });
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
