import { motion } from 'framer-motion';
import LogoBrand from '@/components/Logo';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/context/modal';

const scaleUp = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const style = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("/images/hero-tower.svg")',
  backgroundColor: 'var(--neutral-50)',
  backgroundSize: '110%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 160%',
};

export default function AnnouncementModal() {
  const { closeModal } = useModal();

  return (
    <>
      <motion.div
        variants={scaleUp}
        initial={'hidden'}
        animate={'visible'}
        style={style}
        className={
          'w-full bg-white rounded-3xl overflow-hidden shadow-xl relative z-50 min-h-[738px] max-w-[1076px] font-kanit'
        }
      >
        <div className={'p-11'}>
          <div className={'flex flex-col justify-center items-center w-full'}>
            <div className={'flex space-x-2'}>
              <LogoBrand />
            </div>
            <h3 className={'text-[2rem] leading-normal my-4 font-semibold'}>
              แจ้งข้อกำหนดการสร้างประกาศ
            </h3>
            <div className={'max-w-[800px] space-y-6 font-light'}>
              <p>
                ขอบคุณทุกท่านที่ให้ความสนใจและเลือกใช้บริการเว็บไซต์ของเราในการประกาศหาหอพักของท่าน
                ทีมงานขอแจ้งข้อกำหนดและแนวทางเพื่อให้ประกาศของท่านมีคุณภาพและถูกต้องมากขึ้น
                <br />
              </p>
              <p>
                หากมีการรายงานว่าประกาศของท่านไม่เป็นไปตามกฎ
                ทางทีมงานจะดำเนินการระงับประกาศนั้นก่อน
                <br />
                เพื่อให้ท่านมีโอกาสตรวจสอบและแก้ไขประกาศของท่าน
                ประกาศที่ถูกรายงานจะถูกนำออกจากระบบและไปยังหมวด "รอแก้ไข"
                ในระบบของท่าน
                ท่านสามารถแก้ไขหรือติดต่อเราเพื่อขอความช่วยเหลือได้
              </p>
              <div>
                <p>โปรดทราบเงื่อนไขที่เข้าข่ายการรายงานประกาศที่ไม่ถูกต้อง</p>
                <ul className={'list-decimal ml-4'}>
                  <li>
                    ประกาศซ้ำซ้อน:
                    ประกาศที่ซ้ำซ้อนกันจะถูกปฏิเสธการสร้างอีกครั้งโดยอัติโนมัติ
                  </li>
                  <li>
                    ให้เช่าทรัพย์นั้นไปแล้ว:
                    หากมีรายงานว่าทรัพย์นี้ได้ถูกให้เช่าไปแล้ว
                    ระบบจะปิดการขายประกาศนั้น
                  </li>
                  <li>
                    ราคาที่ไม่ถูกต้อง:
                    ราคาของทรัพย์ที่ไม่ถูกต้องจะถูกนำไปยังหมวด "รอแก้ไข"
                  </li>
                  <li>
                    ใช้ภาพหรือข้อมูลผู้อื่นโดยไม่ได้รับอนุญาต:
                    ประกาศที่ใช้ภาพหรือข้อมูลที่ไม่ได้รับอนุญาตจะถูกนำไปยังหมวด
                    "รอแก้ไข"
                  </li>
                </ul>
              </div>
              <p>
                ทีมงานขอสรุปว่าระบบของเรามีเจ้าหน้าที่คอยตรวจสอบและป้องกันการรายงานที่ไม่เหมาะสม{' '}
                <br />
                หากมีการรายงานที่ไม่เป็นศูนย์จริยธรรม
                ทีมงานจะให้ความช่วยเหลือแก้ไขและคืนประกาศของท่านไปยังสถานะปกติ
                <br />
                ขอขอบคุณท่านทุกท่านที่ให้ความร่วมมือในการสร้าง Real Estate
                Marketplace ที่มีคุณภาพและเป็นที่น่าเชื่อถือในประเทศไทยของเรา
                ขอบคุณที่ให้ความสนใจและสนับสนุนทีมงานเรามาตลอดเวลา
              </p>
            </div>
            <Button
              onClick={closeModal}
              variant={'action'}
              size={'lg'}
              className={'mt-10 w-[416px] font-semibold text-xl'}
            >
              ยอมรับข้อตกลง
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
