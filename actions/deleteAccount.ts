'use server'

import { getUserById } from '@/services/user'
import { currentUser } from '@/lib/auth'
import { deleteAccountByUserId } from '@/services/account'
import { deleteUserById } from '@/services/user'

export async function deleteAccount() {

    const user = await currentUser()
    if (!user) return { error: 'Usuário não autorizado!' }

    const dbUser = await getUserById(user.id!)

    if (!dbUser) return { error: 'Usuário não autorizado!' }

    if (user.id) {
        await deleteAccountByUserId(user.id)
        await deleteUserById(user.id)
    }

    return { success: 'Sua conta foi apagada com sucesso!' }
}

