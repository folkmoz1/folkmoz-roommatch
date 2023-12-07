import { Button } from '@/components/ui/button';
import { TextBox } from '@/components/TextBox';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formRegisterSchema } from '@/lib/formValidate';
import { Form, FormField } from '@/components/ui/form';
import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { createNewUser } from '@/lib/actions';
import { useToast } from '@/components/ui/use-toast';

export const RegisterForm = ({ changePage }: { changePage: () => void }) => {
  const [isPending, startTransition] = useTransition();
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formRegisterSchema>>({
    mode: 'all',
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: '',
    },
  });

  const { errors, isDirty, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formRegisterSchema>) => {
    if (!acceptTerms) {
      return;
    }

    startTransition(() => {
      createNewUser(data).then((result) => {
        if (result.status === 'error') {
          Object.keys(result.errors).map((key) => {
            form.setError(key as any, {
              type: 'manual',
              message: result.errors[key],
            });
          });

          toast({
            variant: 'destructive',
            title: 'เกิดข้อผิดพลาด',
            description: 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
            duration: 4000,
          });
        } else if (result.status === 'success') {
          toast({
            variant: 'default',
            title: 'สมัครสมาชิกสำเร็จ',
            duration: 4000,
          });

          form.reset();
          changePage();
        }
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div className={'space-y-2'}>
            <FormField
              render={({ field }) => (
                <TextBox
                  label={'ชื่อ-นามสกุล'}
                  {...field}
                  error={errors?.fullName}
                />
              )}
              name={'fullName'}
            />

            <FormField
              render={({ field }) => (
                <TextBox label={'อีเมล'} {...field} error={errors?.email} />
              )}
              name={'email'}
            />

            <div className={'flex gap-2'}>
              <FormField
                render={({ field }) => (
                  <TextBox
                    label={'รหัสผ่าน'}
                    type={'password'}
                    passwordWithIcon
                    error={errors?.password}
                    {...field}
                  />
                )}
                name={'password'}
              />
              <FormField
                render={({ field }) => (
                  <TextBox
                    label={'ยืนยันรหัสผ่าน'}
                    placeholder={'กรอกรหัสผ่านอีกครั้ง'}
                    type={'password'}
                    passwordWithIcon
                    error={errors?.passwordConfirmation}
                    {...field}
                  />
                )}
                name={'passwordConfirmation'}
              />
            </div>

            <FormField
              render={({ field }) => (
                <TextBox
                  label={'เบอร์โทรศัพท์'}
                  {...field}
                  error={errors?.phoneNumber}
                />
              )}
              name={'phoneNumber'}
            />
            <div className={'mt-3 flex items-center'}>
              <input
                onClick={() => setAcceptTerms(!acceptTerms)}
                type="checkbox"
                className={
                  'w-5 h-5 border border-[#D5D9D7"] rounded-md focus:outline-none focus:border-black'
                }
                id={'acceptTerms'}
                name={'acceptTerms'}
              />

              <label
                htmlFor="acceptTerms"
                className={'ml-2 text-sm text-[--neutral-400]'}
              >
                ยอมรับเงื่อนไข{' '}
                <span className={'text-primary hover:underline'}>
                  ข้อตกลงการใช้งาน
                </span>{' '}
                และ{' '}
                <span className={'text-primary hover:underline'}>
                  นโยบายความเป็นส่วนตัว
                </span>
              </label>
            </div>
          </motion.div>
          <div className={'mt-10'}>
            <Button
              disabled={!isDirty || !isValid || isPending || !acceptTerms}
              variant={'action'}
              size={'lg'}
              className={'text-xl w-full'}
            >
              สมัครสมาชิก
            </Button>
            <div className={'my-4 text-muted text-center'}>หรือ</div>
            <Button
              variant={'none'}
              size={'lg'}
              className={'text-white bg-line w-full text-xl'}
            >
              <div className={'flex items-center justify-center space-x-2'}>
                <Image
                  width={32}
                  height={32}
                  src={'/images/icons/line.svg'}
                  alt={'line'}
                />
                <span>ลงทะเบียนด้วย Line</span>
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
