'use server'
// Importações externas
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

// Importações internas
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/services/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) return  { error: 'Campos inválidos!' }

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) return { error: 'Usuário já existe!' }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        }
    })

    // TODO: Enviar email de confirmação

    return { success: 'Usuário criado com sucesso!' }

}