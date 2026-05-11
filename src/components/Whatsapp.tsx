'use client'
import Image from "next/image";
import Link from "next/link";
import { WhatsappLogo } from "phosphor-react";

const Whatsapp = () => {
  return (
    <Link
      target="_blank"
      href={"https://wa.me/212661613561"}
      className="bg-green-500 p-3 text-white  fixed bottom-5  hidden sm:flex justify-center items-center left-5 z-[9999999999999] md:size-16 size-12 cursor-pointer scale-minus-hover  rounded-full "
    >
      {/* <Image
        alt="0661613561"
        src={"/images/whtasApp.webp"}
 height={80}
 width={80} 
 sizes="80px"
        className=" object-contain"
      /> */}
     <div className="realtive">
       <WhatsappLogo className="size-8 text-sm" /> 
      <div className="bg-green-300 animate-ping w-full h-full z-[99999999] absolute rounded-full inset-0 "/>
     </div>
    </Link>
  );
};
export default Whatsapp;
