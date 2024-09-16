import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import {
  getServerSession,
  type SessionStrategy,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";

import { prisma } from "./db";
import env from "./env";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  secret: env.NEXTAUTH_SECRET,
};

export const getServerSessionAuth = () => getServerSession(authOptions);
