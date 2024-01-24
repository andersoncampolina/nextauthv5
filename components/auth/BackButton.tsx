'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BackButtonProps {
    label: string;
    href: string;
}

export const BackButton = (props: BackButtonProps) => {
    return (
        <Button 
            className='font-normal w-full'
            size='sm'
            variant='link'
            asChild
        >
            <Link href={props.href}>
                {props.label}
            </Link>
        </Button>
    )
}