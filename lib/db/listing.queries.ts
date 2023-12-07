'use server';

import { unstable_cache as cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const ONE_DAY = 60 * 60 * 24;

export type ListingWithReviews = Prisma.PromiseReturnType<
  typeof getListingBySlug
>;

export const getListingBySlug = cache(
  async (slug: string) => {
    return prisma.listing.findUnique({
      where: {
        slug: slug,
      },
      include: {
        image_cover: true,
        address: {
          include: {
            location: true,
            address_components: true,
          },
        },
        reviews: true,
      },
    });
  },
  ['get-listing-by-slug'],
  {
    revalidate: ONE_DAY,
  }
);
