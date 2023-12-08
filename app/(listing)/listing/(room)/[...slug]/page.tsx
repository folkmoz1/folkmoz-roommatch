import { Hero } from '@/app/(listing)/listing/(room)/[...slug]/hero';
import { getAnnouncementOneByIdAndListId } from '@/lib/db/announcement.queries';
import { ContactOwner } from '@/app/(listing)/listing/(room)/[...slug]/contact';
import { Suspense } from 'react';
import { PageLoading } from '@/components/PageLoading';

export default async function RoomDetailPage({ params }) {
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <RoomDetail params={params} />
      </Suspense>
    </>
  );
}

const RoomDetail = async ({ params }) => {
  const [listSlug, roomId] = params.slug as string[];

  let room;

  try {
    const [roomRes] = await Promise.allSettled([
      getAnnouncementOneByIdAndListId(listSlug, roomId),
    ]);

    if (roomRes.status === 'fulfilled') {
      room = roomRes.value;
    }
  } catch (err) {
    console.error(err);
  }

  const { price, announcement, listing, roomDetail } = room;
  const displayPrice = price[0].monthly[0].min_price.toLocaleString();
  return (
    <>
      <main className={'pb-20'}>
        <Hero
          images={room.images}
          announcement={announcement}
          listing={listing}
          price={displayPrice}
          detail={roomDetail[0]}
        />
        <div
          className={
            'max-w-screen-xl w-full mx-auto mt-10 px-4 font-kanit grid grid-cols-12'
          }
        >
          <div className={'col-span-full md:col-span-9'}>
            <ContactOwner user={announcement.user} />
            <div className={'mt-10 space-y-2'}>
              <div className={'text-xl sm:text-3xl font-semibold '}>
                รายละเอียด
              </div>
              <div>
                <pre
                  className={
                    'font-kanit text-[--neutral-1000] whitespace-pre-wrap'
                  }
                >
                  {announcement.description}
                </pre>
              </div>
            </div>
          </div>
          <div className={'hidden md:block md:col-span-3'}></div>
        </div>
      </main>
    </>
  );
};
