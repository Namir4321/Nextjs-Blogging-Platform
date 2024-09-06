import CredentailsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { findUserByEmail } from "./lib/Authaction";
export const authConfig = {
  providers: [
    CredentailsProvider({
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const userSearch = await findUserByEmail(credentials.email);
           const isMatch=credentials.password===userSearch.password;
          if(isMatch) return userSearch
          
          return null;
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
