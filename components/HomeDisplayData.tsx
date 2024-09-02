'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { CardItem } from '@/components/CardItem';
import { CardLoading } from '@/components/CardItem/CardLoading';

type ListResponse = {
  listings: Prisma.ListingGetPayload<{
    include: {
      address: {
        include: {
          address_components: true;
        };
      };
      image_cover: true;
      reviews?: true;
    };
  }>[];
};

export const HomeDisplayData = ({}) => {
  const { data, isLoading } = useSWR<ListResponse, Error>(
    '/api/listing',
    fetcher
  );

  return (
    <>
      <div className={'container'}>
        <div
          className={'px-8 py-4 md:py-10 font-kanit space-y-10 xl:space-y-20'}
        >
          <div
            className={
              'grid justify-items-center grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6 md:gap-8 max-w-screen-xl mx-auto'
            }
          >
            <h2
              className={
                'text-4xl md:text-[40px] leading-normal text-[--neutral-1000] font-semibold col-span-full mb-2'
              }
            >
              โครงการแนะนำ
            </h2>
            <div className={'col-span-full w-full'}>
              <div
                className={
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
                }
              >
                {isLoading ? (
                  <>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <CardLoading key={i} />
                    ))}
                  </>
                ) : data && data.listings ? (
                  data.listings.map((listing) => (
                    <CardItem key={listing.id} listing={listing} />
                  ))
                ) : (
                  <ErrorDisplay />
                )}
              </div>
            </div>
          </div>

          <div
            className={
              'grid justify-items-center grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6 md:gap-8 max-w-screen-xl mx-auto'
            }
          >
            <h2
              className={
                'text-4xl md:text-[40px] leading-normal text-[--neutral-1000] font-semibold col-span-full mb-2'
              }
            >
              โครงการใกล้ฉัน
            </h2>
            <div className={'col-span-full w-full'}>
              <div
                className={
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
                }
              >
                {isLoading ? (
                  <>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <CardLoading key={i} />
                    ))}
                  </>
                ) : data && data.listings ? (
                  data.listings.map((listing) => (
                    <CardItem key={listing.id} listing={listing} />
                  ))
                ) : (
                  <ErrorDisplay />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ErrorDisplay = () => (
  <div className="text-center col-span-full text-red-500">
    เกิดข้อผิดพลาดในการโหลดข้อมูล
  </div>
);
