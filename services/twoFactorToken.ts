import { db } from '@/lib/db'

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { token },
        })
        return twoFactorToken
    } catch (e) {
        return null
    }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { email },
        })
        return twoFactorToken
    } catch (e) {
        return null
    }
}