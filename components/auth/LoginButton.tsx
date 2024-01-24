'use client'

import React from 'react'
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

export default function LoginButton(props: LoginButtonProps) {

    const router = useRouter();

    const onClick = () => {
        router.push('/auth/login');
    }

    if (props.mode === 'modal') {
        return (
            <span>
                TODO: Implement modal
            </span>
        )
    }

    return (
        <span onClick={onClick} className='cursos-pointer'>
            {props.children}
        </span>
    )
}
