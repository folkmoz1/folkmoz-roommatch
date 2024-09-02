import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AuthModal from '@/components/Modal/Auth';
import { createPortal } from 'react-dom';
import AnnouncementModal from '@/components/Modal/Announcement';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useFormCreatePlaceStore } from '@/lib/zustand/store';
import { GlobalLoading } from '@/components/Modal/Loading';

export const ModalContext = createContext<{
  modal: string | null;
  setModal: (modal: string | null) => void;
}>({
  modal: null,
  setModal: () => {},
});

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalContent = ({ modal }: { modal: React.ReactNode }) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const pathname = usePathname();
  const { data } = useSession();
  const {
    form: { global },
  } = useFormCreatePlaceStore((state) => state);

  const content = (
    <div className={'fixed z-50 inset-0 flex justify-center items-center'}>
      <div
        className={'absolute w-full h-full bg-black/25'}
        onClick={() => {
          if (global.loading) return;
          if (pathname === '/listing/new' && !data?.user) {
            router.push('/');
          }
          closeModal();
        }}
      ></div>
      {modal}
    </div>
  );

  return createPortal(content, document.body);
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<string | null>(null);
  const globalLoading = useFormCreatePlaceStore(
    (state) => state.form.global.loading
  );

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
  }, [modal]);

  const displayModal = useCallback(() => {
    switch (modal) {
      case 'auth':
        return <AuthModal />;
      case 'announcement':
        return <AnnouncementModal />;
      case 'global-loading':
        return <GlobalLoading />;
      default:
        return null;
    }
  }, [modal]);

  useEffect(() => {
    if (globalLoading) {
      setModal('global-loading');
      console.log('global loading');
    } else {
      setModal(null);
    }
  }, [globalLoading]);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
      {modal && <ModalContent modal={displayModal()} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { modal, setModal } = useContext(ModalContext);

  const openModal = (modal: string) => setModal(modal);
  const closeModal = () => setModal(null);

  return { modal, openModal, closeModal };
};
