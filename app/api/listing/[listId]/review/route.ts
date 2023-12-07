import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { listId: string } }
) {
  const { listId } = params;
  const body = await req.json();
  const { rating, comment } = body;

  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  if (!listId) {
    return NextResponse.json({
      status: 400,
      error: 'Bad Request',
    });
  }

  if (!rating || !comment) {
    return NextResponse.json({
      status: 400,
      error: 'Missing required fields',
    });
  }

  try {
    const review = await prisma.review.create({
      data: {
        rating: rating,
        comment: comment,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        listing: {
          connect: {
            id: listId,
          },
        },
      },
    });

    return NextResponse.json({
      status: 'success',
      data: review,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 'error',
      error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
    });
  }
}
