import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as any;
      }
      if (token.restaurantId && session.user) {
        session.user.restaurantId = token.restaurantId as string;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (!token.sub) return token;
      
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      if (!existingUser) return token;
      
      token.role = existingUser.role;
      token.restaurantId = existingUser.restaurantId;
      
      return token;
    }
  },
  ...authConfig,
})
