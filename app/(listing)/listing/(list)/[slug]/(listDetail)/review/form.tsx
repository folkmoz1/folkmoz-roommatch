'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { deleteReviewById, saveNewReview } from '@/lib/db/review.actions';
import { Button } from '@/components/ui/button';
import Rating from 'react-rating';
import { Flag, MoreHorizontal, Star, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ReviewInputForm = ({ listingSlug }: { listingSlug: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 700, behavior: 'smooth' });
  };

  return (
    <>
      <form
        className={'w-full'}
        ref={formRef}
        action={async (formData) => {
          if (!rating) return;
          formData.append('rating', rating.toString());
          await saveNewReview(formData);
          formRef.current?.reset();
          scrollToTop();
          setRating(0);
        }}
      >
        <div>
          {/*@ts-ignore*/}
          <Rating
            initialRating={rating}
            emptySymbol={<Star strokeWidth={2} color={'#FFAD33'} size={20} />}
            fullSymbol={
              <Star
                strokeWidth={2}
                color={'#FFAD33'}
                size={20}
                fill={'#FFAD33'}
              />
            }
            onChange={handleRating}
          />
        </div>
        <input type={'hidden'} name={'listingSlug'} value={listingSlug} />
        <input
          autoComplete={'off'}
          required
          className={
            'px-4 py-4 bg-[--neutral-100] w-full rounded-lg mb-4 font-kanit'
          }
          name={'comment'}
          placeholder={'เขียนความคิดเห็น'}
        />
        <SubmitButton />
      </form>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <div className={'flex justify-end'}>
        <Button disabled={pending}>
          <span className={'font-kanit'}>แสดงความคิดเห็น</span>
        </Button>
      </div>
    </>
  );
};

export const DeleteForm = ({
  reviewId,
  isOwner = false,
}: {
  reviewId: string;
  isOwner: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pending } = useFormStatus();
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger className={'outline-none'}>
            <MoreHorizontal
              size={20}
              className={
                'opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              }
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isOwner ? (
              <>
                {' '}
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <Trash className={'mr-2 h-4 w-4'} color={'red'} />
                    <span className={'text-destructive'}>Delete</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </>
            ) : (
              <>
                <DropdownMenuItem>
                  <Flag className={'mr-2 h-4 w-4'} />
                  <span>Report</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-[425px]">
          <form
            action={async () => {
              await deleteReviewById(reviewId);
              setIsOpen(false);
            }}
          >
            <DialogHeader>
              <DialogTitle className={'font-kanit font-medium'}>
                ต้องการที่จะลบรีวิวนี้หรือไม่
              </DialogTitle>
              <DialogDescription>
                คุณต้องการที่จะลบรีวิวนี้หรือไม่ หากลบแล้วจะไม่สามารถกู้คืนได้
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className={'mt-4'}>
              <Button variant={'destructive'} disabled={pending} type="submit">
                {pending ? (
                  <>
                    <div className="w-6 h-6 border-2 border-t-[3px] border-white rounded-full animate-spin"></div>
                    <span className={'ml-2 font-kanit'}>กำลังลบ</span>
                  </>
                ) : (
                  'ยืนยัน'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
