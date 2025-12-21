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
import { HeroSectionType, useHero } from "@/hooks/useHero";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  data: HeroSectionType[];
};
const Hero = ({data}:Props) => {
  // const { data, isLoading, error } = useHero("hero section");
  // if (isLoading || error) {
  //   return <HeroLoading />;
  // }

  return (
    data && (
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        // spaceBetween={30}
        slidesPerView={1}
        loop
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}">${
              data?.[index]?.product?.slug.slice(0, 20) +
              (data?.[index]?.product?.slug.slice(20).length > 0 ? "..." : "")
            }</span>`;
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

                <Image
                  priority
                  fill
                  className="md:hidden pointer-events-none w-full h-full top-0 left-0  object-cover"
                  src={imageSrc(item?.cover_mobile ?? item?.cover_pc)}
                  alt={item?.product?.slug}
                />
                {/* IMAGE FOR PC */}
                <Image
                  priority
                  fill
                  className="hidden md:inline-block pointer-events-none  top-0 left-0  object-cover"
                  src={imageSrc(item?.cover_pc)}
                  alt={item?.product?.slug}
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
