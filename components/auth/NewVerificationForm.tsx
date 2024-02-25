'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import CardWrapper from '@/components/auth/CardWrapper'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/newVerification'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'

export default function NewVerificationForm() {

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()
    const token  = searchParams.get('token')

    const onSubmit = useCallback(() => {
        
        // TODO: Corrigir erro de mensagem de token inexistente
        if (!token) {
            setError('Token inexistente!')
            return
        }
        newVerification(token).then((data) => {
            setSuccess(data.success)
            setError(data.error)
        }).catch(() => {
            setError('Algo deu errado!')
        })
    }, [token])

    useEffect(() => { onSubmit() }, [onSubmit])

    return (
        <CardWrapper
            headerLabel='Verificando seu endereço de e-mail'
            backButtonLabel='Voltar para o login'
            backButtonHref='/auth/login'
        >
            <div className='flex w-full justify-center'>
                {!success && !error && <BeatLoader />}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}
