import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { FormCreatePlace } from '@/lib/zustand/store';
import { deleteImage } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  // get all announcement by user

  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  const announcements = await prisma.announcement.findMany({
    where: {
      userId: session.user.id,
    },

    include: {
      user: true,
      rooms: {
        include: {
          images: {
            select: {
              publicId: true,
              url: true,
            },
          },
          price: {
            select: {
              daily: true,
              monthly: true,
            },
          },
          roomDetail: true,
          listing: {
            select: {
              slug: true,
              address: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    status: 'success',
    data: announcements,
  });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id)
    return new Response('name is required', {
      status: 400,
    });

  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  const { user } = session;

  const isOwner = await prisma.announcement.findFirst({
    where: {
      id,
      userId: user.id,
    },
    select: {
      rooms: {
        select: {
          images: {
            select: {
              publicId: true,
            },
          },
        },
      },
    },
  });

  console.log('got isOwner');
  console.log(isOwner);

  if (!isOwner) {
    return NextResponse.json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  // delete images from cloudinary
  const [publicIds] = isOwner.rooms.map((room) =>
    room.images.map((image) => image.publicId)
  );

  const [deleteImages] = await Promise.all(
    publicIds.map((publicId) => deleteImage(publicId))
  );

  await prisma.announcement.delete({
    where: {
      id,
    },
  });

  if (deleteImages.result === 'ok') {
    return NextResponse.json({
      status: 'success',
    });
  }

  return NextResponse.json({
    status: 'success',
    error: 'failed to delete images',
  });
}

export async function POST(req: NextRequest) {
  const body: FormCreatePlace = await req.json();

  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  const { place, detail } = body;

  const listId = place.placeName;

  try {
    const newRoom = await prisma.announcement.create({
      data: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
        placeType: 'Condominium',
        description: place.description,
        title: place.headline,
        rooms: {
          create: {
            price: {
              create: {
                daily: {
                  create: {
                    min_price: parseInt(detail.price),
                    max_price: parseInt(detail.price),
                    mkt_price: parseInt(detail.mkt_price),
                  },
                },
                monthly: {
                  create: {
                    min_price: parseInt(detail.price),
                    max_price: parseInt(detail.price),
                    mkt_price: parseInt(detail.mkt_price),
                  },
                },
              },
            },
            listing: {
              connect: {
                id: listId,
              },
            },
            roomDetail: {
              create: {
                area: parseInt(detail.area),
                room_count: parseInt(detail.bedroom_count),
                bathroom_count: parseInt(detail.bathroom_count),
                floor: parseInt(detail.floor),
              },
            },
            images: {
              createMany: {
                data: detail.images.map((image) => ({
                  publicId: image.public_id,
                  height: image.height,
                  width: image.width,
                  url: image.url,
                })),
              },
            },
          },
        },
      },
      include: {
        user: true,
        rooms: {
          include: {
            images: true,
            price: true,
            roomDetail: true,
            listing: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 'success',
      announcementId: newRoom.id,
      slug: newRoom.rooms[0].listing.slug,
    });
  } catch (e) {
    return NextResponse.json({
      status: 400,
      error: e,
    });
  }
}
