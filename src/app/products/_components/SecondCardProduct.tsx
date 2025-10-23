'use client'
import Icon from "@/components/IconComponent";
import { calculNewPrice } from "@/functions/Discount";
import { ProductPromo, Promos } from "@/hooks/usePromos";
import { imageSrc } from "@/lib/getSrc";
import Image from "next/image";
import Link from "next/link";

const SecondCardProduct = ({discount,product:{slug,photo,base_price,url}}:Promos) => {
  return (
    <Link href={`/products/${url}`} className="w-[12rem] mx-auto  block select-none p-5 border border-[#eeee] shadow-xl shadow-[#eeeeee] rounded-2xl m-4">
      <div className=" flex flex-col gap-y-3 justify-between ">
        <h1 className="kina-wrap  h-[2rem] font-A font-bold text-blk tracking-wide text-">{slug}</h1>

        <div className="w-full  h-[7rem] relative">
          <Image 
          fill 
          className="h-full w-full pointer-events-none   left-0 top-0 object-contain"
            src={imageSrc(photo)}
            alt={slug}
          />

          <span className="text-blk scale-minus-hover bg-gray-200 rounded-full p-2 text-2xl absolute -bottom-2 right-2 ">
            <Icon name="ShoppingCart" />
          </span>
        </div>
<span className="font-semibold font-A text-[red]">
    {calculNewPrice(+discount,+base_price)} DH
</span>
      </div>
    </Link>
  );
};
export default SecondCardProduct;
