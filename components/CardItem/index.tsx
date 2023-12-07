import { Prisma } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useMemo, useTransition, useState } from 'react';
import { Heart, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import {
  addToFavorite,
  removeFromFavorite,
} from '@/components/CardItem/actions';
import { useStore } from '@/lib/zustand/store';
import { mutate } from 'swr';
import { useModal } from '@/components/context/modal';
import { useToast } from '@/components/ui/use-toast';
import { IconUsed } from '@/components/IconUsed';
import { DisplayStar } from '@/components/DisplayStar';
import { getRating } from '@/lib/utils';

type CardItemProps = Prisma.ListingGetPayload<{
  include: {
    address: {
      include: {
        address_components: true;
      };
    };
    image_cover: true;
    reviews: true;
  };
}>;

export const CardItem = React.memo(
  ({ listing }: { listing: CardItemProps }) => {
    const [liked, setLiked] = useState(false);
    const [isPending, startTransition] = useTransition();
    const profile = useStore((state) => state.profile);
    const { openModal } = useModal();
    const { toast } = useToast();

    const { id, name, pricerange, image_cover, description, type, reviews } =
      listing;
    const { address_components } = listing.address[0];
    const handleLikeAction = (e) => {
      e.preventDefault();
      if (!profile) {
        openModal('auth');
        return;
      }

      if (isPending) return;

      startTransition(async () => {
        if (!liked) {
          setLiked(true);
          await addToFavorite(id);
          mutate('/api/profile');
          toast({
            title: 'เพิ่มรายการโปรดสำเร็จ',
            description: 'รายการที่คุณเลือกได้ถูกเพิ่มเข้าไปในรายการโปรดแล้ว',
            duration: 3000,
          });
        } else {
          // @ts-ignore
          const favId = profile.favorites?.find(
            (favorite) => favorite.listingId === id
          ).id;
          if (!favId) return;
          setLiked(false);
          await removeFromFavorite(favId);
          mutate('/api/profile');
          toast({
            title: 'ลบรายการโปรดสำเร็จ',
            description: 'รายการที่คุณเลือกได้ถูกลบออกจากรายการโปรดแล้ว',
            duration: 3000,
          });
        }
      });
    };

    const shortAddress = useMemo(() => {
      if (!address_components) return '';

      const level1 = address_components.find(
        (address) => address.types![0] === 'administrative_area_level_1'
      );
      const level2 = address_components.find(
        (address) => address.types![0] === 'administrative_area_level_2'
      );
      return `${level2?.short_name} ${level1?.short_name} `;
    }, [address_components]);

    const [minPrice, maxPrice] = pricerange
      .split(',')
      .map((price) => Number(price).toLocaleString());

    useEffect(() => {
      if (profile) {
        const isLiked = profile.favorites.find(
          (favorite) => favorite.listingId === listing.id
        );
        setLiked(!!isLiked);
      }
    }, [profile]);
    const heartStrokeColor = liked ? '#D32F2F' : '#FFF';
    const heartFillColor = liked ? '#D32F2F' : 'none';

    const rating = getRating(reviews);

    return (
      <>
        <span className={'flex justify-center'}>
          <Link href={`/listing/${listing.slug}`} scroll shallow>
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
                <Heart
                  size={24}
                  strokeWidth={2}
                  color={heartStrokeColor}
                  fill={heartFillColor}
                  onClick={handleLikeAction}
                />
              </div>
              <div className={'h-[161px] relative overflow-hidden'}>
                {
                  <Image
                    quality={100}
                    src={listing.image_cover[0].url}
                    alt={`Roommatch ${name} cover image`}
                    fill
                    sizes={'306px'}
                    className={
                      'object-cover rounded-lg transition-all group-hover:scale-[1.15]'
                    }
                  />
                }
              </div>
              <div className="p-4 font-kanit space-y-2">
                <div className={'flex items-center gap-1'}>
                  <div className={'w-6 h-6'}>{IconUsed({ type })}</div>
                  <div
                    title={name}
                    className={
                      'text-head-3 font-semibold font-sans text-ellipsis whitespace-nowrap overflow-hidden'
                    }
                  >
                    {name}
                  </div>
                </div>
                <div className={'flex w-full text-muted items-center gap-2'}>
                  <div className={'space-x-1 inline-flex items-center'}>
                    <DisplayStar rating={rating.overallRatingRounded} />
                  </div>
                  <div className={'gap-1 inline-flex items-center'}>
                    <MapPin size={20} />
                    <span className={'text-sm'}>{shortAddress}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className={'text-primary text-head-3 font-semibold'}>
                      {minPrice} - {maxPrice}{' '}
                    </span>
                    <span className={'text-sm text-muted'}>บาท/เดือน</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </span>
      </>
    );
  }
);

CardItem.displayName = 'CardItem';
