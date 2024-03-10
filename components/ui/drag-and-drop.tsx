import React, { useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';

interface DragAndDropProps {
  getFile?(formData: FormData): void;
}

const DragAndDrop = (props: DragAndDropProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Atualiza o estado com URLs de objetos para os arquivos aceitos
    setImages(acceptedFiles.map(file => Object(URL).createObjectURL(file)));
    // Não esqueça de liberar esses URLs quando o componente for desmontado
    return () => images.forEach(image => URL.revokeObjectURL(image));
  }, [acceptedFiles]);

  const filesList = acceptedFiles.map((file: FileWithPath, index) => (
    <li key={index}>
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
      <section className="flex-col border-2 border-dashed rounded p-5 m-5">
        <div {...getRootProps({className: 'dropzone'})}>
          <input name='image' {...getInputProps()} />
          <p className='text-center'>Arraste e solte uma foto aqui, ou clique para selecionar!</p>
        </div>
      </section>
      <aside className='m-5'>
        {images.map((image, index) => (
          <img key={index} src={image} alt="Preview" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
        ))}
        <ul>{filesList}</ul>
      </aside>
      <Button onClick={() => getFile(acceptedFiles[0])} className='m-5' type='button'>Enviar</Button>
    </>
  );
}

export default DragAndDrop;
