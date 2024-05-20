import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { connectMongodb } from "../../../../../lib/mongodb";
import UserModel from "../../../../../lib/models/UserModel";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        await connectMongodb();
        const existUser = await UserModel.findOne({ email: profile.email });
        if (existUser) {
          return existUser;
        }
        const newUser = await UserModel.create({
          name: profile.name,
          email: profile.email,
          image: profile.image,
        });

        return newUser;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      async profile(profile) {
        await connectMongodb();
        const existUser = await UserModel.findOne({ email: profile.email });
        if (existUser) {
          return existUser;
        }
        const newUser = await UserModel.create({
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        });

        return newUser;
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        //  console.log("authorize credentials:", credentials);
        try {
          await connectMongodb();
          if (!credentials) return null;
          const { email, password } = credentials;

          const user = await UserModel.findOne({ email: email });

          if (!user) return null;

          const isMatchPassword = await bcrypt.compare(password, user.password);
          if (!isMatchPassword) return null;

          return user;
        } catch (error) {
          console.error("Authorization Error:", error); // Log error for debugging
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    error: "/error",
    newUser: "/sign-up",
  },
  callbacks: {
    async jwt({ user, trigger, session, token }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user?.image,
        };
      }
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      //console.log("session:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
