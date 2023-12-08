'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const tabs = [
  {
    label: 'รายการ',
    href: '',
  },
  {
    label: 'รายละเอียด',
    href: '/detail',
  },
  {
    label: 'รีวิว',
    href: '/review',
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
          href={href}
          className={cn('px-4 py-2 relative text-xl', {
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

export const Tabs = ({ slug }: { slug: string }) => {
  const currentPath = usePathname();

  const getActiveTab = () => {
    const currentTab = tabs.find((tab) => {
      return currentPath === `/listing/${slug}${tab.href}`;
    });
    if (currentTab) {
      return currentTab;
    }
    return tabs[0];
  };

  useEffect(() => {
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }, [currentPath]);

  return (
    <>
      <div className={'flex w-full justify-between sm:w-auto md:gap-12'}>
        {tabs.map((tab, index) => {
          return (
            <TabItem
              key={index}
              name={tab.label}
              href={`/listing/${slug}${tab.href}`}
              active={tab.label === getActiveTab().label}
            />
          );
        })}
      </div>
    </>
  );
};
