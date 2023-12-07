export const GlobalLoading = () => {
  return (
    <>
      <div className={'fixed inset-0 bg-black bg-opacity-50 z-[100]'}>
        <div className={'absolute top-1/2 left-1/2'}>
          <div className={'flex items-center gap-2'}>
            <div className={'animate-spin rounded-full h-8 w-8 border-t-2'} />
            <div className={'text-white'}>กำลังอัพโหลด</div>
          </div>
        </div>
      </div>
    </>
  );
};
