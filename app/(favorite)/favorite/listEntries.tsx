'use client';
import { useStore } from '@/lib/zustand/store';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';

export const FavoriteEntries = () => {
  const profile = useStore((state) => state.profile);

  const { isLoading, data, error } = useSWR('/api/user/favorite', fetcher);

  return <></>;
};
