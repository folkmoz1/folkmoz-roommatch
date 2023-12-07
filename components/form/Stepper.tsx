import { StepperDisplay } from '@/components/form/Stepper-subset/StepperDisplay';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepperDetailSchema, stepperTitleSchema } from '@/lib/formValidate';
import { Form } from '@/components/ui/form';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useFormCreatePlaceStore } from '@/lib/zustand/store';
import { TitleStep } from '@/components/form/Stepper-subset/TitleStep';
import { Button } from '@/components/ui/button';
import { DetailStep } from '@/components/form/Stepper-subset/DetailStep';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { ReviewStep } from '@/components/form/Stepper-subset/ReviewStep';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CloudinaryAPI } from '@/lib/apis/CloudinaryAPI';
import { createNewListing } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export const StepperForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(false);

  const router = useRouter();

  const {
    setStep,
    step,
    form: initForm,
    setFormOne,
    setGlobalLoading,
    setImages,
    resetForm,
  } = useFormCreatePlaceStore((state) => state);

  const loading = initForm.global.loading;

  const placeForm = useForm({
    resolver: zodResolver(stepperTitleSchema),
    mode: 'all',
    defaultValues: initForm.place,
  });

  const detailForm = useForm({
    resolver: zodResolver(stepperDetailSchema),
    mode: 'all',
    defaultValues: initForm.detail,
  });

  const onSubmitFirstStep = async (
    data: z.infer<typeof stepperTitleSchema>
  ) => {
    const isValid = await placeForm.trigger();
    if (isValid) {
      setFormOne({
        place: {
          ...data,
          location: {
            ...initForm.place.location,
            address: data.location,
          },
        },
      });
      setStep(1);
    }
  };

  const onSubmitSecondStep = async (
    data: z.infer<typeof stepperDetailSchema>
  ) => {
    const isValid = await detailForm.trigger();

    const files = initForm.global.files.length;

    if (isValid && files >= 4) {
      setFormOne({ detail: { images: [], ...data } });
      setStep(2);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <TitleStep control={placeForm.control} form={placeForm} />;
      case 1:
        return <DetailStep form={detailForm} />;
      case 2:
        return <ReviewStep />;
      default:
        return <></>;
    }
  };

  const onSubmit = () => {
    setGlobalLoading(true);
    setIsDialogOpen(false);

    const files = initForm.global.files;

    if (files.length === 0) {
      setGlobalLoading(false);
      return;
    }
    startTransition(async () => {
      let uploadedCount = 0;

      files.map(async (image) => {
        const uploaded = await CloudinaryAPI.uploadOne(image);
        setImages(uploaded);
        uploadedCount++;

        if (uploaded) {
          if (uploadedCount === files.length) {
            setUploadedFiles(true);
          }
        }
      });
    });
  };

  const formProps = step === 0 ? placeForm : detailForm;

  useEffect(() => {
    const fetcher = async () => {
      try {
        setGlobalLoading;
        const data = {
          place: initForm.place,
          detail: initForm.detail,
        };

        const result = await axios.post('/api/user/announcement', data);

        if (result.status === 200) {
          setGlobalLoading(false);
          resetForm();
          router.push('/listing/be-condo-phaholyothin');
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (uploadedFiles) {
      fetcher();
    }
  }, [uploadedFiles]);

  useEffect(() => {
    return () => {
      setStep(0);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [step]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
      document.body.style.touchAction = 'unset';
    };
  }, [loading]);

  return (
    <>
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
        <Form {...formProps}>
          <StepperDisplay step={step} />
          <form
            onSubmit={
              step === 0
                ? placeForm.handleSubmit(onSubmitFirstStep)
                : detailForm.handleSubmit(onSubmitSecondStep)
            }
          >
            <div
              className={cn('max-w-4xl mt-8 mx-auto space-y-4', {
                'opacity-50': loading,
              })}
            >
              {getStepContent(step)}
              {!loading && (
                <>
                  {step !== 2 ? (
                    <div className={'flex justify-end'}>
                      <Button
                        type={'submit'}
                        variant={'action'}
                        className={'w-[270px]'}
                      >
                        ถัดไป
                      </Button>
                    </div>
                  ) : (
                    <div className={'flex justify-center'}>
                      <DialogTrigger>
                        <div
                          className={
                            'text-white px-4 py-3 w-[270px] hover:bg-primary-700 bg-primary-800 rounded-full'
                          }
                          role={'button'}
                        >
                          เผยแพร่
                        </div>
                      </DialogTrigger>
                    </div>
                  )}
                </>
              )}
            </div>
          </form>
        </Form>

        <DialogContent className={'font-kanit'}>
          <DialogHeader>
            <div className={'text-head-3 font-semibold'}>
              ยืนยันที่จะลงประกาศหรือไม่?
            </div>
          </DialogHeader>
          <DialogDescription>
            ข้อมูลจะต้องผ่านการตรวจสอบก่อนที่จะถูกเผยแพร่ หากข้อมูลไม่ถูกต้อง
            หรือ ไม่สมบูรณ์ตามข้อกำหนด ทางเราจะไม่อนุมัติ
          </DialogDescription>

          <DialogFooter>
            <div className={'flex gap-4 mt-8 w-full'}>
              <Button
                variant={'action'}
                className={'font-medium w-1/3'}
                onClick={onSubmit}
              >
                ยืนยัน
              </Button>
              <DialogClose asChild>
                <Button variant={'outline'} className={'w-1/4 font-medium'}>
                  ยกเลิก
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
