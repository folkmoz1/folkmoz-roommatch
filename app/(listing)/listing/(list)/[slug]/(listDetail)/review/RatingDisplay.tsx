import { Star } from 'lucide-react';

type RatingDisplayProps = {
  allReviews: number;
  overallRating: number;
  overallRatingRounded: number;
  overallRatingInPercentage: number;
  progress: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
};
export const RatingDisplay = ({
  rating,
}: {
  rating: RatingDisplayProps | null;
}) => {
  const isRounded = rating?.overallRatingRounded === rating?.overallRating;

  const isHalf = rating?.overallRatingRounded !== rating?.overallRating;

  return (
    <>
      <div className={'flex flex-col sm:flex-row gap-8'}>
        <div>
          <div className={'font-light text-muted font-kanit'}>
            เรตติ้งโดยรวม
          </div>
          <div className={'flex gap-8'}>
            <div className={'text-[64px]  font-sans font-semibold'}>
              {rating ? rating?.overallRating : 0}
            </div>
            <div className={'flex flex-col justify-center gap-1'}>
              <div className={'flex gap-1'}>
                {rating && (
                  <>
                    {[...Array(Math.floor(rating?.overallRatingRounded))].map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={'#FFAD33'}
                          color={'#FFAD33'}
                          strokeWidth={2}
                        />
                      )
                    )}
                    {isHalf && (
                      <Star
                        size={16}
                        fill={'#FFAD33'}
                        color={'#FFAD33'}
                        strokeWidth={2}
                        style={{ clipPath: 'inset(0 50% 0 0)' }}
                      />
                    )}
                  </>
                )}
              </div>
              <div>
                <span className={'text-muted font-kanit font-light'}>
                  {rating ? (
                    <> ทั้งหมด {rating?.allReviews} รีวิว</>
                  ) : (
                    <> ยังไม่มีรีวิวในขณะนี้ </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {[...Array(5)].map((_, i) => (
            <div className={'flex gap-4 items-center'} key={i}>
              <div
                className={'w-10 text-right font-kanit font-light text-muted'}
              >
                {5 - i} ดาว
              </div>
              <div className={'w-[200px] h-2 bg-gray-200 rounded-full'}>
                <div
                  className={'h-2 bg-[#FFAD33] rounded-full'}
                  style={{ width: `${rating?.progress[5 - i] ?? 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
