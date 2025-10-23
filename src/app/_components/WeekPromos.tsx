"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SecondCardProduct from "../products/_components/SecondCardProduct";
import { usePromos } from "@/hooks/usePromos";
import { motion } from "framer-motion";
import SecondCardLoading from "@/skeletons/SecondCardLoading";

const WeekPromos = () => {
  const { data, isLoading, error,refetch } = usePromos();
  return (
    <div className="px-paddingPhone lg:px-paddingPC pt-paddingPC">
      <div className="kinatech-container ">
        <div className="w-fit mx-auto ">
          <h1 className="text-center font-A text-2xl  md:text-3xl lg:text-4xl tracking-wide font-bold text-blk">
            Promos de la semaine
          </h1>
          <motion.svg
            viewport={{ once: true, amount: 0.3 }}
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewBox="0 0 200 20"
            aria-hidden="true"
          >
            <path
              d="M5 10 C40 20, 80 0, 195 10"
              fill="none"
              stroke="var(--second)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
        <div className="pt-padding">
          <Swiper
            className="overflow-visible  flex "
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
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  <SwiperSlide className="  ">
                    <SecondCardLoading key={index} />
                  </SwiperSlide>
                ))
              : (data ?? [])?.length > 0
              ? data?.map((item) => (
                  <SwiperSlide>
                    <SecondCardProduct {...item} key={item.id} />
                  </SwiperSlide>
                ))
              : error?<div className="text-center font-A tracking-wider text-xl text-[red] flex flex-col justify-center items-center gap-5">Erreur de chargment <button className="kinatech-btn bg-blk bg-black-hover scale-minus-hover" onClick={()=>refetch()}>try again</button></div>:<div className="text-center font-A tracking-wider text-xl">Pas des promos ce semaines</div>}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default WeekPromos;
