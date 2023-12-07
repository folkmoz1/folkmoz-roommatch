import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { useStore } from '@/lib/zustand/store';
import { Prisma, User } from '@prisma/client';
import { useState } from 'react';

type Profile = Prisma.UserGetPayload<{
  include: {
    favorites: true;
    bookings: true;
    listings: true;
    permissions: true;
  };
}>;

type ProfileResponse = {
  profile: Profile;
  status: string;
};

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const setUserProfile = useStore((state) => state.setProfile);
  const {} = useSWR<ProfileResponse, Error>(
    shouldFetch ? '/api/profile' : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (!data.profile) {
          setShouldFetch(false);
          return;
        }
        setUserProfile(data.profile);
      },
    }
  );

  return <>{children}</>;
};
