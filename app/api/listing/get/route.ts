import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const cols = req.nextUrl.searchParams.get('cols') || 'name';
  const limit = req.nextUrl.searchParams.get('limit') || '10';

  // turn cols into one object with key and value true
  const colsArr = cols.split(',').reduce((acc, col) => {
    if (col === 'address') {
      acc['address'] = {
        select: {
          location: {
            select: {
              lat: true,
              lng: true,
            },
          },
        },
      };
      return acc;
    }

    acc[col] = true;
    return acc;
  }, {});

  try {
    const resp = await prisma.listing.findMany({
      select: {
        id: true,
        ...colsArr,
      },
      take: parseInt(limit),
    });

    return NextResponse.json({
      status: 'success',
      data: resp,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
}
