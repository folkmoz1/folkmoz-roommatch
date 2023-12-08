import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function middleware(req) {
  const { origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.redirect(origin);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/reservation', '/profile'],
};
