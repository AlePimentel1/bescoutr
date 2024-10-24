import { env } from "@/env";
import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";
import { compare } from "bcrypt";
import {
  getServerSession,
  type NextAuthOptions
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

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
    async jwt({ token, user }) {
      // Si hay un user, significa que estamos iniciando sesión, así que añadimos sus datos al token
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          isComplete: user.isComplete,
        };
      }
      // Si no hay un user, solo devolvemos el token tal cual
      return token;
    },
    async session({ session, token, user }) {
      // Añadimos los campos personalizados del token a la sesión
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          profilePicture: token.image,
          isComplete: token.isComplete,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      const urlObj = new URL(url);
      const lang = urlObj.searchParams.get('lang') || 'en';
      return `${baseUrl}/${lang}`;
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
        if (!credentials?.email || !credentials?.password) return null;
        try {
          await dbConnect();

          const existingUser = await User.findOne({ email: credentials?.email });
          if (!existingUser) throw new Error('User does not exist');

          const isValidPassword = await compare(credentials?.password, existingUser.password);
          if (!isValidPassword) throw new Error('Credentials are invalid');

          if (!existingUser.active) {
            throw new Error('User is not active');
          }

          const user = {
            id: existingUser._id.toString(),
            username: existingUser.username,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            image: existingUser.profilePicture || '',
            isComplete: existingUser.isComplete,
          };
          return user;

        } catch (error) {
          return null;
        }
      }
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers here.
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
