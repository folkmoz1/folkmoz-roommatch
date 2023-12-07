import { TextDescribe } from '@/components/TextDescribe';
import { Database, Search, ShieldCheck } from 'lucide-react';

export const WhyUs = () => (
  <div className={'mt-14 flex flex-col items-center justify-center font-kanit'}>
    <h3 className={'text-3xl sm:text-[2.5rem] leading-normal font-semibold'}>
      ทำไมต้องใช้ ROOMMATCH?
    </h3>
    <div className={'flex flex-col xl:flex-row gap-8 xl:gap-4 mt-10'}>
      <TextDescribe
        key={'1'}
        icon={<Search size={32} />}
        head={'ความสะดวกสบาย'}
        body={'เว็บไซต์มีระบบค้นหาที่ให้ความสะดวกในการหาหอพักตามความต้องการ'}
      />
      <TextDescribe
        key={'2'}
        icon={<Database size={32} />}
        head={'ข้อมูลที่ครบถ้วน'}
        body={'ข้อมูลเกี่ยวกับห้องพัก, ราคา,รีวิว , สิ่งอำนวยความสะดวก'}
      />
      <TextDescribe
        key={'3'}
        icon={<ShieldCheck size={32} />}
        head={'ความปลอดภัย'}
        body={'เว็บไซต์ที่เป็นทางการมักมีมาตรการ ความปลอดภัยสูง'}
      />
    </div>
  </div>
);
