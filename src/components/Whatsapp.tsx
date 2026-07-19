'use client'
import Image from "next/image";
import Link from "next/link";
import { WhatsappLogo } from "phosphor-react";

const Whatsapp = () => {
  return (
    <Link
      target="_blank"
      href={"https://wa.me/212661613561"}
      className="  fixed bottom-5  hidden sm:flex justify-center items-center left-5 z-[9999999999999] md:size-16 size-12 cursor-pointer scale-minus-hover   "
    >
   <div className="relative whatsapp-logo bg-green-500 p-3  text-white overflow-hidden rounded-full">
     <div className=" overflow-hidden">
       <WhatsappLogo className="size-8 text-sm " /> 
     </div>
   </div>
    
    </Link>
  );
};
export default Whatsapp;
