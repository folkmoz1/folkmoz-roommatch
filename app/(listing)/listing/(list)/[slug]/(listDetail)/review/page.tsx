import { getReviewsByListingSlug } from '@/lib/db/review.queries';
import { ReviewItem } from '@/app/(listing)/listing/(list)/[slug]/(listDetail)/review/reviewItem';
import { Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import { RatingDisplay } from '@/app/(listing)/listing/(list)/[slug]/(listDetail)/review/RatingDisplay';
import { getRating } from '@/lib/utils';
import { auth } from '@/auth';
import { ReviewInputForm } from '@/app/(listing)/listing/(list)/[slug]/(listDetail)/review/form';

export default async function ListingReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  let reviews;
  let listingId;

  try {
    const [reviewsRes] = await Promise.allSettled([
      getReviewsByListingSlug(params.slug),
    ]);

    if (reviewsRes.status === 'fulfilled') {
      const data = reviewsRes.value[0];
      reviews = data.reviews;
      listingId = data.listingId;
    } else {
      console.error(reviewsRes);
    }
  } catch (err) {
    console.error(err);
  }

  if (!reviews) {
    return null;
  }
  const rating = reviews.length > 0 ? getRating(reviews) : null;

  return (
    <>
      <div className={'mt-16 space-y-10'}>
        <RatingDisplay rating={rating} />
        {reviews &&
          reviews.map((review, i) => (
            <Fragment key={review.id}>
              <ReviewItem review={review} />
              <Separator className={'my-4'} />
            </Fragment>
          ))}

        <ReviewForm listingId={listingId} />
      </div>
    </>
  );
}

const ReviewForm = async ({ listingId }: { listingId: string }) => {
  const session = await auth();

  return session ? (
    <ReviewInputForm listingId={listingId} />
  ) : (
    <div className={'font-kanit text-muted text-center'}>
      ลงชื่อเข้าใช้เพื่อรีวิว
    </div>
  );
};
