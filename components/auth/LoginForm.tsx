import React from 'react'
import { CardWrapper } from '@/components/auth/CardWrapper'

export function LoginForm() {
    return (
        <div>
            <CardWrapper 
                headerLabel='Welcome back'
                backButtonLabel='Dont have an account?'
                backButtonHref='/auth/register'
                showSocial
            >
                Login Form
            </CardWrapper>
        </div>
    )
}
