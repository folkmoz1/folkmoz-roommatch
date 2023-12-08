'use client';
import { useSession } from 'next-auth/react';
import { useModal } from '@/components/context/modal';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import heroTower from '/public/images/hero-tower.svg';
import { StepperForm } from '@/components/form/Stepper';

export default function CreateListing() {
  const [mounted, setMounted] = useState(false);

  const { data: user, status } = useSession();
  const { openModal } = useModal();

  useEffect(() => {
    if (mounted) return;

    if (status !== 'loading') {
      if (!user) {
        openModal('auth');
      } else {
        // openModal('announcement');
      }
      setMounted(true);
    }
  }, [user]);

  return (
    <>
      <div className={'flex flex-col min-h-screen relative'}>
        <div
          className={
            'max-w-screen-xl w-full h-full px-8 relative z-[1] mx-auto bg-[--neutral-50] pt-8 pb-12 font-kanit font-semibold'
          }
        >
          <StepperForm />
        </div>
        <Image
          loading={'eager'}
          src={heroTower}
          alt={'hero'}
          quality={100}
          fill
          sizes={'100vw'}
          className={'object-cover absolute bottom-0 opacity-10'}
        />
      </div>
    </>
  );
}
