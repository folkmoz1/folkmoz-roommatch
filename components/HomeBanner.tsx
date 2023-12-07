'use client';

import Slider, { Settings } from 'react-slick';
import Image from 'next/image';

export const HomeBanner = ({}) => {
  const itemProps = {
    className: 'md:px-4 ',
  };

  const settings: Settings = {
    className: 'center',
    centerPadding: '60px',
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} className={'my-8 xl:my-20'}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={`slide-${i}`} {...itemProps}>
            <div className={'flex justify-center items-center relative'}>
              <img
                src={`/images/banner/banner-${i + 1}.png`}
                alt="Banner"
                sizes={'100%vw'}
                className={'object-contain'}
              />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};
