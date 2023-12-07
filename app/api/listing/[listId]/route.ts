import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function getAll(req: NextRequest, listId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        slug: listId,
      },
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

    if (!listing) {
      return NextResponse.json({
        status: 404,
        error: 'Not Found',
      });
    }

    return NextResponse.json({
      status: 'success',
      data: listing,
    });
  } catch (e) {
    return NextResponse.json({
      status: 'error',
      errors: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
    });
  }
}

async function getByCols(req: NextRequest, listId: string, cols: string) {
  const colsArr = cols.split(',').reduce((acc, col) => {
    acc[col] = true;
    return acc;
  }, {});

  if (colsArr['address']) {
    colsArr['address'] = {
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
    };
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        slug: listId,
      },
      select: {
        id: true,
        ...colsArr,
      },
    });

    if (!listing) {
      return NextResponse.json({
        status: 404,
        error: 'Not Found',
      });
    }

    return NextResponse.json({
      status: 'success',
      data: listing,
    });
  } catch (e) {
    return NextResponse.json({
      status: 'error',
      errors: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
    });
  }
}
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      listId: string;
    };
  }
) {
  const { listId } = params;
  const cols = req.nextUrl.searchParams.get('cols') || null;

  if (!listId) {
    return NextResponse.json({
      status: 400,
      error: 'Bad Request',
    });
  }

  if (cols) {
    return await getByCols(req, listId, cols);
  } else {
    return await getAll(req, listId);
  }
}
