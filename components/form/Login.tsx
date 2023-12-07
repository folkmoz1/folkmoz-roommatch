import { TextBox } from '@/components/TextBox';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { formLoginSchema } from '@/lib/formValidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    mode: 'all',
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { errors, isDirty, isValid } = form.formState;

  const onSubmit = (data: z.infer<typeof formLoginSchema>) => {
    startTransition(() => {
      signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      }).then((result) => {
        if (!result || !result.ok) {
          form.setError('password', {
            type: 'manual',
            message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
          });

          toast({
            title: 'เกิดข้อผิดพลาด',
            description: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง, กรุณาลองใหม่อีกครั้ง',
            variant: 'destructive',
            duration: 5000,
          });

          form.setValue('password', '');
          form.setFocus('password');
        }

        if (result && result.ok) {
          window.location.reload();
        }
      });
    });
  };

  useEffect(() => {
    form.setFocus('email');
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'space-y-2'}>
            <FormField
              render={({ field }) => (
                <TextBox label={'อีเมล'} {...field} error={errors?.email} />
              )}
              name={'email'}
            />
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
            <div className={'text-end text-sm text-primary'}>
              <span role={'button'}>ลืมรหัสผ่าน</span>
            </div>
            <div className={'mt-10'}>
              <Button
                disabled={!isDirty || !isValid || isPending}
                variant={'action'}
                size={'lg'}
                className={'text-xl w-full'}
              >
                เข้าสู่ระบบ
              </Button>
              <div className={'my-4 text-muted text-center'}>หรือ</div>
              <Button
                type={'button'}
                variant={'none'}
                size={'lg'}
                className={'text-white bg-line w-full text-xl'}
                onClick={() => signIn('line')}
              >
                <div className={'flex items-center justify-center space-x-2'}>
                  <Image
                    width={32}
                    height={32}
                    src={'/images/icons/line.svg'}
                    alt={'line'}
                  />
                  <span>เข้าสู่ระบบด้วย Line</span>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
