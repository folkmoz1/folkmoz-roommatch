import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  if (!id)
    return new Response('list id is required', {
      status: 400,
    });

  try {
    const isOwner = await prisma.listing.findUnique({
      where: {
        id,
      },
    });

    if (!isOwner) {
      return NextResponse.json({
        status: 401,
        error: 'Unauthorized',
      });
    }

    await prisma.listing.delete({
      where: {
        id,
      },
    });

    return new Response('ok', {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image_cover: {
          select: {
            url: true,
            publicId: true,
            width: true,
            height: true,
          },
        },
        slug: true,
        type: true,
        pricerange: true,
        address: {
          select: {
            province: true,
            postcode: true,
            formatted_address: true,
            location: {
              select: {
                lat: true,
                lng: true,
              },
            },
            address_components: {
              select: {
                long_name: true,
                short_name: true,
                types: true,
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            comment: true,
            rating: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 'success',
      listings,
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        errors: {
          message: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
        },
      },
      {
        status: 500,
      }
    );
  }
}
