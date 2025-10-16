'use client'
import Icon from "@/components/IconComponent";
import Image from "next/image";
import Link from "next/link";

const SecondCardProduct = () => {
  return (
    <Link href={''} className="w-[200px] block select-none p-5 border-2 rounded-2xl m-4">
      <div className="flex flex-col gap-y-3">
        <h1 className="kina-wrap text-[18px] font-A font-bold text-main">Apple iphone 15 Pro</h1>

        <div className="w-full  h-[150px] relative">
          <Image 
          fill 
          className="h-full w-full pointer-events-none  left-0 top-0 object-contain"
            src="/imagetest.png"
            alt="product"
          />

          <span className="text-blk scale-minus-hover bg-gray-200 rounded-full p-2 text-2xl absolute -bottom-2 right-2 ">
            <Icon name="ShoppingCart" />
          </span>
        </div>
<span className="font-semibold font-A text-[red]">
    11 990,00 dh
</span>
      </div>
    </Link>
  );
};
export default SecondCardProduct;
