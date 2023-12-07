import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Review, User } from '@prisma/client';
import { Key } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fetcher<T>(url: string) {
  return fetch(url).then((r) => r.json() as Promise<T>);
}

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): { [p: string]: unknown } {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

export const getRating = (reviews: Review[]) => {
  const overallRatingInNumber = reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  const overallRating = overallRatingInNumber / reviews.length;
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
