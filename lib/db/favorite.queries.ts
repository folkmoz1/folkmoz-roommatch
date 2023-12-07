'use server';

import { prisma } from '@/lib/prisma';

export const getFavorites = async (userId: string) => {
  const entries = await prisma.favorite.findMany({
    where: {
      userId,
    },
  });

  return entries;
};
