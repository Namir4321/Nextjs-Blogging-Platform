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
      try {
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
      } catch (error) {
        return { message: error.message };
      }
    },
    async session({ token, session }) {
      try {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
        return session;
      } catch (err) {
        return { message: err.message };
      }
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.sub = user.id;
        }
        return token;
      } catch (err) {
        return { message: err.message };
      }
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
