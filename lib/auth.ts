import { auth } from '@/auth'

export async function currentUser() {

    const session = await auth()

    console.log(session)

    return session?.user
}

export async function currentRole() {

    const session = await auth()

    return session?.user?.role
}

