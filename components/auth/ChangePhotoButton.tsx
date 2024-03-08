'use client'

import { logout } from '@/actions/logout'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import DragAndDrop from '../ui/drag-and-drop'

export default function ChangePhotoButton() {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const onClick = () => {
        console.log('CHANGE PHOTO')
        setIsDialogOpen(true)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type='button' variant='outline'>Alterar foto</Button>          
            </DialogTrigger>
            <DialogContent>
                <DragAndDrop />
            </DialogContent>
        </Dialog>
    )
}
