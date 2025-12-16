"use client";
import Refetch from "@/components/Refetch";
import { HeroSectionType, useHero } from "@/hooks/useHero";
import { imageSrc } from "@/lib/getSrc";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const SuggestionCard = ({
  cover_pc,
  product,
  target_type,

  index,
}: HeroSectionType & { index: number }) => {
  const [isHover, setIshover] = useState(false);
  return (
    <Link
      onMouseEnter={() => setIshover(true)}
      onMouseLeave={() => setIshover(false)}
      href={
        target_type == "product"
          ? `/products/${product.url}`
          : target_type == "category"
          ? `/products_categories?category=${product.category.url}`
          : `/products_categories?brand=${product.brand.name}`
      }
      className={clsx(
        index == 2
          ? "lg:row-span-2 lg:col-span-2 bg-[#f4f4f4]  order-4 lg:order-none col-span-2 h-[450px] lg:h-full"
          : " lg:h-full",
        " rounded-2xl overflow-hidden  h-[170px] md:h-[280px]  flex  w-full cursor-pointer relative"
      )}
    >
      <Image
        alt={product.slug}
     fill
        className={clsx(
          index == 2 && "object-contain",
          "h-full pointer-events-none w-full object-cover   "
        )}
        src={imageSrc(cover_pc)}
      />{" "}
      <button
        className={clsx(
          index==2?'w-1/2':'w-[90%]',
          isHover && "-translate-y-14",
          " absolute z-30 bg-black/60 -bottom-10  left-1/2 -translate-x-1/2  font-D text-white  flex justify-center items-center rounded-3xl p-2 text-sm "
        )}
      >
        Acheter maintenant
      </button>
    </Link>
  );
};
const Suggestion = () => {
  const { data, isLoading, error, refetch } = useHero("laUne");
  return (
    <div className="py-20 pt-32 px-paddingPhone lg:px-paddingPC ">
      <div className="flex flex-col gap-y-20 kinatech-container">
        <div className="text-center font-D tracking-wider  text-2xl sm:text-3xl md:text-4xl  ">
          <h1> Informatique, Audio & High-Tech.</h1>
          <h1 className="text-black/60">
            PC portables & Gamer hautes performances au Maroc.
          </h1>
        </div>
        {isLoading ? (
          <div className="grid gap-4 grid-cols-2  lg:grid-cols-4 lg:grid-rows-2 ">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={clsx(
                  index === 2
                    ? "lg:row-span-2 lg:col-span-2 bg-gray-100 order-4 lg:order-none col-span-2 h-[380px] lg:h-full"
                    : "lg:h-[200px]",
                  "rounded-2xl overflow-hidden h-[280px] flex w-full cursor-pointer relative"
                )}
              >
                {/* SHIMMER EFFECT BACKGROUND */}
                <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>

                {/* IMAGE AREA */}
                <div
                  className={clsx(
                    index === 2 ? "object-contain" : "object-cover",
                    "h-full w-full bg-gray-300"
                  )}
                ></div>
              </div>
            ))}
          </div>
        ) : (data ?? []).length > 0 ? (
          <div className="grid gap-4 grid-cols-2  lg:grid-cols-4 lg:grid-rows-2 ">
            {data?.map((item, index) => {
              return <SuggestionCard key={item.id} {...item} index={index} />;
            })}
          </div>
        ) : error ? (
          <Refetch onclick={refetch} />
        ) : (
          <div className="text-center font-A tracking-wider text-xl">
            Pas des Produits
          </div>
        )}
      </div>
    </div>
  );
};
export default Suggestion;
