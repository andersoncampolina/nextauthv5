import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            }
        })
        return user

    } catch (error) {
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            }
        })
        return user

    } catch (error) {
        return null
    }
}

export const deleteUserById = async (id: string) => {
    try {
        await db.user.delete({
            where: {
                id,
            }
        })
        return true
    } catch (error) {
        return false
    }
}