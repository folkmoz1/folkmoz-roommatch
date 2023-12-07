import 'server-only';
import { prisma } from '@/lib/prisma';
import { Room } from '@prisma/client';
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';

export const geyOtherAnnouncements = cache(
  async (roomId) => {
    const announcements = await prisma.room.findMany({
      where: {
        id: {
          not: roomId,
        },
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        listing: {
          select: {
            address: {
              select: {
                address_components: true,
              },
            },
          },
        },
        announcement: {
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
        price: {
          include: {
            daily: true,
            monthly: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return announcements;
  },
  ['get-other-announcements'],
  {
    revalidate: 60 * 60,
  }
);

export const getAnnouncementOneByIdAndListId = async (
  slug: string,
  id: string
) => {
  noStore();
  const rooms = await prisma.room.findFirst({
    where: {
      id,
      listing: {
        slug: slug,
      },
    },
    include: {
      roomDetail: true,
      images: true,
      listing: {
        select: {
          address: {
            select: {
              address_components: true,
            },
          },
        },
      },
      announcement: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              createdAt: true,
              phone_number: true,
            },
          },
        },
      },
      price: {
        include: {
          daily: true,
          monthly: true,
        },
      },
    },
  });

  return rooms;
};

export const getAnnouncementsAllByListingSlug = async (slug: string) => {
  const rooms = await prisma.room.findMany({
    where: {
      listing: {
        slug: slug,
      },
    },
    include: {
      images: {
        select: {
          url: true,
        },
      },
      listing: {
        select: {
          address: {
            select: {
              address_components: true,
            },
          },
        },
      },
      announcement: {
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
      price: {
        include: {
          daily: true,
          monthly: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return rooms;
};

export const getAnnouncementsByListingId = async (
  listingId: string
): Promise<Room[]> => {
  const rooms = await prisma.room.findMany({
    where: {
      listingId: listingId,
    },
    include: {
      images: {
        select: {
          url: true,
        },
      },
      listing: {
        select: {
          address: {
            select: {
              address_components: true,
            },
          },
        },
      },
      announcement: {
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
      price: {
        include: {
          daily: true,
          monthly: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return rooms;
};

export const getAnnouncementsByUserId = async (userId: string) => {
  const listing = await prisma.room.findMany({
    where: {
      announcement: {
        userId: userId,
      },
    },
    include: {
      announcement: {
        include: {
          user: true,
        },
      },
      price: {
        include: {
          daily: true,
          monthly: true,
        },
      },
    },
  });

  return listing;
};
