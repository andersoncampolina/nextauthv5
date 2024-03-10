'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DragAndDrop from '../ui/drag-and-drop'
import { useTransition } from 'react'
import { uploadImage } from '@/actions/uploadImage'
import { useSession } from 'next-auth/react'

export default function ChangePhotoButton() {

    const { update } = useSession()
 
    const [isPending, startTransition] = useTransition()

    const handleFile = (formData: FormData) => {
        startTransition(async() => {
            await uploadImage(formData)
            update()
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type='button' variant='outline'>Alterar foto</Button>          
            </DialogTrigger>
            <DialogContent>
                <DragAndDrop getFile={(formData) => handleFile(formData)}/>
            </DialogContent>
        </Dialog>
    )
}
