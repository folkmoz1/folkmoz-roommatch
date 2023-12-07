'use client';
import { Session } from '@/types/next-auth';
import Image from 'next/image';
import { Bell, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { NewAnnouncementButton } from '@/components/Header/actions';

export const MenuWithAuth = ({ session }: { session: Session }) => {
  return (
    <>
      <div className={'flex items-center gap-2.5'}>
        <div className={'flex items-center gap-2.5'}>
          <DropdownMenu>
            <DropdownMenuTrigger className={'outline-none'}>
              <div className={'p-2 w-[56px] h-[56px]'}>
                <Image
                  src={session?.user?.image || '/images/avatar.jpg'}
                  alt={'Avatar'}
                  width={56}
                  height={56}
                  className={'rounded-full'}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-56'}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className={'bg-neutral-200'} />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className={'mr-2'} size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className={'hidden sm:block'}>
            <NewAnnouncementButton />
          </span>
        </div>
      </div>
    </>
  );
};
