'use server';
import 'server-only';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export const deleteReviewById = async (reviewId: string) => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  try {
    const returnValue = await prisma.review.delete({
      where: {
        id: reviewId,
        userId,
      },
      select: {
        listing: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/listing/${returnValue.listing.slug}/review`);

    return true;
  } catch (e) {
    return false;
  }
};

export const saveNewReview = async (formData: FormData) => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const comment = formData.get('comment') as string;
  const rating = formData.get('rating');
  const listingSlug = formData.get('listingSlug') as string;

  if (!comment || !rating || !listingSlug) {
    return false;
  }

  const returnValue = await prisma.review.create({
    data: {
      comment,
      rating: Number(rating),
      listing: {
        connect: {
          slug: listingSlug,
        },
      },
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
    select: {
      listing: {
        select: {
          slug: true,
        },
      },
    },
  });

  revalidatePath(`/listing/${returnValue.listing.slug}/review`);

  return true;
};
