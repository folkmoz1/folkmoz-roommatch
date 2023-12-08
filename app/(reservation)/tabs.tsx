'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const tabs = [
  {
    label: 'รายการ',
    href: '',
  },
  {
    label: 'ประวัติ',
    href: 'history',
  },
  {
    label: 'ประกาศ',
    href: 'announcement',
  },
];

const TabItem = ({
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
          href={href === '' ? `/reservation` : `/reservation?tab=${href}`}
          className={cn('px-4 md:px-6 py-2 relative text-xl', {
            'text-black': active,
            'text-muted': !active,
          })}
        >
          {name}
          {active && (
            <motion.div
              initial={false}
              layoutId={'tab-underline'}
              className={
                'w-full h-[2px] rounded-full bg-black absolute bottom-0 left-0 right-0'
              }
              transition={{ type: 'spring', duration: 0.8 }}
            />
          )}
        </Link>
      </div>
    </>
  );
};

export const Tabs = () => {
  const searchParams = useSearchParams();

  const tabActive = searchParams.get('tab');

  useEffect(() => {
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }, [tabActive]);

  return (
    <>
      <div className={'flex w-full justify-between sm:w-auto md:gap-20'}>
        {tabs.map((tab, index) => {
          return (
            <TabItem
              key={index}
              name={tab.label}
              href={tab.href}
              active={
                tabActive === tab.href || (tabActive === null && index === 0)
              }
            />
          );
        })}
      </div>
    </>
  );
};
