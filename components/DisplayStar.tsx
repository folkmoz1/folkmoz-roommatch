import { Star } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

export const DisplayStar = ({
  rating,
  size = 'text-sm',
}: {
  rating: number;
  size?: string;
}) => {
  return (
    <>
      <Star
        strokeWidth={2}
        color={'#FFAD33'}
        size={20}
        fill={rating > 0 ? '#FFAD33' : 'none'}
      />
      <span className={cn('font-kanit font-normal', size)}>
        {rating > 0 ? rating : 'ยังไม่มีรีวิว'}
      </span>
    </>
  );
};
