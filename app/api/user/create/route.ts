import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { validateSignUpInput } from '@/lib/serverValidate';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  const { valid, errors } = validateSignUpInput(body);

  if (!valid) {
    return NextResponse.json({
      status: 'error',
      errors,
    });
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userExist) {
    return NextResponse.json({
      status: 'error',
      errors: {
        email: 'อีเมล์นี้มีผู้ใช้งานแล้ว',
      },
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);
  const name = body.fullName.split(' ');

  const user = await prisma.user.create({
    data: {
      name: body.fullName,
      firstName: name[0],
      lastName: name[1],
      email: body.email,
      password: hashPassword,
      phone_number: body.phoneNumber,
      provider: 'Credentials',
      permissions: {
        create: {
          can_book: true,
          can_add_room: false,
        },
      },
    },
    include: {
      permissions: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      status: 'error',
      errors: {
        email: 'เกิดข้อผิดพลาดในการสมัครสมาชิก, โปรดลองใหม่ในภายหลัง',
      },
    });
  }

  return NextResponse.json({
    status: 'success',
    ...user,
  });
}
