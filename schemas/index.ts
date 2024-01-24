import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string({
        invalid_type_error: 'O email deve ser uma string.',
    
    }).email({
        message: 'Preencha o email.',
    }),
    password: z.string().min(1, {message: 'Preencha o password.'}),
})