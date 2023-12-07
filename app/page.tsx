import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { TextTypedAnimation } from '@/components/TextTypedAnimation';
import { SearchBar } from '@/components/SearchBar';
import { Panel } from '@/components/Panel';
import { HomeBanner } from '@/components/HomeBanner';
import { MobileApp } from '@/components/MobileApp';
import { HomeDisplayData } from '@/components/HomeDisplayData';
import { WhyUs } from '@/components/WhyUs';

export default async function Home() {
  return (
    <>
      <main>
        <section>
          <div
            className={
              'h-[520px] flex justify-center items-center w-full bg-[--neutral-200] relative'
            }
          >
            <div className={'max-w-screen-xl w-full px-8 flex relative z-[1]'}>
              <div
                className={
                  'color-[--neutral-1000] w-full md:w-fit font-kanit text-center font-semibold'
                }
              >
                <h2 className={'text-[2.5rem] leading-[3.75rem]'}>
                  เรามีห้องพักหลายแบบ...
                  <br />
                  <TextTypedAnimation
                    sequence={['คอนโด', 2000, 'บ้านพัก', 2000, 'หอพัก', 2000]}
                    speed={1}
                  />
                </h2>
                <h3 className={'text-3xl'}>
                  ความสะดวกสบายที่พร้อมให้บริการคุณ
                </h3>
                <div
                  className={
                    'mt-10 flex justify-center sm:justify-items-start gap-3'
                  }
                >
                  <SearchBar />
                  <Button
                    size={'icon'}
                    className={'p4 w-[56px] h-[56px] basis-[60px]'}
                  >
                    <Search size={24} />
                  </Button>
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
                  'relative w-full opacity-20 lg:opacity-100 lg:w-1/2 lg:ml-[560px] xl:ml-[750px] 2xl:ml-[900px]'
                }
              >
                <Image
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
        <Panel />
        <WhyUs />
        <HomeBanner />
        <HomeDisplayData />
        <MobileApp />
      </main>
    </>
  );
}
