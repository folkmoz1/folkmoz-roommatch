import Image from 'next/image';
import { auth } from '@/auth';
import { FavoriteEntries } from '@/app/(favorite)/favorite/listEntries';

export default async function FavoritePage() {
  const session = await auth();

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
                'max-w-screen-xl w-full px-8 flex justify-center relative z-[1]'
              }
            >
              <div
                className={
                  'color-[--neutral-1000] w-full md:w-fit font-kanit text-center font-semibold'
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

            <div
              className={'absolute hidden lg:block bottom-0 left-0 right-0 z-0'}
            >
              <div className={'relative w-full opacity-20 lg:opacity-100'}>
                <Image
                  className={'absolute -left-[280px] bottom-0'}
                  src={'/images/hero-tower.svg'}
                  alt={'Hero'}
                  layout={''}
                  width={723}
                  height={394}
                />
              </div>
            </div>

            <div className={'absolute bottom-0 left-0 right-0 z-0'}>
              <div className={'relative w-full opacity-20 lg:opacity-100'}>
                <Image
                  className={'absolute lg:-right-[280px] bottom-0 -scale-x-[1]'}
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
        <div className={'py-10'}>
          <div className={'max-w-screen-xl w-full mx-auto px-4'}>
            <div className={'text-center text-3xl font-kanit font-semibold'}>
              รายการโปรด
            </div>
            {session ? <FavoriteEntries /> : <WithoutAuth />}
          </div>
        </div>
      </main>
    </>
  );
}

const WithoutAuth = () => (
  <>
    <div className={'w-full flex flex-col justify-center items-center my-20'}>
      <img src="/images/love-it.svg" className={'w-36'} alt="" />
      <h2
        className={
          'text-xl font-kanit font-semibold text-center mt-8 text-muted'
        }
      >
        เข้าสู่ระบบเพื่อดูรายการโปรดของคุณ
      </h2>
    </div>
  </>
);
