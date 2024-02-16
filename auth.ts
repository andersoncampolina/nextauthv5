import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/services/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
    callbacks: {
      async session ({ token, session }) {
        if (token.sub && session.user) session.user.id = token.sub
        if (token.role && session.user) (session.user as any).role = token.role
        return session
      },
      async jwt({ token }) {
        if (!token.sub) return token // retorna o token caso o usuario nao esteja logado
        const existingUser = await getUserById(token.sub)
        if (!existingUser) return token // retorna o token caso o usuario nao exista
        token.role = existingUser.role // adiciona a role do usuario ao token 
        return token
      }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig,
})