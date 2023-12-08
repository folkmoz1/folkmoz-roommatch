import Image from 'next/image';
import { Tabs } from '@/app/(reservation)/tabs';

export default function ReservationPageLayout({ children }) {
  return (
    <>
      <main>
        <section>
          <div
            className={
              'h-[400px] md:h-[600px] flex justify-center pt-20 md:pt-40 w-full bg-[--neutral-200] relative overflow-hidden'
            }
          >
            <div
              className={
                'max-w-screen-xl w-full px-8 flex justify-center md:justify-end relative z-[1]'
              }
            >
              <div
                className={
                  'text-[--neutral-1000] w-full md:w-fit font-kanit text-center font-semibold'
                }
              >
                <h2 className={'text-5xl sm:text-6xl text-primary'}>
                  โปรจองห้องพัก
                </h2>
                <div className={'mt-4'}>
                  <div className={'text-3xl'}>สุดคุ้ม จองวันนี้!!!</div>
                  <div className={'text-8xl text-primary'}>25%</div>
                  <div className={'text-3xl'}>รับส่วนลดค่าแรกเข้าสูงสุด</div>
                </div>
              </div>
            </div>

            <div className={'absolute lg:block bottom-0 left-0 right-0 z-0'}>
              <div className={'relative w-full opacity-20 lg:opacity-100'}>
                <Image
                  className={'absolute left-12 bottom-0'}
                  src={'/images/hero-tower.svg'}
                  alt={'Hero'}
                  layout={''}
                  width={723}
                  height={394}
                />
              </div>
            </div>
          </div>
        </section>
        <div className={'flex justify-center font-kanit my-16'}>
          <Tabs />
        </div>
        {children}
      </main>
    </>
  );
}
