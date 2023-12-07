'use client';

import { Prisma, Room } from '@prisma/client';
import { ListItem } from '@/app/(listing)/listing/(list)/[slug]/components/listItem';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';

export const RoomList = ({ rooms: ssrData }: { rooms: Room[] }) => {
  const { data } = useSWR<{
    data: Room[];
  }>('/api/listing/' + ssrData[0].listingId + '/announcement', fetcher, {
    fallbackData: { data: ssrData },
  });
  const rooms = data?.data;

  return (
    <>
      <div
        className={
          'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 mx-auto gap-y-6'
        }
      >
        {rooms &&
          rooms.map((room, i) => <ListItem room={room} key={room.id} />)}
      </div>
    </>
  );
};
