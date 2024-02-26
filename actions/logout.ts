'use server'

import { signOut } from '@/auth'

export const logout = async () => {
    // TODO: Implementar acoes a fazer ao deslogar o usuario, caso tenha
    await signOut()
}