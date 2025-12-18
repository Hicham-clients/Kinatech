"use client";

import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/swiper.css";
// import dynamic from "next/dynamic";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { imageSrc } from "@/lib/getSrc";
import { useHero } from "@/hooks/useHero";
import HeroLoading from "@/skeletons/HeroLoading";
import { Swiper, SwiperSlide } from "swiper/react";
// const  Swiper=dynamic(()=>(import("swiper/react")).then(m => m.Swiper), { ssr: false }) 
// const SwiperSlide = dynamic(() => import("swiper/react").then(m => m.SwiperSlide), { ssr: false });

const Hero = () => {
  const { data, isLoading, error } = useHero("hero section");
  if (isLoading || error) {
    return <HeroLoading />;
  }

  return (
    data && (
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        // spaceBetween={30}
        slidesPerView={1}
        loop
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}">${data?.[index]?.product?.slug.slice(0,20)+(data?.[index]?.product?.slug.slice(20).length>0?'...':'')}</span>`;
          },
        }}
      >
        {data?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Link
                className="relative w-full flex h-[60vh] cursor-grab"
                href={
                  item.target_type == "product"
                    ? `/products/${item.product.url}`
                    : item.target_type == "category"
                    ? `/products_categories?category=${item.product.category.url}`
                    : `/products_categories?brand=${item.product.brand.name}`
                }
              >
                {/* IMAGE FOR Mobile */}

                {/* <Image
                 decoding="async"
                  fetchPriority="high"
                  fill
                  className="sm:hidden pointer-events-none w-full h-full top-0 left-0  object-cover"
                  src={imageSrc(item?.cover_mobile ?? item?.cover_pc)}
                  alt={item?.product?.slug}
                /> */}
                {/* IMAGE FOR PC */}
               <Image
    decoding="async"
    fetchPriority="high"
    src={imageSrc(item?.cover_pc)}
    alt={item?.product?.slug}
    fill
    className="object-cover pointer-events-none"
    sizes="(max-width: 768px) 100vw, 564px"
    quality={75}
  />
              </Link>
            </SwiperSlide>
          );
        })}

       
      </Swiper>
    )
  );
};
export default Hero;
