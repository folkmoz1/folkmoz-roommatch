'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '@/loading-animation.json';

export const PageLoading = () => (
  <div
    className={'fixed inset-0 flex justify-center items-center bg-white z-10'}
  >
    <Player
      autoplay
      loop
      src={loadingAnimation}
      style={{ height: '300px', width: '300px' }}
    ></Player>
  </div>
);
