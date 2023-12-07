import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log(body);

  return new Response('ok', {
    status: 200,
  });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id)
    return new Response('name is required', {
      status: 400,
    });

  await prisma.user.delete({
    where: {
      id,
    },
    include: {
      permissions: true,
    },
  });

  return new Response('ok', {
    status: 200,
  });
}
