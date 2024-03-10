/**
 * Este componente é uma logica isolada de uma área de arrastar e soltar arquivos.
 * No momento so aceita uma foto, mas da para personalizar para aceitar mais.
 * Você consegue capturar o arquivo quando o usuario clicar em enviar, usando a propriedade getFile(), que ja retorna o FormData com o arquivo.
 */

'use client'

import React, { useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { IoCloudUploadOutline } from "react-icons/io5";

interface DragAndDropProps {
  getFile(formData: FormData): void;
  isPending?: boolean;
  maxFiles?: number;
}

const DragAndDrop = (props: DragAndDropProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: props.maxFiles || 1,
  });
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Atualiza o estado com URLs de objetos para os arquivos aceitos
    setImages(acceptedFiles.map(file => Object(URL).createObjectURL(file)));
    // Não esqueça de liberar esses URLs quando o componente for desmontado
    return () => images.forEach(image => URL.revokeObjectURL(image));
  }, [acceptedFiles]);

  const filesList = acceptedFiles.map((file: FileWithPath, index) => (
    <li key={index} className='text-xs text-center pt-2'>
      {file.path} - {file.size} bytes
    </li>
  ));

  const getFile = (file: FileWithPath) => {
    if (props.getFile) {
      const formData = new FormData();
      formData.append('image', file);
      props.getFile(formData);
    }
  };

  return (
    <>
      <section className="flex-col border-2 border-dashed border-neutral-400 rounded p-5 m-5 mb-0 bg-slate-200">
        <div {...getRootProps({className: 'dropzone'})}>
          <div className='flex flex-col items-center gap-3'>
            <input name='image' {...getInputProps()}/>
            <p className='text-center'>Arraste e solte uma foto aqui, ou clique neste espaço para selecionar...</p>
            <IoCloudUploadOutline size={25}/>
          </div>
        </div>
      </section>
      <aside className='m-5 mb-0'>
        {images.map((image, index) => (
          <img key={index} src={image} alt="Preview" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
        ))}
        <ul>{filesList}</ul>
      </aside>
      <Button
        disabled={props.isPending} 
        onClick={() => getFile(acceptedFiles[0])} 
        className={`m-5 ${!acceptedFiles[0] && 'hidden'}`} 
        type='button'
      >
        Enviar
      </Button>
    </>
  );
}

export default DragAndDrop;
