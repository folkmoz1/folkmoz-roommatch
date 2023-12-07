import { TextTypedAnimation } from '@/components/TextTypedAnimation';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Image from 'next/image';

export const MobileApp = () => {
  return (
    <>
      <section>
        <div
          className={
            'h-full py-[5.5rem] xl:h-[656px] flex justify-center items-center w-full bg-[--neutral-100] relative font-kanit'
          }
        >
          <div
            className={
              'max-w-screen-xl w-full h-full grid grid-cols-6 relative z-[1] gap-6'
            }
          >
            <div
              className={
                'col-span-6 h-[500px] xl:h-auto xl:col-span-3 flex justify-center xl:justify-end'
              }
            >
              <Image
                quality={100}
                className={
                  'absolute hidden sm:block -translate-x-[100px] md:-translate-x-[200px] xl:-translate-x-[400px] w-auto h-auto max-h-[510px]'
                }
                width={232}
                height={470}
                src="/images/mobileapp/app-preview-2.png"
                alt={'app preview image'}
              />{' '}
              <Image
                quality={100}
                className={
                  'absolute z-[1] xl:-translate-x-[200px] w-auto h-auto max-h-[510px]'
                }
                width={232}
                height={470}
                src="/images/mobileapp/app-preview-1.png"
                alt={'app preview image'}
              />{' '}
              <Image
                quality={100}
                className={
                  'absolute hidden sm:block sm:translate-x-[100px] md:translate-x-[200px] xl:-translate-x-0 w-auto h-auto max-h-[510px]'
                }
                width={232}
                height={470}
                src="/images/mobileapp/app-preview-3.png"
                alt={'app preview image'}
              />
            </div>

            <div
              className={
                'mt-8 sm:text-center xl:text-left xl:mt-0 col-span-6 xl:col-span-3 px-4 xl:pl-0'
              }
            >
              <h3 className={'text-2xl sm:text-head-1 font-semibold'}>
                ดาวน์โหลดแอปฯ ROOMMATCH
              </h3>
              <div className={'text-lg sm:text-xl font-light'}>
                ให้ประสบการณ์การหาหอพักของคุณเป็นเรื่องง่าย ค้นหาหอพัก ชําระเงิน
                จองหอพัก จบครบในแอปเดียว
              </div>
              <div
                className={
                  'mt-4 flex flex-col sm:justify-center xl:justify-start sm:flex-row gap-6'
                }
              >
                <div className={'space-y-2'}>
                  <a
                    className={'block'}
                    role={'button'}
                    href={'https://www.apple.com/th/app-store/'}
                  >
                    <img
                      className={'h-[50px]'}
                      src="/images/mobileapp/appstore-btn.png"
                      alt="download on app store"
                    />
                  </a>
                  <a
                    className={'block'}
                    role={'button'}
                    href={'https://play.google.com/store/games?hl=th&gl=US'}
                  >
                    <img
                      className={'h-[50px]'}
                      src="/images/mobileapp/gplay-btn.png"
                      alt="download on app store"
                    />
                  </a>
                </div>
                <div>
                  <img
                    src="/images/mobileapp/appqr.svg"
                    alt="qrcode for download apps"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              'absolute bottom-0 left-0 right-0 flex justify-center items-center z-0'
            }
          >
            <div
              className={
                'relative w-full opacity-10 lg:w-1/2 lg:ml-[400px] xl:ml-[400px] 2xl:ml-[900px]'
              }
            >
              <Image
                src={'/images/hero-tower.svg'}
                alt={'Hero'}
                width={723}
                height={394}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
