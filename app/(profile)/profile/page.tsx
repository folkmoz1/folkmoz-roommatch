'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import heroTower from '@/public/images/hero-tower.svg';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateProfile } from '@/lib/db/user.actions';
import { useStore } from '@/lib/zustand/store';
import { useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useFormStatus } from 'react-dom';
import { PageLoading } from '@/components/PageLoading';

export default function ProfilePage() {
  const profile = useStore((state) => state.profile);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('focus', (e) => {
        if (e.target instanceof HTMLInputElement) {
          e.target.select();
        }
      });
    });
  }, [profile]);

  return (
    <>
      <main className={'pb-10 relative min-h-screen'}>
        {profile ? (
          <>
            <div className="relative z-[1]">
              <section>
                <div
                  className={
                    'flex justify-center items-center w-full bg-[--neutral-200] h-[400px] relative'
                  }
                >
                  <div
                    className="absolute inset-0 flex justify-center items-center z-0 opacity-40"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1590005354167-6da97870c757?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8ZnJ1aXR8fHx8fHwxNzAxOTczNzU3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </div>
              </section>

              <div>
                <div
                  className={
                    'max-w-screen-lg w-full mx-auto px-4 bg-white min-h-screen space-y-8'
                  }
                >
                  <div className={'flex justify-center -mt-28'}>
                    <Avatar className={'h-52 w-52'}>
                      <AvatarImage
                        src={profile?.image ?? '/images/avatar.jpg'}
                        className={'shadow-lg'}
                      />
                    </Avatar>
                  </div>
                  <div className={'flex flex-col items-center'}>
                    <div className={'text-head-1 mt-4'}>{profile?.name}</div>
                    <div>
                      <Badge variant={'outline'} className={'text-sm'}>
                        {' '}
                        {profile.provider === 'LINE'
                          ? profile.provider
                          : 'Email'}
                      </Badge>
                    </div>
                  </div>

                  <div className={'flex max-w-lg mx-auto justify-center'}>
                    <form
                      className={'space-y-6'}
                      action={async (formData) => {
                        formData.append(
                          'address',
                          textareaRef.current?.value || ''
                        );
                        const status = await updateProfile(formData);
                        if (status === 'success') {
                          toast({
                            title: 'อัพเดทข้อมูลสำเร็จ',
                            description: 'ข้อมูลของท่านได้รับการอัพเดทแล้ว',
                            variant: 'default',
                            duration: 3000,
                          });
                        } else if (status === 'duplicate') {
                          toast({
                            title: 'อัพเดทข้อมูลไม่สำเร็จ',
                            description:
                              'Email หรือเบอร์โทรศัพท์นี้มีผู้ใช้งานแล้ว',
                            variant: 'destructive',
                            duration: 3000,
                          });
                        } else {
                          toast({
                            title: 'อัพเดทข้อมูลไม่สำเร็จ',
                            description: 'กรุณาลองใหม่อีกครั้ง',
                            variant: 'destructive',
                            duration: 3000,
                          });
                        }
                      }}
                    >
                      <div className={'w-full flex gap-4'}>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="firstName">ชื่อ</Label>
                          <Input
                            type="text"
                            name={'firstName'}
                            id="firstName"
                            placeholder="เพิ่มข้อมูลชื่อจริงของท่าน"
                            defaultValue={profile?.firstName || ''}
                          />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="lastName">นามสกุล</Label>
                          <Input
                            type="text"
                            id="lastName"
                            name={'lastName'}
                            placeholder="เพิ่มข้อมูลนามสกุลของท่าน"
                            defaultValue={profile?.lastName || ''}
                          />
                        </div>
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="phone_number">เบอร์โทรศัพท์</Label>
                        <Input
                          type="tel"
                          name={'phone_number'}
                          id="phone_number"
                          placeholder="เบอร์โทรศัพท์"
                          defaultValue={profile?.phone_number || ''}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">อีเมล</Label>
                        <Input
                          name={'email'}
                          type="email"
                          id="email"
                          placeholder="Email"
                          defaultValue={profile?.email || ''}
                        />
                      </div>

                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="address">ที่อยู่</Label>
                        <Textarea
                          id={'address'}
                          name={'address'}
                          ref={textareaRef}
                          defaultValue={profile?.address || ''}
                        />
                      </div>

                      <div className={'flex justify-end w-full mt-12'}>
                        <SubmitButton />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PageLoading />
        )}

        <Image
          loading={'eager'}
          src={heroTower}
          alt={'hero'}
          quality={100}
          fill
          sizes={'100vw'}
          className={'object-cover absolute bottom-0 opacity-10 z-0'}
        />
      </main>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={'action'}
      disabled={pending}
      aria-disabled={pending}
      type={'submit'}
    >
      <span>บันทึกข้อมูล</span>
    </Button>
  );
};
