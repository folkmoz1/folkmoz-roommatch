import { getReviewsByListingSlug } from '@/lib/db/review.queries';
import { ReviewItem } from '@/app/(listing)/listing/(list)/[slug]/review/reviewItem';
import { Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import { RatingDisplay } from '@/app/(listing)/listing/(list)/[slug]/review/RatingDisplay';
import { getRating } from '@/lib/utils';
import { auth } from '@/auth';
import { ReviewInputForm } from '@/app/(listing)/listing/(list)/[slug]/review/form';

export default async function ListingReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  let reviews;

  try {
    const [reviewsRes] = await Promise.allSettled([
      getReviewsByListingSlug(params.slug),
    ]);

    if (reviewsRes.status === 'fulfilled') {
      reviews = reviewsRes.value;
    } else {
      console.error(reviewsRes);
    }
  } catch (err) {
    console.error(err);
  }

  if (!reviews) {
    return null;
  }

  const rating = getRating(reviews);

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

        <ReviewForm listingId={reviews[0].listingId} />
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
