'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { SettingsSchema } from '@/schemas'
import { getUserByEmail, getUserById } from '@/services/user'
import { currentUser } from '@/lib/auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export async function settings(values: z.infer<typeof SettingsSchema>) {

    const user = await currentUser()
    if (!user) return { error: 'Usuário não autorizado!' }

    const dbUser = await getUserById(user.id!)

    if (!dbUser) return { error: 'Usuário não autorizado!' }

    if (user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== user.id)
            return { error: 'Este email já está em uso!' }

        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)
        if (!passwordsMatch) return { error: 'Senha incorreta!' }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10)
        values.password = hashedPassword
        values.newPassword = undefined
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: { ...values }
    })

    return { success: 'Configurações alteradas com sucesso!' }
}

