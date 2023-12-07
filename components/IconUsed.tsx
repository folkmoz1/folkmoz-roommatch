import React from 'react';
import { CondoIcon } from '@/components/icons/condo';
import { HouseIcon } from '@/components/icons/house';
import DormitoryIcon from '@/components/icons/dormitory';

export const IconUsed: React.FC<{ type: string; size?: number }> = ({
  type,
  size = 24,
}) => {
  switch (type) {
    case 'Condominium':
      return (
        <CondoIcon size={size} color={''} pathClass={'fill-[--neutral-1000]'} />
      );
    case 'House':
      return (
        <HouseIcon size={size} color={''} pathClass={'fill-[--neutral-1000]'} />
      );
    case 'Dormitory':
      return (
        <DormitoryIcon
          size={size}
          color={''}
          pathClass={'fill-[--neutral-1000]'}
        />
      );
    default:
      return (
        <CondoIcon size={size} color={''} pathClass={'fill-[--neutral-1000]'} />
      );
  }
};
