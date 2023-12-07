import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { providerId } = await req.json();

  if (!providerId) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'providerId is required',
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      providerId,
    },
  });

  if (!user) {
    return NextResponse.json(
      { user: false, status: 'success' },
      { status: 200 }
    );
  }

  return NextResponse.json({ user: true, status: 'success' }, { status: 200 });
}
