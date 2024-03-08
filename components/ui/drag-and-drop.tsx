import React, { useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

interface DragAndDropProps {
  // Define props aqui, se necessário
}

const DragAndDrop: React.FC<DragAndDropProps> = (props) => {
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

  return (
    <section className="flex-col border-2 border-dashed rounded p-5 m-5">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p className='text-center'>Arraste e solte uma foto aqui, ou clique para selecionar!</p>
      </div>
      <aside>
        {images.map((image, index) => (
          <img key={index} src={image} alt="Preview" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
        ))}
        <ul>{filesList}</ul>
      </aside>
    </section>
  );
}

export default DragAndDrop;
