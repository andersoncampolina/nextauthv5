/**
 * Este arquivo é responsável por montar o objeto do token e sessao do usuario
 */


import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/services/user"
import { getTwoFactorConfirmationByUserId } from "@/services/twoFactorConfirmation"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {

    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true
      if (user.id) {
        const existingUser = await getUserById(user.id)
        // Prevent signin without email verification
        if (!existingUser?.emailVerified) return false
        // 2FA
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
          if (!twoFactorConfirmation) return false
          // Delete 2FA confirmation for next sign in
          await db.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } })
        }
      }
      return true
    },

    async session({ token, session }) {
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
  session: { strategy: "jwt" },
  ...authConfig,
})