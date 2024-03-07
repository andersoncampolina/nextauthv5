'use client'
import React, { useState } from 'react'
import CardWrapper from '@/components/auth/CardWrapper'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { login } from '@/actions/login';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Sua conta não está vinculada a uma conta de email. Por favor, faça login com o mesmo provedor que você usou para se registrar." : "";

    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

        setError(undefined);
        setSuccess(undefined);

        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                if (data?.error) {
                    form.reset()
                    setError(data.error)
                }
                if (data?.success) {
                    form.reset()
                    setSuccess(data.success)
                };
                if (data?.twoFactor) setShowTwoFactor(true);
            }).catch((e) => { setError('Algo deu errado!') })
        })
    }

    return (
        <div>
            <CardWrapper 
                headerLabel='Bem vindo novamente!'
                backButtonLabel='Não possui uma conta? Clique e crie uma!'
                backButtonHref='/auth/register'
                showSocial
            >
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
                            {showTwoFactor && (
                                <FormField 
                                    control={form.control}
                                    name='code'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Código para autenticação em dois fatores</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder='123456'
                                                    type='text'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            
                            )}
                            {!showTwoFactor && (
                                <>
                                    <FormField 
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder='email@exemplo.com'
                                                        type='email'
                                                    />
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
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder='******'
                                                        type='password'
                                                    />
                                                </FormControl>
                                                <Button size='sm' variant='link' asChild className='px-0 font-normal'>
                                                    <Link href='/auth/reset'>
                                                        Forgot password?
                                                    </Link>
                                                </Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </div>
                        <Button disabled={isPending} type='submit' className='w-full'>
                            {showTwoFactor ? 'Confirmar' : 'Login'}
                        </Button>
                        <FormError message={error || urlError}/>
                        <FormSuccess message={success}/>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}
