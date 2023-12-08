'use server';

import { prisma } from '@/lib/prisma';

export const getFavorites = async (userId: string) => {
  const entries = await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      listing: {
        include: {
          image_cover: true,
          address: {
            include: {
              address_components: true,
            },
          },
        },
      },
    },
  });

  return entries;
};
