import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, fetcher } from '@/lib/utils';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import useSWR from 'swr';
import { Listing } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GoogleMaps from '@/components/GoogleMaps';
import { useLocation } from '@/lib/hooks/useLocation';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useFormCreatePlaceStore } from '@/lib/zustand/store';

const PlaceType = ({
  label,
  onClick,
  selected,
}: {
  label: string;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <>
      <div
        role={'button'}
        className={cn('flex-1 px-[70px] py-3 text-center rounded-full', {
          'bg-primary text-white': selected,
          'bg-neutral-200 text-neutral-900': !selected,
        })}
        onClick={onClick}
      >
        {label}
      </div>
    </>
  );
};

export const TitleStep = ({ control, form }: { control: any; form: any }) => {
  const { data } = useSWR<Partial<Listing>>(
    '/api/listing/get?cols=name&limit=10',
    fetcher
  );

  const { setFormOne, form: formStore } = useFormCreatePlaceStore(
    (state) => state
  );

  const { center, address, getNewPosition } = useLocation();

  const onSelected = (type: string) => {
    form.setValue('placeType', type);
    setFormOne({ place: { ...formStore.place, placeType: type } });
  };

  useEffect(() => {
    form.setValue('location', address);
  }, [address]);

  return (
    <>
      <div>
        <div className="text-head-3 font-semibold">
          ประเภทที่พัก <span className={'text-destructive'}>*</span>
        </div>
        <div className="mt-2 flex justify-between gap-10">
          <PlaceType
            key={0}
            label={'คอนโด'}
            onClick={() => onSelected('Condominium')}
            selected={form.watch('placeType') === 'Condominium'}
          />
          <PlaceType
            key={1}
            label={'บ้าน'}
            onClick={() => onSelected('House')}
            selected={form.watch('placeType') === 'House'}
          />
          <PlaceType
            key={2}
            label={'หอพัก'}
            onClick={() => onSelected('Dorm')}
            selected={form.watch('placeType') === 'Dorm'}
          />
        </div>
      </div>
      <div>
        <FormField
          render={({ field }) => (
            <FormItem>
              <div className="text-head-3 font-semibold">
                ชื่อโครงการ <span className={'text-destructive'}>*</span>
              </div>

              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={'font-light'}>
                    <SelectValue
                      placeholder={'ค้นหาหรือเลือกโครงการของที่พัก'}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data &&
                    data?.data.map((item: any) => (
                      <SelectItem key={item.name} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
          name={'placeName'}
        />
      </div>
      <div className={'space-y-3'}>
        <Button>ระบุตำแหน่งที่ตั้ง</Button>
        <Input value={address} disabled className={'w-full'} />
        <GoogleMaps center={center} getNewPosition={getNewPosition} />
      </div>
      <Separator className={'my-4'} />
      <div>
        <div className="text-head-3 font-semibold">
          หัวเรื่อง <span className={'text-destructive'}>*</span>
        </div>
        <div className="mt-2">
          <FormField
            render={({ field }) => (
              <Input
                {...field}
                placeholder={'สร้างหัวเรื่องให้ประกาศดูน่าสนใจ'}
                className={'w-full font-normal'}
              />
            )}
            name={'headline'}
          />
        </div>
      </div>
      <div>
        <div className="text-head-3 font-semibold">
          คำอธิบาย <span className={'text-destructive'}>*</span>
        </div>
        <div className="mt-2">
          <FormField
            control={control}
            render={({ field }) => (
              <>
                <FormControl>
                  <Textarea
                    {...field}
                    className={'font-normal min-h-[125px]'}
                    placeholder={'บรรยายราละเอียดของที่พัก'}
                  />
                </FormControl>
              </>
            )}
            name={'description'}
          />
        </div>
      </div>
    </>
  );
};
