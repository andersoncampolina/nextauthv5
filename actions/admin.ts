'use server'

import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export async function admin() {

    const role = await currentRole()

    if (role === UserRole.ADMIN) return { success: 'Permitido!' }

    return { error: 'Proibido!' }
}
