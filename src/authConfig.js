import CredentailsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { findUserByEmail } from "./lib/Authaction";
export const authConfig = {
  providers: [
    CredentailsProvider({
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          const userSearch = await findUserByEmail(credentials.email);
          if(!userSearch) return null
          const isMatch = credentials.password === userSearch.password;
          if (!isMatch) return null;

          return userSearch;
        } catch (error) {
          return {
            message: error || "Something Went wrong",
            variant: "destructive",
          };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
