import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  //Next auth will call this function whenever a user tries to access a page that has been protected in middleware.js
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    // this call back is for checking the user who is already signined to see if it exists in supabase database, if not it will create a new user in supabase database.
    async signIn({ user, account, profile }) {
      try {
        const excistingGuest = await getGuest(user.email);
        if (!excistingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
