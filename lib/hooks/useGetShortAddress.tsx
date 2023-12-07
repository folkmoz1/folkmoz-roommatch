import { useEffect, useState } from 'react';
import { AddressComponent } from '@prisma/client';

export const useGetShortAddress = (address_components: AddressComponent[]) => {
  const [shortAddress, setShortAddress] = useState('');

  useEffect(() => {
    const getAddress = () => {
      {
        if (address_components.length === 0) return '';

        const level1 = address_components.find(
          (add) => add.types![0] === 'administrative_area_level_1'
        );
        const level2 = address_components.find(
          (add) => add.types![0] === 'administrative_area_level_2'
        );
        const shrtAdd = `${level2?.short_name} ${level1?.short_name} `;
        setShortAddress(shrtAdd);
      }
    };
    getAddress();
  }, [address_components]);

  return shortAddress;
};
