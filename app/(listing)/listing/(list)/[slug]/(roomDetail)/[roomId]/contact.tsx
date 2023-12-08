'use client';

import dayjs from '@/lib/dayjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ContactOwner = ({ user }) => {
  return (
    <>
      <div className={'font-kanit'}>
        <div className={'text-1xl sm:text-3xl font-semibold'}>ติดต่อ</div>
        <div
          className={
            'px-4 py-2 rounded-lg flex gap-2 items-center shadow-md w-fit'
          }
        >
          <Avatar>
            <AvatarImage src={user.image || '/images/avatar.jpg'} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className={'text-xl font-medium'}>{user.name}</div>
            <div className={'text-sm text-muted font-light'}>
              {dayjs(user.createdAt).format('เข้าร่วมเมื่อ DD/MM/YYYY')}
            </div>
          </div>
          <div className={'flex items-center gap-2'}>
            <div role={'button'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.73303 2.0433C6.95003 0.833297 8.95403 1.0483 9.97303 2.4103L11.235 4.0943C12.065 5.2023 11.991 6.7503 11.006 7.7293L10.768 7.9673C10.7412 8.06722 10.7384 8.1721 10.76 8.2733C10.823 8.6813 11.164 9.5453 12.592 10.9653C14.02 12.3853 14.89 12.7253 15.304 12.7893C15.4082 12.8115 15.5162 12.8084 15.619 12.7803L16.027 12.3743C16.903 11.5043 18.247 11.3413 19.331 11.9303L21.241 12.9703C22.878 13.8583 23.291 16.0823 21.951 17.4153L20.53 18.8273C20.082 19.2723 19.48 19.6433 18.746 19.7123C16.936 19.8813 12.719 19.6653 8.28603 15.2583C4.14903 11.1443 3.35503 7.5563 3.25403 5.7883C3.20403 4.8943 3.62603 4.1383 4.16403 3.6043L5.73303 2.0433ZM8.77303 3.3093C8.26603 2.6323 7.32203 2.5783 6.79003 3.1073L5.22003 4.6673C4.89003 4.9953 4.73203 5.3573 4.75203 5.7033C4.83203 7.1083 5.47203 10.3453 9.34403 14.1953C13.406 18.2333 17.157 18.3543 18.607 18.2183C18.903 18.1913 19.197 18.0373 19.472 17.7643L20.892 16.3513C21.47 15.7773 21.343 14.7313 20.525 14.2873L18.615 13.2483C18.087 12.9623 17.469 13.0563 17.085 13.4383L16.63 13.8913L16.1 13.3593C16.63 13.8913 16.629 13.8923 16.628 13.8923L16.627 13.8943L16.624 13.8973L16.617 13.9033L16.602 13.9173C16.5595 13.9561 16.514 13.9915 16.466 14.0233C16.386 14.0763 16.28 14.1353 16.147 14.1843C15.877 14.2853 15.519 14.3393 15.077 14.2713C14.21 14.1383 13.061 13.5473 11.534 12.0293C10.008 10.5113 9.41203 9.3693 9.27803 8.5033C9.20903 8.0613 9.26403 7.7033 9.36603 7.4333C9.42259 7.28156 9.50293 7.13979 9.60403 7.0133L9.63603 6.9783L9.65003 6.9633L9.65603 6.9573L9.65903 6.9543L9.66103 6.9523L9.94903 6.6663C10.377 6.2393 10.437 5.5323 10.034 4.9933L8.77303 3.3093Z"
                  fill="black"
                />
              </svg>
            </div>
            <div role={'button'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5286 20.005 9.07479 19.6808 7.745 19.051L3 20L4.395 16.28C3.512 15.042 3 13.574 3 12C3 7.582 7.03 4 12 4C16.97 4 21 7.582 21 12Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
