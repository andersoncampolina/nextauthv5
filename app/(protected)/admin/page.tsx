'use client'

import { admin } from "@/actions/admin"
import FormSuccess from "@/components/FormSuccess"
import RoleGate from "@/components/auth/RoleGate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

export default function AdminPage() {

    const onServerActionClick = () => {
        admin().then(data => {
            if (data.error) {
                toast.error('Ação de servidor proibida!')
            } else {
                toast.success('Ação de servidor permitida!')
            }
        })
    }

    const onApiRouteClick = () => {
        fetch('/api/admin').then(response => {
            if (response.ok) {
                toast.success('Rota de API permitida!')
            } else {
                toast.error('Rota de API proibida!')
            }
        })
    }

    return (
        <Card className='w-[430px]'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center'>
                    🔑 Admin
                </p>
            </CardHeader>
            <CardContent className='space-y-4'>
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message='Você tem permissão para ver este conteúdo!' />
                </RoleGate>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
                    <p className='text-sm font-medium'>
                        Admin-only API route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Clique para testar
                    </Button>
                </div>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
                    <p className='text-sm font-medium'>
                        Admin-only Server Action
                    </p>
                    <Button onClick={onServerActionClick}>
                        Clique para testar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
