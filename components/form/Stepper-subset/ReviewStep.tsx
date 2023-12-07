import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useFormCreatePlaceStore } from '@/lib/zustand/store';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useMemo, useRef } from 'react';
import { RoomDetailPanel } from '@/components/RoomDetailPanel';

export const ReviewStep = () => {
  const { form } = useFormCreatePlaceStore((state) => state);
  const { data } = useSession();

  const { global, place, detail } = form;

  const shortAddress = useRef('');

  useEffect(() => {
    const getAddress = () => {
      {
        const address_components = place.location.address_components;
        if (!address_components) return '';

        const level1 = address_components.find(
          (address) => address.types[0] === 'administrative_area_level_1'
        );
        const level2 = address_components.find(
          (address) => address.types[0] === 'administrative_area_level_2'
        );
        shortAddress.current = `${level2?.short_name} ${level1?.short_name} `;
      }
    };
    getAddress();
  }, []);

  return (
    <>
      <div className={'flex justify-center py-4'}>
        <div
          className={
            'w-[306px] h-auto rounded-lg group overflow-hidden shadow-md bg-[--neutral-50] relative cursor-pointer hover:shadow-lg transition-all'
          }
        >
          <div
            className={
              'absolute top-2 right-2 z-10 cursor-pointer transition-all p-2'
            }
          >
            <Heart size={24} strokeWidth={2} color={'#FFF'} />
          </div>
          <div className={'h-[161px] relative overflow-hidden'}>
            {
              <Image
                quality={100}
                src={global.previewImage[0].src as string}
                alt={`Roommatch ${place.placeName} cover image`}
                fill
                sizes={'306px'}
                className={
                  'object-cover rounded-lg transition-all group-hover:scale-[1.15]'
                }
              />
            }
          </div>
          <div className="p-4 font-kanit flex">
            <div className="w-9/12 space-y-1">
              <div className={'flex items-center gap-1'}>
                <div
                  title={place.headline}
                  className={
                    'font-semibold text-lg font-kanit text-ellipsis whitespace-nowrap overflow-hidden '
                  }
                >
                  {place.headline}
                </div>
              </div>
              <div className={'flex w-full text-muted items-center gap-2'}>
                <div className={'gap-1 inline-flex items-center'}>
                  <MapPin size={20} />
                  <span className={'text-sm'}>{shortAddress.current}</span>
                </div>
              </div>
              <div>
                <div className={'mt-4 flex gap-2 items-center'}>
                  <Avatar className={'w-[32px] h-[32px]'}>
                    <AvatarImage
                      src={data?.user.image || '/images/avatar.jpg'}
                    />
                    <AvatarFallback>
                      {data?.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className={'text-lg font-medium'}>
                      {data?.user.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={'w-3/12'}>
              <div className={'text-right'}>
                <div className={'text-primary'}>
                  {Number(detail.price).toLocaleString()}
                </div>
                <div className={'text-sm text-muted font-light'}>บาท/เดือน</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          'border-y-2 border-[#D5D9D7] py-6 font-kanit flex justify-between items-center'
        }
      >
        <div className={'space-y-2'}>
          <div className={'text-2xl font-semibold text-primary'}>
            {place.headline}
          </div>
          <div
            className={'gap-1 inline-flex items-center text-muted font-medium'}
          >
            <MapPin size={20} />
            <span className={'text-xl'}>{shortAddress.current}</span>
          </div>
        </div>

        <div>
          <div className={'text-right'}>
            <div className={'text-primary text-2xl'}>
              {Number(detail.price).toLocaleString()}
            </div>
            <div className={'text-xl text-muted font-light'}>บาท/เดือน</div>
          </div>
        </div>
      </div>
      <div className={'border-b-2 border-[#D5D9D7] pb-4 font-kanit'}>
        <div className="text-primary text-xl font-semibold">ข้อมูลที่พัก</div>
        <div className="grid grid-cols-4 mt-4 gap-4">
          <RoomDetailPanel
            area={detail.area}
            bedroom_count={detail.bedroom_count}
            bathroom_count={detail.bathroom_count}
            floor={detail.floor}
          />
        </div>
      </div>
      <div className={'py-4'}>
        <div className={'text-primary text-xl font-semibold'}>
          รายละเอียดที่พัก
        </div>
        <div className={'mt-4'}>
          <div className={'text-body-1 text-muted font-medium'}>
            <pre className={'font-kanit'}>
              {place.description ? place.description : 'ไม่ได้ระบุรายละเอียด'}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
