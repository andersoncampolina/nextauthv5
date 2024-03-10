'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DragAndDrop from '../ui/drag-and-drop'
import { useTransition, useState } from 'react'
import { uploadImage } from '@/actions/uploadImage'
import { useSession } from 'next-auth/react'
import { toast } from "sonner"

export default function ChangePhotoButton() {

    const { update } = useSession()

    const [isModalOpen, setIsModalOpen] = useState(false)
 
    const [isPending, startTransition] = useTransition()

    const handleFile = (formData: FormData) => {
        startTransition(async() => {
            await uploadImage(formData)
            update()
            setIsModalOpen(false)
            toast.success('Foto alterada com sucesso!')
        })
    }

    return (
        <>
            <Dialog open={isModalOpen}>
                <DialogContent onCloseModal={() => setIsModalOpen(false)}>
                    <DragAndDrop isPending={isPending} getFile={(formData) => handleFile(formData)}/>
                </DialogContent>
            </Dialog>
            <Button onClick={() => setIsModalOpen(true)} type='button' variant='outline'>
                Alterar foto
            </Button>          
        </>
    )
}
