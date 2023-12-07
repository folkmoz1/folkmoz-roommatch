import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { Prisma } from '@prisma/client';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized', status: 'error' },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { user } = session;

  try {
    const newListing = await prisma.listing.create({
      data: {
        name: body.title,
        description: body.description,
        image_cover: {
          create: {
            url: body.image_cover.url,
            publicId: body.image_cover.public_id,
            height: body.image_cover.height,
            width: body.image_cover.width,
          },
        },
        slug: body.slug,
        type: body.type,
        pricerange: body.pricerange,

        address: {
          create: {
            province: body.address.province,
            postcode: body.address.postcode,
            formatted_address: body.address.formatted_address,
            location: {
              create: {
                lat: body.address.lat,
                lng: body.address.lng,
              },
            },
            address_components: {
              createMany: {
                data: body.address.address_components.map((item: any) => ({
                  long_name: item.long_name,
                  short_name: item.short_name,
                  types: item.types as Prisma.JsonArray,
                })),
              },
            },
          },
        },

        owner: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        owner: true,
        address: true,
      },
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (err: any) {
    console.log(err);

    if (err.code === 'P2025') {
      cookies().delete('next-auth.session-token');
      return NextResponse.json(
        { message: 'Unauthorized', status: 'error' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล', status: 'error' },
      { status: 500 }
    );
  }
}
