import { redirect } from 'next/navigation';
import Image from 'next/image';
import { IconUsed } from '@/components/IconUsed';
import React from 'react';
import { MapPin } from 'lucide-react';
import { Tabs } from '@/app/(listing)/listing/(list)/[slug]/(listDetail)/components/tabs';
import { getRating } from '@/lib/utils';
import { DisplayStar } from '@/components/DisplayStar';
import { getListingBySlug, ListingWithReviews } from '@/lib/db/listing.queries';

export default async function ListingLayout({
  params,
  children,
}: {
  params: {
    slug: string;
  };
  children: React.ReactNode;
}) {
  let listing = {} as ListingWithReviews | null;
  try {
    const [listingRes] = await Promise.allSettled([
      getListingBySlug(params.slug),
    ]);

    if (listingRes.status === 'fulfilled') {
      listing = listingRes.value;
    }
  } catch (err) {
    console.error(err);
  }

  if (!listing) {
    return redirect('/');
  }

  const { name, pricerange, image_cover, type, reviews, address } = listing;

  const [minPrice, maxPrice] = pricerange
    .split(',')
    .map((v: string) => Number(v).toLocaleString());

  const rating = getRating(reviews);

  return (
    <>
      <main className={'pb-20'}>
        <section>
          <div
            className={
              'flex justify-center items-center w-full bg-[--neutral-200] relative'
            }
          >
            <Image
              className={'object-cover max-h-[600px]'}
              style={{
                filter: 'brightness(0.7)',
              }}
              quality={100}
              width={1920}
              height={600}
              loading={'eager'}
              src={image_cover[0].url}
              alt={name}
            />
          </div>
        </section>
        <div className={'px-4'}>
          <div
            className={
              'max-w-[856px] w-full h-auto sm:h-[150px] flex flex-col gap-4 py-8 px-6 font-kanit bg-white rounded-3xl shadow-md mx-auto -mt-[75px] z-10 relative'
            }
          >
            <div
              className={
                'flex flex-col gap-4 sm:flex-row sm:justify-between w-full'
              }
            >
              <div className={'flex'}>
                <div className={'w-8 h-8'}>{IconUsed({ type, size: 32 })}</div>
                <div className={'text-lg sm:text-2xl font-sans font-semibold'}>
                  {name}
                </div>
              </div>
              <div>
                <div
                  className={'space-x-1 inline-flex items-center text-muted'}
                >
                  <DisplayStar
                    rating={rating.overallRatingRounded}
                    size={'text-2xl'}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                'flex flex-col sm:flex-row justify-between items-start gap-4 sm:items-center'
              }
            >
              <div className={'text-muted font-kanit font-normal flex gap-1'}>
                <MapPin size={20} />
                {address[0].formatted_address}
              </div>
              <div
                className={'text-muted font-kanit font-normal w-1/3 text-right'}
              >
                <span className={'text-2xl text-primary font-semibold'}>
                  {minPrice} - {maxPrice}
                </span>
                <span> บาท/เดือน</span>
              </div>
            </div>
          </div>
          <div className={'flex justify-center font-kanit mt-10'}>
            <Tabs slug={params.slug} />
          </div>

          <div className={'max-w-screen-xl w-full mx-auto'}>{children}</div>
        </div>
      </main>
    </>
  );
}
