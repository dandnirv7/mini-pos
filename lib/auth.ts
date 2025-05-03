import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import { v4 as uuidv4 } from "uuid";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        login: {
          label: "Email or Username",
          type: "text",
          placeholder: "Email or Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: credentials.login }, { username: credentials.login }],
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        const sessionToken = uuidv4();
        const expires = new Date(Date.now() + 60 * 60 * 1000);

        await prisma.session.create({
          data: {
            sessionToken,
            userId: user.id,
            expires,
          },
        });

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          sessionToken,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          sessionToken: token.sessionToken,
        },
      };
    },
  },
};
