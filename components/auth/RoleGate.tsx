'use client'

import { UserRole } from '@prisma/client'
import { useCurrentRole } from '@/hooks/useCurrentRole'
import FormError from '@/components/FormError'

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}

export default function RoleGate(props: RoleGateProps) {

    const role = useCurrentRole()

    if (role !== props.allowedRole) {
        return (
            <FormError message='Você não tem permissão para ver este conteúdo!' />
        )    
    }

    return (
        <>
            {props.children}
        </>
    )

}

