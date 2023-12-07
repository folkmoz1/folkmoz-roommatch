import { Button } from '@/components/ui/button';
import { useModal } from '@/components/context/modal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const NewAnnouncementButton = () => {
  const { openModal } = useModal();
  const router = useRouter();

  const { data } = useSession();

  const onClick = () => {
    if (!data) {
      openModal('auth');
      return;
    }
    router.push('/listing/new');
  };

  return (
    <>
      <Button
        onClick={onClick}
        variant={'action'}
        className={'hidden sm:block text-xl'}
      >
        สร้างประกาศ
      </Button>
    </>
  );
};
