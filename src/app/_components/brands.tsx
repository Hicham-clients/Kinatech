"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { imageSrc } from "@/lib/getSrc";
import { useBrands } from "@/hooks/useBrands";

const Brands = () => {
  const {data:brands}=useBrands()
 
  return (
    <div className="p-6 lg:px-12 border-t cursor-grab">
      <Swiper
        className="overflow-visible kinatech-container  h-14"
        modules={[Navigation, Pagination]}
        // loop 
        // autoplay 
        navigation
        slidesPerView={4}
      >
        {brands?.map((item, index) => {
          return (
            <SwiperSlide key={index} className="px-10 ">
              <Link
                className="w-14 h-full flexCenter  mx-auto "
                href={`/products_categories?brand=${item.name}`}
              >
                <Image
                  loading="lazy"
                  title={item.name}
                  width={1000}
                  height={1000}
                  // style={{            filter: "grayscale(0%)"}}
                  className="w-full h-full object-contain filter hover:grayscale-0 grayscale"
                  src={imageSrc(item?.logo)}
                  alt={item.name}
                />
              </Link>
            </SwiperSlide>
          );
        })}
        
      </Swiper>
    </div>
  );
};
export default Brands;
