"use client";
import { useSuggestions } from "@/hooks/useSuggestions";
import ProductCard from "../products_categories/_components/ProductCard";
import CardProductLoading from "@/skeletons/CardProductLoading";
import Link from "next/link";

const Latest = () => {
  const { data, isLoading } = useSuggestions();

  return (
    <div className="px-paddingPhone  lg:px-paddingPC py-20 bg-[url('/images/bg.webp')]  bg-cover">
      <div className="kinatech-container flex flex-col gap-y-10  ">
        <div className="w-fit  ">
          <div className="relative text-white font-D text-2xl lg:text-3xl tracking-wide  text-blk">
            Nouve<span className="">autées</span>
            <div className="h-1 w-full  border via-main to-blk  absolute flex -bottom-2 left-0">
              {/* <span className="w-full h-full bg-main"></span>
<span className="w-full h-full bg-blk"></span> */}
            </div>
          </div>
        </div>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <CardProductLoading key={index} />
              ))
            : data?.map((item, index) => <ProductCard {...item} key={index} />)}
        </div> 
          <div className="flexCenter">
                <Link
                  href={"/products_categories"}
                  className="bg-white text-blk p-2 rounded-lg font-D px-5 scale-minus-hover   w-fit"
                >
                  Savoir plus{" "}
                </Link>
              </div>
      </div>
    </div>
  );
};
export default Latest;
