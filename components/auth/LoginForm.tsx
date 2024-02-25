'use client'
import React from 'react'
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
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Sua conta não está vinculada a uma conta de email. Por favor, faça login com o mesmo provedor que você usou para se registrar." : "";

    const [isPending, startTransition] = useTransition();
    const [error, setError] = React.useState<string | undefined>('')
    const [success, setSuccess] = React.useState<string | undefined>('')

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
            login(values).then((res) => {
                setError(res?.error);
                setSuccess(res?.success);
            })
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
                                                placeholder='seu.email@exemplo.com'
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
                        </div>
                        <Button disabled={isPending} type='submit' className='w-full'>
                            Login
                        </Button>
                        <FormError message={error || urlError}/>
                        <FormSuccess message={success}/>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}
