import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getFavorites } from '@/lib/db/favorite.queries';
import { removeFromFavorite } from '@/lib/db/user.actions';

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

export async function DELETE(req: NextRequest) {
  const session = await auth();
  const body = await req.json();

  const { favId } = body;

  if (!favId) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Missing favId',
      },
      { status: 400 }
    );
  }

  if (!session) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Not authenticated',
      },
      { status: 401 }
    );
  }

  const { user } = session;

  try {
    const favorites = await removeFromFavorite(favId, user.id);

    return new Response('ok');
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: err.message,
    });
  }
}
