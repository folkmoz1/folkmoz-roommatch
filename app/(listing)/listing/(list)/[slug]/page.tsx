import { Suspense } from 'react';
import RoomEntriesLoading from '@/app/(listing)/listing/(list)/[slug]/components/listLoading';
import { RoomList } from '@/app/(listing)/listing/(list)/[slug]/components/RoomList';
import { getAnnouncementsAllByListingSlug } from '@/lib/db/announcement.queries';

export default function ListingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <div className={'mt-16'}>
        <Suspense fallback={<RoomEntriesLoading />}>
          <AnnouncementEntries slug={params.slug} />
        </Suspense>
      </div>
    </>
  );
}

async function AnnouncementEntries({ slug }: { slug: string }) {
  let entries = await getAnnouncementsAllByListingSlug(slug);

  if (entries.length === 0) {
    return null;
  }

  return (
    <>
      <RoomList rooms={entries} />
    </>
  );
}
