'use server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';

export const removeFromFavorite = async (favId: string, userId: string) => {
  const session = await auth();

  if (!session) {
    return;
  }

  await prisma.favorite.delete({
    where: {
      id: favId,
      userId,
    },
  });
};

export const addToFavorite = async (listId: string) => {
  const session = await auth();

  if (!session) {
    return;
  }
  const { id } = session.user;

  await prisma.favorite.create({
    data: {
      listing: {
        connect: {
          id: listId,
        },
      },
      user: {
        connect: {
          id,
        },
      },
    },
  });
};

export const updateProfile = async (formData: FormData) => {
  const session = await auth();

  if (!session) {
    return 'error';
  }

  const { id } = session.user;

  const firstName = formData.get('firstName')?.toString() || '';
  const lastName = formData.get('lastName')?.toString() || '';
  const phone_number = formData.get('phone_number')?.toString() || '';
  const email = formData.get('email')?.toString() || '';
  const address = formData.get('address')?.toString() || '';

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        phone_number,
        address,
      },
    });

    revalidatePath('/profile');
    return 'success';
  } catch (err) {
    console.log(err);
    return 'duplicate';
  }
};
