export default function RoomEntriesLoading() {
  return (
    <>
      <div
        className={
          'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 animate-pulse gap-x-6 mx-auto gap-y-6'
        }
      >
        {[...Array(4)].map((_, i) => (
          <div
            className={
              'space-y-2 shadow-lg rounded-lg overflow-hidden max-w-[306px]'
            }
            key={i}
          >
            <div className={'h-[153px] bg-gray-300 rounded'} />
            <div className={'p-2 space-y-2'}>
              <div className={'h-4 bg-gray-300 rounded w-3/4'} />
              <div className={'h-2 bg-gray-300 rounded w-1/2'} />
              <div className={'flex gap-2 items-center'}>
                <div className={'h-8 bg-gray-300 rounded-full w-8'} />
                <div className={'h-2 bg-gray-300 rounded w-1/2'} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
