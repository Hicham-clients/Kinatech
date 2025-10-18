"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
const Brands = () => {
  return (
    <div className="p-6 lg:px-12 border-t">
      <Swiper
        className="overflow-visible kinatech-container"
        modules={[Navigation, Pagination]}
        // navigation
        loop
        slidesPerView={4}
      >
        <SwiperSlide className="px-10 ">
          <Link className="w-14 h-14 flexCenter" href={"/brands/"}>
            <Image 
            width={1000} 
            height={1000} 
            // style={{            filter: "grayscale(0%)"}}
              className="w-full h-full object-contain filter hover:grayscale-0 grayscale"
              src={
                "/i.png"
              } 
              alt="brand"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
     
    </div>
  );
};
export default Brands;
