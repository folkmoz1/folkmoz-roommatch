'use client';

import { ModalProvider } from '@/components/context/modal';
import { SessionProvider } from 'next-auth/react';
import { ProfileProvider } from '@/components/context/profile';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <ProfileProvider>
          <ModalProvider>{children}</ModalProvider>
        </ProfileProvider>
      </SessionProvider>
    </>
  );
}
