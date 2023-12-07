import { cn } from '@/lib/utils';

export default function LogoBrand({
  logo = 'colorful',
}: {
  logo?: 'colorful' | 'white';
}) {
  const logoSrc = {
    colorful: '/images/logo-colorful.svg',
    white: '/images/logo-white.svg',
  };

  return (
    <>
      <img
        src={logoSrc[logo]}
        alt={'logo'}
        width={68}
        height={55}
        className={'w-[48px] sm:w-[68px] sm:h-[55px]'}
      />
      <span
        className={cn('text-xl sm:text-[2rem] font-bold', {
          'text-white': logo === 'white',
          'text-primary': logo === 'colorful',
        })}
      >
        RoomMatch
      </span>
    </>
  );
}
