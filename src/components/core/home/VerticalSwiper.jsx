import React, { useRef, useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle';
import './vswipper.css'
import { Glow,GlowCapture } from '@codaworks/react-glow';
const VerticalSwiper = () => {
const swiperRef = useRef(null);
useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      direction: 'vertical',
      effect: 'slide',
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 2000,
        reverseDirection: true,
        disableOnInteraction: false,
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
  
    <div className="swiper-container mx-auto h-[300px] relative" ref={swiperRef}>  
    <div className="swiper-wrapper flex flex-col gap-5 relative -z-9" >
       <div className="swiper-slide w-[350px] bg-richblack-900  text-white relative -z-9">
         Slide 2
      </div>
        <div className="swiper-slide w-[350px] bg-richblack-900  text-white relative -z-9">
        Slide 3
       </div>
</div>
</div>

 
  
  
    
  );
};

export default VerticalSwiper;
