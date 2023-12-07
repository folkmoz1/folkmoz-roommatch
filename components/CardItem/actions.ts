'use server';
import 'server-only';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const removeFromFavorite = async (favId: string) => {
  const session = await auth();

  if (!session) {
    return;
  }

  try {
    await prisma.favorite.delete({
      where: {
        id: favId,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const addToFavorite = async (listId: string) => {
  const session = await auth();

  if (!session) {
    return;
  }
  const { id } = session.user;

  try {
    await prisma.favorite.create({
      data: {
        listingId: listId,
        user: {
          connect: {
            id,
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};
