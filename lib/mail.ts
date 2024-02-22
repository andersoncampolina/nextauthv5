import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
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