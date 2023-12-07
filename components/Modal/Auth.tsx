'use client';

import { Button } from '@/components/ui/button';
import LogoBrand from '@/components/Logo';
import { useModal } from '@/components/context/modal';
import { useState } from 'react';
import Image from 'next/image';
import { RegisterForm } from '@/components/form/Register';
import { LoginForm } from '@/components/form/Login';

export default function AuthModal() {
  const [page, setPage] = useState<'login' | 'register'>('login');
  const { closeModal } = useModal();

  const changePage = () => {
    setPage(page === 'login' ? 'register' : 'login');
  };

  return (
    <>
      <div
        className={
          'w-full bg-white rounded-3xl grid grid-cols-[416px_1fr] overflow-hidden shadow-xl absolute min-h-[738px] max-w-[1076px]'
        }
      >
        <div className={'bg-[--neutral-100] hidden relative z-10 md:block'}>
          <div className={'pt-[7.5rem] px-6 flex flex-col items-center'}>
            <div className={'flex space-x-2'}>
              <LogoBrand />
            </div>
            <div className={'font-kanit text-center'}>
              <h2 className={'text-head-1 mt-4'}>ยินดีต้อนรับ</h2>
              <p className={'text-[--neutral-400]'}>
                ยินดีต้อนรับสู่ที่พักที่เตรียมไว้เพื่อคุณ
                <br />
                เราหวังว่าคุณจะพบที่พักที่เหมาะกับความต้องการ
              </p>
            </div>
            <Button
              variant={'outline'}
              className={'mt-8 text-primary-700 font-bold relative z-[1]'}
              onClick={changePage}
            >
              {page === 'login' ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
            </Button>
            <div className={'absolute bottom-0 left-0 right-0'}>
              <Image
                src={'/images/hero-tower.svg'}
                alt={'Hero'}
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
        <div className={'pt-12 pb-12 px-8 lg:px-[7.625rem] font-kanit'}>
          <div>
            <div className={'flex flex-col w-full h-full'}>
              <div className={'mt-4'}>
                <h2 className={'text-head-1 text-center'}>
                  {page === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
                </h2>
              </div>
              <div className={'mt-8'}>
                {page === 'login' ? (
                  <LoginForm />
                ) : (
                  <RegisterForm changePage={changePage} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
