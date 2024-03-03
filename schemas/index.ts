import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
}).refine(data => {
    if (data.password && !data.newPassword) return false
    return true
}, {
    message: 'Preencha o novo password.',
    path: ['newPassword']
}).refine(data => {
    if (!data.password && data.newPassword) return false
    return true
}, {
    message: 'Preencha o password.',
    path: ['password']
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: 'O password deve ter no mínimo 6 caracteres.' }),
})

export const ResetSchema = z.object({
    email: z.string({
        invalid_type_error: 'O email deve ser uma string.',
    }).email({
        message: 'Preencha o email.',
    }),
})

export const LoginSchema = z.object({
    email: z.string({
        invalid_type_error: 'O email deve ser uma string.',
    }).email({
        message: 'Preencha o email.',
    }),
    password: z.string().min(1, { message: 'Preencha o password.' }),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    email: z.string({
        invalid_type_error: 'O email deve ser uma string.',
    }).email({
        message: 'Preencha o email.',
    }),
    password: z.string().min(6, { message: 'O password deve ter no mínimo 6 caracteres.' }),
    name: z.string().min(1, { message: 'Preencha o nome.' }),
})