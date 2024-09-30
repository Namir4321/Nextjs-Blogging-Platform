import NextAuth from "next-auth";
import { authConfig } from "./authConfig";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/utils/db";
import { findUserByEmail, generateUsername } from "./lib/Authaction";
import { hashPassword } from "@/lib/Authaction";
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
          const hashedPassword = await hashPassword("123456789", 10);
          await db.profile.create({
            data: {
              email: user.email,
              firstName: profile.given_name,
              lastName: profile.family_name,
              username: await generateUsername(user.email),
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
          const existingUser = await findUserByEmail(user.email);
          if (existingUser) {
            token.sub = existingUser.id;
          }
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
