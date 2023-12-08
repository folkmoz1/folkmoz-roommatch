import 'server-only';
import { unstable_cache as cache } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { Review } from '@prisma/client';

export const getReviewsByListingSlug = cache(
  async (slug: string) => {
    const reviews = await prisma.listing.findMany({
      where: {
        slug,
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
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
