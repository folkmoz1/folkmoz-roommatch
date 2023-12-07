'use client';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/context/modal';
import { NewAnnouncementButton } from '@/components/Header/actions';
import { Session } from '@/types/next-auth';

export const MenuWithoutAuth = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button
        variant={'none'}
        className={'text-xl'}
        onClick={() => openModal('auth')}
      >
        เข้าสู่ระบบ
      </Button>
      <NewAnnouncementButton />
    </>
  );
};
