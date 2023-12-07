import { Review } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import dayjs from '@/lib/dayjs';
import { auth } from '@/auth';
import { DeleteForm } from '@/app/(listing)/listing/(list)/[slug]/review/form';

type ReviewItemProps = {
  review: Review & {
    user: { id: string; name: string; image: string };
  };
};

export const ReviewItem = async ({ review }: ReviewItemProps) => {
  const { user, comment, rating } = review;
  const session = await auth();

  const timeFromNow = dayjs(review.createdAt)
    .tz('Asia/Bangkok', true)
    .fromNow();

  const isOwner = session?.user ? session.user.id === user.id : false;

  return (
    <>
      <div className={'grid grid-cols-[40px_1fr_auto] gap-x-2 group'}>
        <div>
          <Avatar>
            <AvatarImage
              className={'w-10 h-10'}
              src={user.image || '/images/avatar.jpg'}
              alt={user.name}
            />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className={'space-y-1'}>
          <div className={'text-head-3 font-sans'}>{user.name}</div>
          <div className={'flex gap-0.5'}>
            {Array.from(Array(rating), (_, i) => (
              <Star
                size={16}
                fill={'#FFAD33'}
                color={'#FFAD33'}
                strokeWidth={2}
                key={i}
              />
            ))}
          </div>
          <div className={'text-body-1 font-light font-kanit'}>{comment}</div>
        </div>
        <div className={'flex flex-col gap-2 justify-between items-end'}>
          <DeleteForm reviewId={review.id} isOwner={isOwner} />
          <div className={'text-sm text-muted font-kanit font-light'}>
            {timeFromNow}
          </div>
        </div>
      </div>
    </>
  );
};

ReviewItem.displayName = 'ReviewItem';
