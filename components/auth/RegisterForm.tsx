'use client'
import CardWrapper from '@/components/auth/CardWrapper'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RegisterSchema } from '@/schemas'
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { register } from '@/actions/register';
import { useState, useTransition } from 'react';

export default function RegisterForm() {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

        setError(undefined);
        setSuccess(undefined);

        startTransition(() => {
            register(values).then((res) => {
                setError(res.error);
                setSuccess(res.success);
            })
        })
    }

    return (
        <div>
            <CardWrapper 
                headerLabel='Criar uma conta'
                backButtonLabel='Já possui uma conta?'
                backButtonHref='/auth/login'
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
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='Fulano de Tal'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={isPending} type='submit' className='w-full'>
                            Criar Conta
                        </Button>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}
