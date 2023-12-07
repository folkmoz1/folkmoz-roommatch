import { Map } from 'lucide-react';

export const SearchBar = () => {
  return (
    <>
      <div
        role={'searchbox'}
        className={
          'hidden sm:block w-full md:w-[500px] px-8 py-3 font-kanit bg-[--neutral-50] rounded-full transition-colors hover:opacity-[0.85]'
        }
      >
        <div className={'flex items-center justify-between'}>
          <div className={'text-head-3 font-normal text-[--neutral-400]'}>
            กรอกชื่อรถไฟฟ้า / ชื่อโครงการ
          </div>
          <Map size={32} className={'text-[--neutral-1000]'} />
        </div>
      </div>
    </>
  );
};
