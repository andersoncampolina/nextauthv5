'use client'
import CardWrapper from '@/components/auth/CardWrapper'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ResetSchema } from '@/schemas'
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { reset } from '@/actions/reset';
import { useState, useTransition } from 'react';


export default function ResetForm() {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {

        setError(undefined);
        setSuccess(undefined);

        startTransition(() => {
            reset(values).then((res) => {
                setError(res?.error);
                setSuccess(res?.success);
            })
        })
    }

    return (
        <div>
            <CardWrapper 
                headerLabel='Esqueceu seu password?'
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
                        </div>
                        <Button disabled={isPending} type='submit' className='w-full'>
                            Enviar email de recuperação
                        </Button>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}
