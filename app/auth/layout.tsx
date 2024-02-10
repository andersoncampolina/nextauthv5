import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
    return (
        <div className='h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-500 to-black'>
            {props.children}
        </div>
    )
}
