"use client";
import Icon from "@/components/IconComponent";
import { calculNewPrice, PriceFormat } from "@/functions/Discount";
import { Promos } from "@/hooks/usePromos";
import { imageSrc } from "@/lib/getSrc";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const SecondCardProduct = ({
  discount,
  product: { slug, photo, base_price, url, all_quantity },
}: Promos) => {
  return (
    <Link
      href={`/products/${url}`}
      className={clsx(
        all_quantity == 0 && "opacity-[0.5]",
        "w-[12rem] bg-white scale-plus-hover  mx-auto  block select-none p-5 border border-[#eeee] shadow-xl shadow-[#eeeeee] rounded-2xl m-4"
      )}
    >
      <div className=" flex flex-col gap-y-3 justify-between ">
        {/* <h1 className="kina-wrap  h-[2.7rem] font-D text-blk tracking-wide">
          {slug.slice(0, 34)}
          {slug.slice(34).length > 0 && "..."}
        </h1> */}

        <div className="w-full  h-[7rem] relative">
          <Image
            loading="lazy"
            fill
            sizes="140px"
            className="h-full w-full pointer-events-none   left-0 top-0 object-contain"
            src={imageSrc(photo)}
            alt={slug}
          />

          <span className="text-blk scale-minus-hover bg-gray-200 rounded-full p-2 text-2xl absolute -bottom-2 right-2 ">
            <Icon name="Bag" />
          </span>
        </div>
        <span className="font-semibold font-A text-[red]">
          {PriceFormat(calculNewPrice(Number(discount), Number(base_price)))} DH
        </span>
      </div>
    </Link>
  );
};
export default SecondCardProduct;
