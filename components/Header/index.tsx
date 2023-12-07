import Link from 'next/link';
import LogoBrand from '@/components/Logo';
import { auth } from '@/auth';
import { Navbar } from '@/components/Navbar';
import { MenuWithAuth } from '@/components/Header/menuWithAuth';
import { MenuWithoutAuth } from '@/components/Header/menuWithoutAuth';

export default async function Header() {
  const session = await auth();

  return (
    <>
      <header
        className={
          'min-h-[120px] sticky top-0 z-[20] flex flex-col justify-center bg-white shadow'
        }
      >
        <div
          className={'w-full flex justify-center max-w-[1296px] mx-auto px-4'}
        >
          <div
            className={'flex items-center w-full justify-between select-none'}
          >
            <div>
              <Link
                href={'/'}
                className={'flex items-center space-x-2 cursor-pointer'}
              >
                <LogoBrand />
              </Link>
            </div>
            <div>
              <Navbar />
            </div>
            <div className={'font-kanit flex'}>
              {session && session.user ? (
                <MenuWithAuth session={session} />
              ) : (
                <MenuWithoutAuth />
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

Header.displayName = 'Header';
