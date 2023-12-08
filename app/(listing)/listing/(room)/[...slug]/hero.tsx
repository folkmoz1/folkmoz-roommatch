'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AddressComponent,
  Announcement,
  Listing,
  ProcessedFile,
  RoomDetail,
} from '@prisma/client';
import { useGetShortAddress } from '@/lib/hooks/useGetShortAddress';
import { MapPin } from 'lucide-react';
import { RoomDetailPanel } from '@/components/RoomDetailPanel';
import { Button } from '@/components/ui/button';

type HeroProps = {
  images: Array<ProcessedFile>;
  announcement: Announcement | null;
  listing:
    | (Listing & { address: { address_components: AddressComponent[] } })
    | null;
  price: string;
  detail: RoomDetail;
};

export const Hero = ({
  images,
  announcement,
  listing,
  price,
  detail,
}: HeroProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageClick = (i: number) => {
    setCurrentImage(i);
  };

  const shortAddress = useGetShortAddress(
    listing?.address[0].address_components
  );

  const { area, floor, bathroom_count, room_count } = detail;

  return (
    <>
      <section>
        <div
          className={
            'flex justify-center items-center w-full bg-[--neutral-200] relative h-[600px]'
          }
        >
          <AnimatePresence mode={'sync'}>
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={'object-cover max-h-[600px] absolute inset-0'}
              style={{
                backgroundImage: `url(${images[currentImage].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </AnimatePresence>
          <div className={'absolute bottom-4 flex gap-4 z-2'}>
            {images.map((image, i) => {
              return (
                <div
                  key={i}
                  role={'button'}
                  onClick={() => handleImageClick(i)}
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: 188,
                    height: 117,
                    borderRadius: 8,
                    filter: currentImage !== i ? 'brightness(0.4)' : 'none',
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      <div className={'max-w-screen-xl w-full mx-auto mt-10 px-4 font-kanit'}>
        <div className={'flex flex-col md:flex-row justify-between gap-4'}>
          <div>
            <h1 className={'text-2xl sm:text-4xl font-semibold'}>
              {announcement?.title}
            </h1>
            <div
              className={
                'text-muted text-lg text-2xl font-normal flex gap-1 items-center'
              }
            >
              <MapPin className={'w-[20px] sm:w-[26px]'} />
              {shortAddress}
            </div>
          </div>
          <div
            className={
              'md:text-right flex sm:flex-col gap-2 items-center sm:items-start'
            }
          >
            <div
              className={
                'text-primary text-2xl sm:text-3xl font-semibold font-sans'
              }
            >
              {price}
            </div>
            <div className={'text-xl sm:text-2xl text-muted font-light'}>
              บาท/เดือน
            </div>
          </div>
        </div>
        <div
          className={
            'flex flex-col sm:flex-row sm:items-center justify-between gap-4'
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4 font-kanit md:w-2/3">
            <RoomDetailPanel
              area={area}
              bedroom_count={room_count}
              bathroom_count={bathroom_count}
              floor={floor}
            />
          </div>
          <Button variant={'action'} className={'sm:w-1/5 font-semibold'}>
            จอง
          </Button>
        </div>
      </div>
    </>
  );
};
