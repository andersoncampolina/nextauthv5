'use client'

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import LoginForm from './LoginForm';

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
            <Dialog>
                <DialogTrigger asChild={props.asChild}>
                    {props.children}
                </DialogTrigger>
                <DialogContent className='p-0 w-auto bg-transparent border-none'>
                    <LoginForm />
                </DialogContent> 
            </Dialog>
        )
    }

    return (
        <span onClick={onClick} className='cursor-pointer'>
            {props.children}
        </span>
    )
}
