import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Review } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fetcher<T>(url: string) {
  return fetch(url).then((r) => r.json() as Promise<T>);
}

export const getRating = (reviews: Review[]) => {
  const overallRatingInNumber = reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  const overallRating =
    Math.round((overallRatingInNumber / reviews.length) * 10) / 10;
  const overallRatingRounded = Math.round(overallRating * 2) / 2;
  const overallRatingInPercentage = overallRatingRounded * 20;

  const findPercentage = (rating: number) => {
    return (
      (reviews.filter((review) => review.rating === rating).length /
        reviews.length) *
      100
    );
  };

  return {
    allReviews: reviews.length,
    overallRating,
    overallRatingRounded,
    overallRatingInPercentage,
    progress: {
      5: findPercentage(5),
      4: findPercentage(4),
      3: findPercentage(3),
      2: findPercentage(2),
      1: findPercentage(1),
    },
  };
};
