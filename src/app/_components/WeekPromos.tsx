"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SecondCardProduct from "../products_categories/_components/SecondCardProduct";
import { usePromos } from "@/hooks/usePromos";
import SecondCardLoading from "@/skeletons/SecondCardLoading";

const WeekPromos = () => {
  const { data, isLoading} = usePromos(); 
if(isLoading){
  return  (
   <div className="px-paddingPhone  lg:px-paddingPC py-20  ">
        <div className="kinatech-container flex flex-col gap-y-5  ">
 <div className="w-fit">
          <div className="h-8 w-64 bg-gray-200 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        </div>
  <div className="flex">
               { [...Array(2)].map((_, index) => (
                    <SecondCardLoading key={index} />
                ))}
             </div>
             </div>
             </div>
              )
}
  return (
     (
   (data??[])?.length>0&&   <div className="px-paddingPhone  lg:px-paddingPC py-20  ">
        <div className="kinatech-container flex flex-col gap-y-5  ">
          <div className="w-fit  ">
            <h1 className=" font-D text-2xl lg:text-3xl tracking-wide  text-blk">
              Les promostions de la semaine
           
            </h1>
          

          </div>
          <div className="pt-padding ">
            <Swiper
              className="overflow-visible  flex  "
              modules={[Navigation, Pagination]}
              navigation
              loop
              spaceBetween={20}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
               {
                data?.map((item) => (
                  <SwiperSlide key={item.id} className="pb-16">
                    <SecondCardProduct {...item} />
                  </SwiperSlide>
                ))
              }
      
            </Swiper>
          </div>
        </div>
      </div>
    )
  );
};
export default WeekPromos;
