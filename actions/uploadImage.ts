'use server'

import { FileWithPath } from "react-dropzone"
import { v2 as cloudinary } from 'cloudinary'
import { getUserById, updateUser } from "@/services/user";
import { currentUser } from "@/lib/auth";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const uploadImage = async (formData: FormData) => {
    const file = formData.get('image') as FileWithPath
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, async function (error, result) {
            if (error) {
                reject(error)
                return
            } else {
                // TODO: Salvar a URL da imagem no banco de dados
                console.log(result?.secure_url)
                const user = await currentUser()
                if (user && user.id) {
                    const dbUser = await getUserById(user.id)
                    const data = { ...dbUser, image: result!.secure_url }
                    await updateUser(user.id, data)
                    resolve(result)
                }
            }
        }).end(buffer)

    })

}