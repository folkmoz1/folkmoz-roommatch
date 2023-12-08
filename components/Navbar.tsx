'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useModal } from '@/components/context/modal';

const links = [
  {
    name: 'หน้าแรก',
    href: '/',
  },
  {
    name: 'การจอง',
    href: '/reservation',
  },
  {
    name: 'รายการโปรด',
    href: '/favorite',
  },
  {
    name: 'ติดต่อเรา',
    href: '/contact',
  },
];

const LinkItem = ({
  name,
  href,
  active,
}: {
  name: string;
  href: string;
  active: boolean;
}) => {
  return (
    <>
      <div>
        <Link
          href={href}
          className={cn('px-4 py-2 relative', {
            'text-black': active,
            'text-muted': !active,
          })}
        >
          {name}
          {active && (
            <motion.div
              initial={false}
              // layoutId={'link-underline'}
              className={
                'w-full h-1 rounded-full bg-black absolute bottom-0 left-0 right-0'
              }
              transition={{ type: 'spring', duration: 0.8 }}
            />
          )}
        </Link>
      </div>
    </>
  );
};

export const Navbar = () => {
  const currentPath = usePathname();
  const { openModal } = useModal();

  return (
    <>
      <div
        className={'hidden lg:flex justify-center gap-2.5 text-xl font-kanit'}
      >
        {links.map((link) => (
          <LinkItem
            key={link.name}
            name={link.name}
            href={link.href}
            active={currentPath === link.href}
          />
        ))}
      </div>
    </>
  );
};
