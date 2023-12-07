'use server';

import { prisma } from '@/lib/prisma';

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      firstName: true,
      lastName: true,
      provider: true,
      email: true,
      image: true,
      phone_number: true,
      address: true,
      reviews: true,
      favorites: {
        select: {
          id: true,
          listingId: true,
          createdAt: true,
        },
      },
      account_status: true,
      listings: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      permissions: {
        select: {
          can_book: true,
          can_add_room: true,
        },
      },
      bookings: true,

      createdAt: true,
      updatedAt: true,
    },
  });
};
