'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/services/user'
import { getVerificationTokenByToken } from '@/services/verificationToken'

export const newVerification = async (token: string) => {

    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) return { error: 'Token inexistente!' }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) return { error: 'Token expirado!' }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) return { error: 'Usuário inexistente!' }

    await db.user.update({
        where: { id: existingUser.id },
        data: { 
            emailVerified: new Date(),
            email: existingToken.email, 
        }
    })

    await db.verificationToken.delete({ where: { id: existingToken.id } })

    return { success: 'Email verificado com sucesso!' }

}