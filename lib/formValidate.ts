import * as z from 'zod';

export const formRegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(10, {
        message: 'ชื่อ-นามสกุล ต้องมีอย่างน้อย 10 ตัวอักษร',
      })
      .max(100)
      .regex(/^[a-zA-Zก-ฮ\s]+$/, {
        message: 'ชื่อ-นามสกุล ต้องเป็นตัวอักษรเท่านั้น',
      })
      .trim(),
    email: z.string().email('กรุณากรอกอีเมล์ให้ถูกต้อง'),
    password: z
      .string()
      .min(6, {
        message: 'รหัสผ่าน ต้องมีอย่างน้อย 6 ตัวอักษร',
      })
      .max(100, {
        message: 'รหัสผ่าน ต้องมีไม่เกิน 100 ตัวอักษร',
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@!%*#?&]{6,}$/, {
        message:
          'รหัสผ่าน ต้องมีตัวอักษรอย่างน้อย 1 ตัว และต้องมีตัวเลขอย่างน้อย 1 ตัว',
      }),
    passwordConfirmation: z
      .string()
      .min(1, 'กรุณากรอกรหัสผ่านอีกครั้ง')
      .max(100),
    phoneNumber: z
      .string()
      .min(10, {
        message: 'เบอร์โทรศัพท์ ต้องมีอย่างน้อย 10 ตัวอักษร',
      })
      .max(10, {
        message: 'เบอร์โทรศัพท์ ต้องมีไม่เกิน 10 ตัวอักษร',
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['passwordConfirmation'],
  });

export const formLoginSchema = z.object({
  email: z.string().email('กรุณากรอกอีเมล์ให้ถูกต้อง'),
  password: z.string().min(6, 'กรุณากรอกรหัสผ่านอีกครั้ง'),
});

export const stepperTitleSchema = z.object({
  placeType: z.string().min(1, 'กรุณาเลือกประเภทสถานที่'),
  placeName: z
    .string({
      required_error: 'กรุณาเลือกสถานที่',
    })
    .min(1, 'กรุณาเลือกสถานที่'),
  location: z.string().min(1, 'กรุณากรอกที่อยู่สถานที่'),
  headline: z.string().min(1, 'กรุณากรอกหัวข้อสถานที่'),
  description: z.string().min(1, 'กรุณากรอกรายละเอียดสถานที่'),
});

export const stepperDetailSchema = z.object({
  area: z
    .string()
    .min(2, 'กรุณากรอกขนาดพื้นที่')
    .regex(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข'),
  bedroom_count: z.string({ required_error: 'กรุณากรอกจำนวนห้องนอน' }),
  bathroom_count: z.string({ required_error: 'กรุณากรอกจำนวนห้องน้ำ' }),
  floor: z.string({ required_error: 'กรุณากรอกจำนวนชั้น' }),
  price: z
    .string()
    .min(1, 'กรุณากรอกราคา')
    .regex(/^[0-9]+$/, 'กรุณากรอกราคาที่ถูกต้อง'),
  mkt_price: z.string().regex(/^[0-9]+$/, 'กรุณากรอกราคาที่ถูกต้อง'),
});
