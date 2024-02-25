import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/newPassword?token=${token}`
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Redefinir senha',
        html: `
            <h1>Redefinir senha</h1>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetLink}">Redefinir senha</a>
        `
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/newVerification?token=${token}`
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verifique seu endereço de e-mail',
        html: `
        <h1>Verifique seu endereço de email</h1>
        <p>Clique no link abaixo para verificar seu email:</p>
        <a href="${confirmLink}">Verificar endereço de email</a>
    `
    })
}