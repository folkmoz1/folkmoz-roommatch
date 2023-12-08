'use client';
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Announcement,
  Price,
  Prisma,
  ProcessedFile,
  Review,
  Room,
  RoomPrice,
  User,
} from '@prisma/client';
import React from 'react';
import { useGetShortAddress } from '@/lib/hooks/useGetShortAddress';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ListItemProps = Room & {
  price: Array<RoomPrice & { daily: Price[]; monthly: Price[] }>;
  listing: Prisma.ListingSelect & {
    address: Prisma.AddressInclude;
    image_cover: ProcessedFile[];
  };
  announcement: Announcement & {
    user: { id: string; name: string; image: string };
  };
  reviews: Review[];
} & { images: ProcessedFile[] };

export const ListItem = React.memo(({ room }: { room: any }) => {
  const {
    price,
    listing: { address },
    images,
    announcement,
  } = room as ListItemProps;

  const currentPath = usePathname();

  const { title, user } = announcement as Announcement & {
    user: User & { name: string; image: string };
  };

  const displayPrice = price[0].monthly[0].min_price.toLocaleString();
  const shortAddress = useGetShortAddress(address[0].address_components);

  const navigateToRoomDetail = () => {
    window.location.href = `/listing/${room.listing.slug}/${room.id}`;
  };

  return (
    <>
      <Link href={`${currentPath}/${room.id}`}>
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
                src={images[0].url}
                alt={`Roommatch ${title} cover image`}
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
                  title={title}
                  className={
                    'font-semibold text-lg font-kanit text-ellipsis whitespace-nowrap overflow-hidden '
                  }
                >
                  {title}
                </div>
              </div>
              <div className={'flex w-full text-muted items-center gap-2'}>
                <div className={'gap-1 inline-flex items-center'}>
                  <MapPin size={20} />
                  <span className={'text-sm'}>{shortAddress}</span>
                </div>
              </div>
              <div>
                <div className={'mt-4 flex gap-2 items-center'}>
                  <Avatar className={'w-[32px] h-[32px]'}>
                    <AvatarImage src={user.image || '/images/avatar.jpg'} />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={
                        'text-lg font-medium whitespace-nowrap text-ellipsis overflow-hidden'
                      }
                    >
                      {user.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={'w-3/12'}>
              <div className={'text-right'}>
                <div className={'text-primary font-semibold'}>
                  {displayPrice}
                </div>
                <div className={'text-sm text-muted font-light'}>บาท/เดือน</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
});
