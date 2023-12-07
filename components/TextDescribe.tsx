type TextDescribeProps = {
  icon: React.ReactNode;
  head: string;
  body: string;
};

export const TextDescribe = ({ icon, head, body }: TextDescribeProps) => {
  return (
    <>
      <div
        className={
          'grid grid-cols-[65px_1fr] gap-6 items-center w-full md:w-[416px] h-[88px] px-4'
        }
      >
        <div
          className={
            'p-2.5 rounded-full bg-primary-200 w-16 h-16 justify-center items-center flex'
          }
        >
          {icon}
        </div>
        <div className={'text-[--neutral-1000]'}>
          <h3 className={'text-2xl font-semibold'}>{head}</h3>
          <p className={'text-md font-light'}>{body}</p>
        </div>
      </div>
    </>
  );
};
