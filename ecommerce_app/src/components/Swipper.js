import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Swipper() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src='/images/slider1.png' alt='error'/></SwiperSlide>
        <SwiperSlide><img src='/images/slider2.png' alt='error'/></SwiperSlide>
        <SwiperSlide><img src='/images/slider3.png' alt='error'/></SwiperSlide>
        <SwiperSlide><img src='/images/slider4.png' alt='error'/></SwiperSlide>
        <SwiperSlide><img src='/images/slider5.png' alt='error'/></SwiperSlide>
      </Swiper>
    </>
  );
}
