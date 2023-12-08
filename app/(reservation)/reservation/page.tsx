export default function Reservation() {
  return (
    <>
      <div className={'w-full flex flex-col justify-center items-center my-20'}>
        <img src="/images/synchro.svg" className={'w-36'} alt="" />
        <h2
          className={
            'text-xl font-kanit font-semibold text-center mt-8 text-muted'
          }
        >
          ยังไม่มีรายการจองของคุณในขณะนี้
        </h2>
      </div>
    </>
  );
}
