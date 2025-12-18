"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { imageSrc } from "@/lib/getSrc";
import { useBrands } from "@/hooks/useBrands";

const Brands = () => {
  const { data: brands } = useBrands();

  return (
    <div className="p-6 select-none lg:px-12 border-t cursor-grab">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 3,
          },

          1024: {
            slidesPerView: 4,
          },
        }}
        className="overflow-visible kinatech-container  h-14"
        modules={[Navigation, Pagination, Autoplay]}
        // loop
        autoplay
        navigation
        slidesPerView={4}
      >
        {brands?.map((item, index) => {
          return (
            <SwiperSlide key={index} className="  ">
              <Link
                className="w-8 lg:w-12 h-full flexCenter mx-auto    "
                href={`/products_categories?brand=${item.name}`}
              >
                <Image
                  quality={70}
                  loading="lazy"
                  title={item.name}
                  width={50}
                  height={50}
                  // style={{            filter: "grayscale(0%)"}}
                  className="pointer-events-none  object-contain filter hover:grayscale-0 grayscale"
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
