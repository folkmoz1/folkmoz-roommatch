'use client';
import Image from 'next/image';
import { WhyUs } from '@/components/WhyUs';
import CountUp from 'react-countup';

const CountUpText = ({ value, label }) => (
  <div className={'flex flex-col items-center'}>
    <div className={'text-5xl font-bold text-primary'}>
      <CountUp end={value} duration={5} />
      <span>+</span>
    </div>
    <div className={'text-2xl font-kanit font-medium'}>{label}</div>
  </div>
);

export default function ContactPage() {
  return (
    <>
      <main className={'pb-10'}>
        <section>
          <div
            className={
              'flex justify-center items-center w-full bg-[--neutral-200] h-[300px] md:h-[600px] relative'
            }
          >
            <h1
              className={
                'text-primary font-bold text-5xl md:text-[128px] relative z-[1]'
              }
            >
              RoomMatch
            </h1>
            <div
              className="absolute inset-0 flex justify-center items-center z-0 opacity-10"
              style={{
                backgroundImage: 'url(/images/hero-tower.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
        </section>
        <WhyUs />
        <div className={'my-10'}>
          <div className={'max-w-screen-xl w-full mx-auto mt-10 px-4'}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className={'flex-1'}>
                <Image
                  className={'lg::ml-20'}
                  alt={'contact us'}
                  src={'/images/contact-us.svg'}
                  width={500}
                  height={500}
                />
              </div>
              <div className={'flex-1'}>
                <div className={'text-head-1'}>About Us</div>
                <div
                  className={
                    'font-kanit sm:max-w-lg text-[--neutral-1000] text-xl sm:text-2xl mt-2'
                  }
                >
                  <p>
                    ยินดีต้อนรับทุกท่านที่เข้าสู่ RoomMatch -
                    เว็บไซต์ที่จะทำให้การค้นหาหอพักของคุณเป็นเรื่องง่าย สะดวก
                    และน่าสนใจที่สุด! RoomMatch
                    เกิดขึ้นจากความต้องการในการมีแพลตฟอร์มที่ช่วยให้นักศึกษา
                    และผู้ที่กำลังมองหาที่พัก
                    ได้ค้นหาและเช่าห้องพักได้อย่างรวดเร็วและทันที
                    พวกเรามุ่งมั่นที่จะเป็นตัวกลางที่นำเสนอข้อมูลที่
                    ถูกต้องและครบถ้วนเพื่อช่วยให้ทุกคนได้ห้องพักที่
                    เหมาะสมกับความต้องการและสไตล์การใช้ชีวิตของตนเอง.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'bg-[--neutral-100] py-14'}>
          <div className={'max-w-screen-xl w-full mx-auto px-4'}>
            <div className="flex flex-col md:flex-row justify-evenly items-center gap-14 md:gap-8">
              <CountUpText value={150} label={'ทีมงานให้บริการ'} />
              <CountUpText value={10000} label={'ของห้องพักที่รองรับ'} />
              <CountUpText value={85000} label={'จำนวนผู้ใช้งาน'} />
            </div>
          </div>
        </div>
        <div className={'py-10'}>
          <div className={'max-w-screen-xl w-full mx-auto mt-10 px-4'}>
            <div className="grid sm:grid-cols-2 justify-items-center md:grid-cols-4 gap-12 md:gap-4">
              <div
                className={
                  'inline-flex flex-col sm:flex-row items-center gap-2'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    d="M25.0007 24.9997C22.709 24.9997 20.7472 24.1837 19.1152 22.5518C17.4833 20.9198 16.6673 18.958 16.6673 16.6663C16.6673 14.3747 17.4833 12.4129 19.1152 10.7809C20.7472 9.14898 22.709 8.33301 25.0007 8.33301C27.2923 8.33301 29.2541 9.14898 30.8861 10.7809C32.518 12.4129 33.334 14.3747 33.334 16.6663C33.334 18.958 32.518 20.9198 30.8861 22.5518C29.2541 24.1837 27.2923 24.9997 25.0007 24.9997ZM8.33398 41.6663V35.833C8.33398 34.6525 8.63815 33.5677 9.24648 32.5788C9.85482 31.59 10.6618 30.8344 11.6673 30.3122C13.8201 29.2358 16.0076 28.4288 18.2298 27.8913C20.452 27.3538 22.709 27.0844 25.0007 27.083C27.2923 27.083 29.5493 27.3525 31.7715 27.8913C33.9937 28.4302 36.1812 29.2372 38.334 30.3122C39.3409 30.833 40.1486 31.5886 40.7569 32.5788C41.3652 33.5691 41.6687 34.6538 41.6673 35.833V41.6663H8.33398Z"
                    fill="#37A475"
                  />
                </svg>
                <span className={'font-semibold text-2xl'}>
                  08.30 - 17.00 น.
                </span>
              </div>

              <div
                className={
                  'inline-flex flex-col sm:flex-row items-center gap-2'
                }
              >
                <svg
                  className={'sm:min-w-[50px]'}
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1754_15592)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.0843 6.25C28.1355 6.24967 29.148 6.64668 29.9188 7.36145C30.6895 8.07622 31.1617 9.05593 31.2405 10.1042L31.2509 10.4167V39.5833H33.3343V19.7917C33.3342 19.5479 33.4196 19.3118 33.5757 19.1245C33.7318 18.9372 33.9486 18.8106 34.1884 18.7667L34.3759 18.75H37.5009C38.5521 18.7497 39.5646 19.1467 40.3354 19.8615C41.1062 20.5762 41.5784 21.5559 41.6572 22.6042L41.6676 22.9167V39.5833H43.7509C44.2819 39.5839 44.7927 39.7872 45.1788 40.1518C45.5649 40.5163 45.7973 41.0145 45.8284 41.5446C45.8595 42.0747 45.687 42.5966 45.3462 43.0038C45.0054 43.411 44.522 43.6727 43.9947 43.7354L43.7509 43.75H6.25095C5.71995 43.7494 5.20921 43.5461 4.8231 43.1816C4.43698 42.817 4.20462 42.3188 4.17351 41.7888C4.14239 41.2587 4.31485 40.7367 4.65567 40.3295C4.99648 39.9223 5.47991 39.6606 6.0072 39.5979L6.25095 39.5833H8.33428V10.4167C8.33395 9.36547 8.73096 8.35299 9.44573 7.58219C10.1605 6.8114 11.1402 6.33926 12.1884 6.26042L12.5009 6.25H27.0843ZM22.9176 31.25H16.6676V35.4167H22.9176V31.25ZM22.9176 22.9167H16.6676V27.0833H22.9176V22.9167ZM22.9176 14.5833H16.6676V18.75H22.9176V14.5833Z"
                      fill="#37A475"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1754_15592">
                      <rect width="50" height="50" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span
                  className={
                    'font-semibold font-kanit text-xl sm:text-lg max-w-sm text-center md:text-left'
                  }
                >
                  เลขที่ 604 อาคาร B4 ชั้นที่ 6 ห้องเลขที่ 328B ต.คลองหนึ่ง
                  อ.คลองหลวง ปทุมธานี 12120
                </span>
              </div>

              <div
                className={
                  'inline-flex flex-col sm:flex-row items-center gap-2'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    d="M9.61458 39.5837C8.65625 39.5837 7.85625 39.2628 7.21458 38.6212C6.57153 37.9781 6.25 37.1774 6.25 36.2191V13.7816C6.25 12.8232 6.57153 12.0232 7.21458 11.3816C7.85625 10.7385 8.65625 10.417 9.61458 10.417H40.3854C41.3438 10.417 42.1437 10.7385 42.7854 11.3816C43.4285 12.0232 43.75 12.8232 43.75 13.7816V36.2191C43.75 37.1774 43.4292 37.9774 42.7875 38.6191C42.1444 39.2621 41.3438 39.5837 40.3854 39.5837H9.61458ZM25 25.2399L41.6667 14.3441L41.025 12.5003L25 22.917L8.975 12.5003L8.33333 14.3441L25 25.2399Z"
                    fill="#37A475"
                  />
                </svg>
                <span className={'font-semibold text-2xl'}>
                  08.30 - 17.00 น.
                </span>
              </div>

              <div
                className={
                  'inline-flex flex-col sm:flex-row items-center gap-2'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    d="M40.0623 31.7913L34.7707 31.1872C34.1485 31.1141 33.5178 31.183 32.926 31.3887C32.3342 31.5943 31.7968 31.9315 31.354 32.3747L27.5207 36.208C21.6065 33.2001 16.7994 28.393 13.7915 22.4788L17.6457 18.6247C18.5415 17.7288 18.979 16.4788 18.8332 15.208L18.229 9.95801C18.1109 8.94171 17.6232 8.00434 16.8587 7.32436C16.0942 6.64438 15.1063 6.26929 14.0832 6.27051H10.479C8.12484 6.27051 6.16651 8.22884 6.31234 10.583C7.41651 28.3747 21.6457 42.583 39.4165 43.6872C41.7707 43.833 43.729 41.8747 43.729 39.5205V35.9163C43.7498 33.8122 42.1665 32.0413 40.0623 31.7913Z"
                    fill="#37A475"
                  />
                </svg>
                <span className={'font-semibold text-2xl'}>0-21054287</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
