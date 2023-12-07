import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { getUserById } from '@/lib/db/user.queries';

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({});
  }

  try {
    const { user } = session;

    const profile = await getUserById(user.id);

    return NextResponse.json({
      profile,
      status: 'success',
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
}
