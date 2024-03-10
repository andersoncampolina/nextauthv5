'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DragAndDrop from '../ui/drag-and-drop'
import { useTransition, useState } from 'react'
import { uploadImage } from '@/actions/uploadImage'
import { useSession } from 'next-auth/react'

export default function ChangePhotoButton() {

    const { update } = useSession()

    const [isModalOpen, setIsModalOpen] = useState(false)
 
    const [isPending, startTransition] = useTransition()

    const handleFile = (formData: FormData) => {
        startTransition(async() => {
            await uploadImage(formData)
            update()
            setIsModalOpen(false)
        })
    }

    return (
        <>
            <Dialog open={isModalOpen}>
                <DialogContent onCloseModal={() => setIsModalOpen(false)}>
                    <DragAndDrop getFile={(formData) => handleFile(formData)}/>
                </DialogContent>
            </Dialog>
            <Button onClick={() => setIsModalOpen(true)} type='button' variant='outline'>Alterar foto</Button>          
        </>
    )
}
