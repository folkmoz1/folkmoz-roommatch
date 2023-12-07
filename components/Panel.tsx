import { HomeAllIcon } from '@/components/icons/homeAll';
import { CondoIcon } from '@/components/icons/condo';
import { HouseIcon } from '@/components/icons/house';
import DormitoryIcon from '@/components/icons/dormitory';
import { Fragment } from 'react';

const panelList = [
  {
    title: 'ทั้งหมด',
    icon: (
      <HomeAllIcon
        size={48}
        color={'none'}
        pathClass={'group-hover:fill-primary-700'}
      />
    ),
  },
  {
    title: 'คอนโด',
    icon: (
      <CondoIcon
        size={48}
        color={'none'}
        pathClass={'group-hover:fill-primary-700'}
      />
    ),
  },
  {
    title: 'บ้านพัก',
    icon: (
      <HouseIcon
        size={48}
        color={'none'}
        pathClass={'group-hover:fill-primary-700'}
      />
    ),
  },
  {
    title: 'หอพัก',
    icon: (
      <DormitoryIcon
        size={48}
        color={'none'}
        pathClass={'group-hover:fill-primary-700'}
      />
    ),
  },
];

export const Panel = ({}) => {
  return (
    <>
      <div className={'px-4'}>
        <div
          className={
            'max-w-[856px] w-full h-[150px] flex py-8 px-6 justify-evenly text-head-3 font-kanit bg-white rounded-3xl shadow-md mx-auto -mt-[75px] z-10 relative'
          }
        >
          {panelList.map((panel, index) => (
            <Fragment key={panel.title}>
              <div
                className={
                  'flex flex-col justify-evenly items-center gap-2 cursor-pointer group h-[86px] flex-1'
                }
              >
                <div
                  className={
                    'w-[48px] h-[48px] group-hover:scale-110 transform transition-all'
                  }
                >
                  {panel.icon}
                </div>
                <span className={'text-sm font-medium'}>{panel.title}</span>
              </div>
              {index !== panelList.length - 1 && (
                <>
                  <div className={'flex items-center'}>
                    <div
                      className={
                        'w-1 rounded-[2px] h-[56px] bg-[--neutral-100]'
                      }
                    />
                  </div>
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
