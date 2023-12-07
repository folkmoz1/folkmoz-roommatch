import Stepper from '@/components/Stepper/stepper';
export const StepperDisplay = ({ step }: { step: number }) => {
  return (
    <>
      <Stepper
        activeColor={'hsl(var(--primary-500))'}
        activeTitleColor={'hsl(var(--primary-500))'}
        completeColor={'hsl(var(--primary-300))'}
        completeBarColor={'hsl(var(--primary-500))'}
        completeTitleColor={'hsl(var(--muted-foreground))'}
        activeBorderColor={'hsl(var(--primary-600))'}
        defaultBorderWidth={1}
        titleFontSize={20}
        size={46}
        circleFontSize={19}
        steps={[
          { title: 'หัวข้อ' },
          { title: 'รายละเอียด' },
          { title: 'ยืนยัน' },
        ]}
        activeStep={step}
      />
    </>
  );
};
