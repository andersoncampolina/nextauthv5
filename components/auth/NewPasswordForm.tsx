'use client'
import CardWrapper from '@/components/auth/CardWrapper'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { newPassword } from '@/actions/newPassword';
import { useState, useTransition } from 'react';
import { NewPasswordSchema } from '@/schemas';
import { useSearchParams } from 'next/navigation';

export default function NewPasswordForm() {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {

        setError(undefined);
        setSuccess(undefined);

        startTransition(() => {
            newPassword(values, token).then((res) => {
                setError(res?.error);
                setSuccess(res?.success);
            })
        })
    }

    return (
        <div>
            <CardWrapper 
                headerLabel='Preencha seu novo password'
                backButtonLabel='Volte ao login'
                backButtonHref='/auth/login'
            >
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
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
                            Redefinir senha
                        </Button>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}
