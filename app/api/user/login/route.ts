import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { validateSignInInput } from '@/lib/serverValidate';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { errors, valid } = validateSignInInput(body);

  if (!valid) {
    return NextResponse.json({
      status: 'error',
      errors,
    });
  }

  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone_number: true,
      image: true,
      password: true,
      provider: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      status: 'error',
      errors: {
        email: 'ไม่พบอีเมล์นี้ในระบบ',
      },
    });
  }

  const comparePassword = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!comparePassword) {
    return NextResponse.json({
      status: 'error',
      errors: {
        password: 'รหัสผ่านไม่ถูกต้อง',
      },
    });
  }

  if (user.password) {
    delete user['password'];
  }

  return NextResponse.json({
    status: 'success',
    user,
  });
}
