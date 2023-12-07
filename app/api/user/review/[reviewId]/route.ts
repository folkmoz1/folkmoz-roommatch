import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { deleteReviewById } from '@/lib/db/review.actions';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  const { reviewId } = params;
  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      body: 'Unauthorized',
    });
  }

  const isDeleted = await deleteReviewById(reviewId, session.user.id);

  if (!isDeleted) {
    return NextResponse.json({
      status: 400,
      body: 'Bad Request',
    });
  }

  return new Response('ok');
}
