import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { UploadZone } from '@/components/form/UploadZone';

const Title = ({ text }: { text: string }) => {
  return (
    <div className="text-head-3 font-semibold text-[--neutral-1000]">
      {text} <span className={'text-destructive'}>*</span>
    </div>
  );
};

export const DetailStep = ({ form }: { form: any }) => {
  const [useMktPrice, setMktPrice] = useState(false);

  const price = form.watch('price');
  const mktPrice = form.watch('mkt_price');

  return (
    <>
      <div>
        <Title text={'พื้นที่ใช้สอย (ตร.ม.)'} />
        <div className="mt-2">
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={'กรอกขนาดพื้นที่ใช้สอยของที่พัก'}
                    className={'w-full font-normal'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={'area'}
          />
        </div>
      </div>
      <div className={'grid grid-cols-3 gap-4'}>
        <div className={'col-span-full sm:col-span-1'}>
          <FormField
            render={({ field }) => (
              <FormItem>
                <Title text={'ห้องนอน'} />
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full font-normal mt-2">
                      <SelectValue placeholder="เลือกจำนวนห้องนอน" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <SelectItem key={i} value={i + 1 + ''}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            name={'bedroom_count'}
          />
        </div>
        <div className={'col-span-full sm:col-span-1'}>
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Title text={'ห้องน้ำ'} />
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full font-normal mt-2">
                      <SelectValue placeholder="เลือกจำนวนห้องน้ำ" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <SelectItem key={i} value={i + 1 + ''}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            name={'bathroom_count'}
          />
        </div>
        <div className={'col-span-full sm:col-span-1'}>
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Title text={'ชั้นที่'} />

                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full font-normal mt-2">
                      <SelectValue placeholder="เลือกชั้นที่พัก" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <SelectItem key={i} value={i + 1 + ''}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            name={'floor'}
          />
        </div>
      </div>

      {useMktPrice ? (
        <>
          <div className={'grid grid-cols-2 gap-4'}>
            <div className={'col-span-full sm:col-span-1'}>
              <Title text={'ราคาหลังส่วนลด(ราคาจริง)'} />
              <div className="mt-2">
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={'กรอกราคาของที่พัก'}
                          className={'w-full font-normal'}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  name={'price'}
                />
              </div>
            </div>
            <div className={'col-span-full sm:col-span-1'}>
              <Title text={'ราคาก่อนส่วนลด'} />
              <div className="mt-2">
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={'กรอกราคาก่อนส่วนลด'}
                          className={'w-full font-normal'}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  name={'mkt_price'}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={'text-head-3 font-semibold text-muted'}>
              ตัวอย่าง: การแสดงราคา
            </div>
            <div>
              <div
                className={
                  'w-full bg-primary px-6 pt-7 pb-2 text-white rounded-lg relative font-sans'
                }
              >
                <span
                  className={
                    'flex gap-1 absolute top-2 text-sm items-center opacity-40'
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="15"
                    viewBox="0 0 10 19"
                    fill="none"
                  >
                    <path
                      d="M4 1.5V3.5M4 15.5V17.5M1 3.5H6C6.79565 3.5 7.55871 3.81607 8.12132 4.37868C8.68393 4.94129 9 5.70435 9 6.5V6.643C9 7.40072 8.699 8.12741 8.1632 8.6632C7.62741 9.199 6.90072 9.5 6.143 9.5H1H6C6.79565 9.5 7.55871 9.81607 8.12132 10.3787C8.68393 10.9413 9 11.7044 9 12.5V12.643C9 13.4007 8.699 14.1274 8.1632 14.6632C7.62741 15.199 6.90072 15.5 6.143 15.5H1V3.5Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  {mktPrice}
                  <div
                    className={'w-14 h-[2px] bg-white absolute top-2 -left-1'}
                  ></div>
                </span>
                <span className={'flex gap-1 items-center'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="19"
                    viewBox="0 0 10 19"
                    fill="none"
                  >
                    <path
                      d="M4 1.5V3.5M4 15.5V17.5M1 3.5H6C6.79565 3.5 7.55871 3.81607 8.12132 4.37868C8.68393 4.94129 9 5.70435 9 6.5V6.643C9 7.40072 8.699 8.12741 8.1632 8.6632C7.62741 9.199 6.90072 9.5 6.143 9.5H1H6C6.79565 9.5 7.55871 9.81607 8.12132 10.3787C8.68393 10.9413 9 11.7044 9 12.5V12.643C9 13.4007 8.699 14.1274 8.1632 14.6632C7.62741 15.199 6.90072 15.5 6.143 15.5H1V3.5Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  {price}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Title text={'ราคา'} />
          <div className="mt-2">
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={'กรอกราคาของที่พัก'}
                      className={'w-full font-normal'}
                    />
                  </FormControl>
                </FormItem>
              )}
              name={'price'}
            />
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="mktPrice"
          checked={useMktPrice}
          onCheckedChange={() => setMktPrice(!useMktPrice)}
        />
        <label
          htmlFor="mktPrice"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          ตั้งราคาแบบให้ส่วนลดเพื่อสร้าง
          <span className="text-primary">แรงดึงดูด</span>
        </label>
      </div>
      <div>
        <UploadZone />
      </div>
    </>
  );
};
