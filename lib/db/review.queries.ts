import 'server-only';
import { unstable_cache as cache } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const getReviewsByListingSlug = cache(
  async (slug: string) => {
    const reviews = await prisma.review.findMany({
      where: {
        listing: {
          slug,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reviews;
  },
  ['get-reviews-by-listing-slug'],
  {
    revalidate: 60,
  }
);
