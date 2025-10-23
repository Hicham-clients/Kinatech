"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { imageSrc } from "@/lib/getSrc";
type Brand={
   id:number,
        name: string,
        logo:string
}
const Brands = () => {  
  const [brands,setBrands]=useState<Brand[]|null>(null)
   useEffect(() => {
      axiosInstance.get("/api/brands")
        .then((res) => {
          setBrands(res.data);
        })
        .catch((err) => {
          
          console.error(err);
        });
    }, []);
  return (
    <div className="p-6 lg:px-12 border-t">
      <Swiper
        className="overflow-visible kinatech-container  h-14"
        modules={[Navigation, Pagination]}
        loop
        slidesPerView={4}
      >
        {brands?.map(item=>{
     return   <SwiperSlide className="px-10 ">
          <Link className="w-14 h-full flexCenter " href={`/brands/${item.name}`}>
            <Image  
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
        })}
       
      </Swiper>
     
    </div>
  );
};
export default Brands;
