'use client';
import { useStore } from '@/lib/zustand/store';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { CardItem } from '@/components/CardItem';
import { CardLoading } from '@/components/CardItem/CardLoading';
import { Prisma } from '@prisma/client';

type FavoriteEntriesProps = {
  data: Prisma.FavoriteGetPayload<{
    include: {
      listing: {
        include: {
          address: {
            include: {
              address_components: true;
            };
          };
          image_cover: true;
          reviews?: true;
        };
      };
    };
  }>[];
};

export const FavoriteEntries = () => {
  const profile = useStore((state) => state.profile);

  const { isLoading, data, error } = useSWR<FavoriteEntriesProps, Error>(
    '/api/user/favorite',
    fetcher
  );

  if (error) {
    return null;
  }

  return (
    <>
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'
        }
      >
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <CardLoading key={i} />
            ))}{' '}
          </>
        ) : data?.data ? (
          <>
            {data.data.length > 0 ? (
              <RenderEntries data={data.data} />
            ) : (
              <div className={'w-full text-center mt-8 col-span-full'}>
                <img
                  src="/images/design-thinking.svg"
                  className={'mx-auto w-72'}
                />
                <h2 className={'text-xl text-muted mt-4 font-kanit'}>
                  ไม่พบรายการโปรด, กรุณาเพิ่มรายการโปรด
                </h2>
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

const RenderEntries = ({ data }) => {
  return (
    <>
      {data.map((favorite) => (
        <CardItem key={favorite.id} listing={favorite.listing} />
      ))}
    </>
  );
};
