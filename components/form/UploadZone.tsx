'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CloudinaryAPI } from '@/lib/apis/CloudinaryAPI';
import { CloudinaryResponse } from '@/lib/types';
import { useDropzone } from 'react-dropzone';
import { Eye, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormCreatePlaceStore } from '@/lib/zustand/store';

type FileToDataUri = {
  src: string | ArrayBuffer | null;
} & Pick<File, 'name' | 'type' | 'size'>;

const fileToDataUri = (image: File): PromiseLike<FileToDataUri> => {
  return new Promise((res) => {
    const reader = new FileReader();
    const { type, name, size } = image;
    reader.addEventListener('load', () => {
      res({
        src: reader.result,
        name: name,
        type,
        size: size,
      });
    });
    reader.readAsDataURL(image);
  });
};

export function UploadZone() {
  const [selectPreview, setSelectPreview] = useState<number | null>(null);

  const {
    form: { global },
    setPreviewImage,
    deletePreviewImage,
    setFiles,
  } = useFormCreatePlaceStore((state) => state);

  const previewImage = global.previewImage;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newImagesPromise = [] as FileToDataUri[];

    for (let i = 0; i < acceptedFiles.length; i++) {
      newImagesPromise.push(await fileToDataUri(acceptedFiles[i]));
    }
    const newImages = await Promise.all(newImagesPromise);
    setPreviewImage(newImages);
    setFiles(acceptedFiles);
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
    },
  });

  return (
    <>
      <div className={''}>
        {previewImage.length > 0 && (
          <>
            <div className={'text-head-3 font-semibold'}>รูปภาพที่เลือก</div>
            <div className={'grid grid-cols-4 gap-4'}>
              {previewImage.map((image, index) => (
                <div key={index} className={`relative group`}>
                  <motion.img
                    layoutId={'image' + index}
                    src={image.src as string}
                    alt={image.name}
                    className={'w-full h-32 object-cover rounded-md'}
                  />
                  <div
                    className={
                      'absolute flex justify-center gap-4 items-center inset-0 opacity-0 group-hover:opacity-100 bg-black/50 cursor-pointer z-10 transition-opacity rounded-md'
                    }
                  >
                    <div
                      className="p-1 bg-warning-foreground rounded-full"
                      onClick={() => {
                        setSelectPreview(index);
                      }}
                    >
                      <Eye color={'white'} />
                    </div>
                    <div
                      className="p-1 bg-white rounded-full"
                      onClick={() => {
                        deletePreviewImage(index);
                      }}
                    >
                      <X color={'gray'} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div
          {...getRootProps()}
          className={`${
            isDragActive ? 'bg-gray-100' : ''
          } mt-2 border-2 border-dashed border-gray-200 rounded-md p-4 flex flex-col justify-center items-center`}
        >
          <input {...getInputProps()} />
          <img src={'/images/upload.svg'} alt={'upload'} />

          <div className={'text-head-3 font-semibold'}>อัพโหลดรูปภาพ</div>
          <div className={'text-body-1 font-light'}>
            อัพโหลดรูปภาพของที่พักของคุณ (อย่างน้อย 4 รูป)
          </div>
          <div className={'text-body-1 font-light'}>
            รูปภาพจะถูกแสดงผลในหน้ารายละเอียดของที่พัก
          </div>
        </div>
      </div>

      {selectPreview !== null && (
        <div
          className={
            'fixed inset-0 bg-black/50 flex justify-center items-center z-50'
          }
          onClick={() => setSelectPreview(null)}
        >
          <div className={'relative'}>
            <motion.img
              layoutId={'image' + selectPreview}
              src={previewImage[selectPreview].src as string}
              alt={previewImage[selectPreview].name}
              className={'w-full h-96 object-cover rounded-md'}
            />
          </div>
        </div>
      )}
    </>
  );
}
