import { redirect } from 'next/navigation';
import GoogleMaps from '@/components/GoogleMaps';

async function getListingDetail(slug: string) {
  const url = process.env.NEXTAUTH_URL + '/api/listing/' + slug;
  const query = '?cols=address,description';

  const resp = await fetch(url + query, {
    cache: 'force-cache',
  });
  return await resp.json();
}

export default async function DetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let listing;
  try {
    const [listingRes] = await Promise.allSettled([
      getListingDetail(params.slug),
    ]);

    if (listingRes.status === 'fulfilled') {
      listing = listingRes.value.data;
    } else {
      console.error(listingRes);
    }
  } catch (err) {
    console.error(err);
  }

  if (!listing) {
    return redirect('/');
  }

  const { address, description } = listing;

  const location = address[0].location[0];

  return (
    <>
      <div className={'font-kanit mt-12 space-y-4'}>
        <div>
          <div className={'text-head-3 font-semibold'}>รายละเอียด</div>
          <div className={'text-body-1 font-light mt-2'}>
            <pre className={'font-kanit leading-[1.75] whitespace-pre-wrap'}>
              {description}
            </pre>
          </div>
        </div>
        <div className={'text-head-3 font-semibold'}>ที่ตั้งโครงการ</div>
        <GoogleMaps
          width={'100%'}
          zoom={18}
          canDrag={false}
          center={{
            lat: location.lat,
            lng: location.lng,
          }}
        />
      </div>
    </>
  );
}
