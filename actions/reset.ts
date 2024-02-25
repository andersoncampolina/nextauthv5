'use server'

import * as z from 'zod'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/services/user"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) return { error: 'Email inválido!' }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) return { error: 'Email não encontrado!' }

    // TODO: Gerar token e enviar email
    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

    return { success: 'Email enviado!' }

}