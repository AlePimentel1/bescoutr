import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { env } from "@/env";
import User from "@/models/User";
import { compare } from "bcrypt";
import dbConnect from "@/lib/mongoDb";


/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/signout',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        return {
          ...token,
          user: user
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      }
    },

    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null
        try {

          await dbConnect()

          const existingUser = await User.findOne({ email: credentials?.email });
          if (!existingUser) throw new Error('User not found');


          const isValidPassword = await compare(credentials?.password, existingUser.password);
          if (!isValidPassword) throw new Error('Invalid password');

          if (!existingUser.active) {
            throw new Error('User is not active');
          }

          return {
            id: existingUser._id + '',
            username: existingUser.username,
            email: existingUser.email,
          }
        } catch (error) {
          console.log(error)
          return null;
        }
      }
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
