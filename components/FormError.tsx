import React from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
    message: string;
}

export default function FormError(props: FormErrorProps) {

    if (!props.message) return null;

    return (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-xs text-destructive'>
            <ExclamationTriangleIcon className='h-4 w-4'/>
            <p>{props.message}</p>
        </div>
    )
}
