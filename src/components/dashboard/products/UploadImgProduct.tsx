import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageUp } from 'lucide-react';

interface Props {
  payload: {
    uploadedImg: string;
    setUploadedImg: (value: string) => void;
    errorImg: string;
    setErrorsProduct: (updater: (prevErrors: Record<string, string>) => Record<string, string>) => void;
    setIsModified: (value: boolean) => void;
  };
}

const UploadImgProduct: React.FC<Props> = ({ payload }) => {
  const [isDrag, setIsDrag] = useState(false);

  const handleUploadImg = (file: File) => {
    const maxSize = 1024 * 1024; //1MB
    const reader = new FileReader();
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif'];

    // Check if file is an image
    if (!allowedTypes.includes(file.type)) {
      payload.setErrorsProduct((errorsProduct) => (
        {
          ...errorsProduct,
          image: 'Invalid file type. only PNG, JPG, JPEG, SVG, GIF are allowed'
        }
      ));

      setIsDrag(false);
      return;
    }

    // Check if file is too large
    if (file!.size > maxSize) {
      payload.setErrorsProduct((errorsProduct) => (
        {
          ...errorsProduct,
          image: 'Image is too large max size allowed is 1MB'
        }
      ));

      setIsDrag(false);
      return;
    } else {
      payload.setErrorsProduct((prevErrors) => {
        const rest = { ...prevErrors };
        delete rest.image;
        return rest;
      });
    }

    // Read file as data URL and set it to state
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        payload.setUploadedImg(result);
      }
    };

    reader.readAsDataURL(file!);
  };

  const uploadImageByClick = () => {
    // Create input element to trigger file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.svg, .png, .jpg, .jpeg, .gif';
    input.click();

    // Handle file upload
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleUploadImg(file);
        payload.setIsModified(true);
      }
    };
  };

  const uploadImageByDrag = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUploadImg(file);
  };

  return (
    <section>
      <div
        className={`w-full h-[250px] bg-muted/50`}>
        {payload.uploadedImg ? (
          <div className={`p-4 border-2 border-solid border-primary rounded-md relative overflow-hidden`}>
            <span
              tabIndex={0}
              className='absolute focus-visible:opacity-100 outline-none inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 duration-300 transition-opacity'>
              <Button
                type='button'
                size='sm'
                className='absolute left-4 top-4'
                onClick={uploadImageByClick}>
                <ImageUp className='size-4 mr-2' /> Add image</Button>
            </span>
            <img
              src={payload.uploadedImg}
              alt='uploading image'
              className='h-[calc(250px-2rem)] object-contain object-center mx-auto' />
          </div>
        ) : (
          <button
            type='button'
            className={`${payload.errorImg ? '!border-red-500' : 'border-gray-400'} ${isDrag ? 'border-solid border-primary' : 'border-dashed'} text-center size-full border-2 rounded-md cursor-pointer duration-150 transition-colors hover:border-primary outline-none focus-visible:border-primary`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDrag(true);
            }}
            onDragLeave={() => setIsDrag(false)}
            onDrop={(e) => uploadImageByDrag(e)}
            onClick={uploadImageByClick} >
            <div className='space-y-1 pointer-events-none'>
              <ImageUp className='size-12 mx-auto text-gray-400' />
              <p className='text-sm font-medium'>Click to upload</p>
              <p className='text-xs'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          </button>
        )}
      </div>
      {payload.errorImg && <p className='text-red-500 text-xs mt-2'>{payload.errorImg}</p>}
    </section>
  );
};

export default React.memo(UploadImgProduct);