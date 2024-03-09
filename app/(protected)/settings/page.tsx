'use client'

import { useTransition, useState } from 'react'
import { useSession } from 'next-auth/react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { settings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { SettingsSchema } from '@/schemas'
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage  } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserRole } from '@prisma/client'
import { Switch } from '@/components/ui/switch'
import { deleteAccount } from '@/actions/deleteAccount'
import { logout } from '@/actions/logout'
import ChangePhotoButton from '@/components/auth/ChangePhotoButton'
 
export default function SettingsPage() {

    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const { update } = useSession()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values).then((data) => {
                if (data.error) setError(data.error)
                if (data.success) {
                    update()
                    setSuccess(data.success)
                }
            }).catch((e) => {
                setError('Algo deu errado!')
            })
        })
    }

    const handleDeletarContaClick = () => {
        // TODO: Melhorar a confirmação de deletar conta
        const confirmation = confirm('Você tem certeza que deseja deletar sua conta?')
        if (!confirmation) return
        startTransition(() => {
            deleteAccount().then((data) => {
                if (data.error) setError(data.error)
                if (data.success) {
                    setSuccess(data.success)
                    logout()
                }
            }).catch((e) => {
                setError('Algo deu errado!')
            })
        })
    }

    return (
        <Card className="w-[430px]">
            <CardHeader>
                <p className='text2xl font-semibold text-center'>⚙️ Configurações</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Fulano de Tal' disabled={isPending}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type='email' {...field} placeholder='fulano@gmail.com' disabled={isPending}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password' {...field} placeholder='******' disabled={isPending}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='newPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password' {...field} placeholder='******' disabled={isPending}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />                    
                                    <FormField
                                        control={form.control}
                                        name='isTwoFactorEnabled'
                                        render={({ field }) => (
                                            <FormItem className='flex fle-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                                <div className='space-y-0.5'>
                                                    <FormLabel>Fator de 2 passos para autenticação</FormLabel>
                                                    <FormDescription>
                                                        Habilite o 2FA (Fator de 2 passos para autenticação) para sua conta
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch disabled={isPending} defaultChecked={field.value} checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name='role'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecione um tipo de usuario'>{field.value}</SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    ADMIN
                                                </SelectItem>
                                                <SelectItem value={UserRole.USER}>
                                                    USER
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />  
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <div className='flex justify-between'>
                            <Button type='submit' disabled={isPending}>Salvar</Button>
                            {/* <ChangePhotoButton /> */}
                            <Button type='button' onClick={handleDeletarContaClick} variant='destructive' disabled={isPending}>Deletar Conta</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>  
    )
}
