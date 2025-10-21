"use client";

import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { imageSrc } from "@/lib/getSrc";
import { useHero } from "@/hooks/useHero";
import HeroLoading from "@/skeletons/Hero";


const Hero = () => { 
const {data,isLoading,error}=useHero() 
if(isLoading){

  return <HeroLoading/>
}
  return (
    data&& <Swiper 

      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 3000 }}
      // spaceBetween={30}
      slidesPerView={1}
      
      loop
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}">${data?.[index]?.product?.slug}</span>`;
        },
      }}
    >
      {data?.map(item=>{

     return <SwiperSlide>
          <Link className="relative w-full flex h-[60vh]" href="/products">
                        {/* IMAGE FOR Mobile */}

            <Image 
           fill
              className="lg:hidden w-full h-full top-0 left-0  object-cover"
              src={
                imageSrc(item.cover)
              }
              alt={item?.product?.slug}
            />
            {/* IMAGE FOR PC */}
             <Image 
           fill
              className="hidden lg:inline-block  w-full h-full top-0 left-0  object-cover"
                src={
                imageSrc(item.cover)
              }
              alt={item?.product?.slug}
            />
          </Link>
        </SwiperSlide>
         })}
      

      <style jsx global>{`
        .swiper-pagination {
          width: 100%; 
          display:none
        }
        @media (min-width: 640px) {
          .swiper-pagination {
            max-width: 640px;
                      display: flex;

          }
        }
        @media (min-width: 768px) {
          .swiper-pagination {
            max-width: 768px;
          }
        }
        .swiper-pagination {
          justify-content: center;
          align-content: center;
          width: 90% !important;
          background: #ffffffb3;
          padding: 5px;
          height: 40px;
          border-radius: 20px;
          margin-bottom: 10px;
          margin-inline: auto !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        .swiper-pagination-bullet {
          background: none;
          color: black;
          opacity: 0.6;
          transition: all 0.3s;
          cursor: pointer;
          width: auto;
          padding-inline: 1.5rem;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          font-size: 0.9rem !important;
          font-family: "Satoshi";
          letter-spacing: 1px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          color: white;
          background: var(--blk);
        }
      `}</style>
    </Swiper>
  );
};
export default Hero;
