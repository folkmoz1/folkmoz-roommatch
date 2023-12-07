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
export const RatingDisplay = ({ rating }: { rating: RatingDisplayProps }) => {
  const isRounded = rating.overallRatingRounded % 1 === 0;

  return (
    <>
      <div className={'flex flex-col sm:flex-row gap-8'}>
        <div>
          <div className={'font-light text-muted font-kanit'}>
            เรตติ้งโดยรวม
          </div>
          <div className={'flex gap-8'}>
            <div className={'text-[64px]  font-sans font-semibold'}>
              {rating.overallRatingRounded}
            </div>
            <div className={'flex flex-col justify-center gap-1'}>
              <div className={'flex gap-1'}>
                {[...Array(Math.floor(rating.overallRatingRounded))].map(
                  (_, i) => (
                    <Star
                      size={16}
                      fill={'#FFAD33'}
                      color={'#FFAD33'}
                      strokeWidth={2}
                      key={i}
                    />
                  )
                )}
                {!isRounded && (
                  <Star
                    size={16}
                    fill={'#FFAD33'}
                    color={'#FFAD33'}
                    strokeWidth={2}
                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                  />
                )}
              </div>
              <div>
                <span className={'text-muted font-kanit font-light'}>
                  ทั้งหมด {rating.allReviews} รีวิว
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
                  style={{ width: `${rating.progress[5 - i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
