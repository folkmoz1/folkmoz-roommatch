import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getFavorites } from '@/lib/db/favorite.queries';

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({});
  }

  const { user } = session;

  try {
    const favorites = await getFavorites(user.id);

    return NextResponse.json({
      status: 'success',
      data: favorites,
    });
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: err.message,
    });
  }
}
