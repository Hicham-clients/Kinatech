"use client";
import ProductCard from "@/app/products_categories/_components/ProductCard";
import CardProductLoading from "@/skeletons/CardProductLoading";
import Link from "next/link";
import { Product } from "@/hooks/useCategories";
import { animationOfParent } from "@/animations/variants";
import Icon from "@/components/IconComponent";
import { motion } from "framer-motion";
const isLoading = false;
type Props = {
  data: Product[];
};
const Latest = ({ data }: Props) => {
  return (
    <div className="px-paddingPhone  lg:px-paddingPC py-28  bg-[#f4f4f4]  rounded-t-[40px] bg-cover">
      <div className="kinatech-container flex flex-col gap-y-10  ">
        <div className="w-fit  ">
          <div className="relative text-black font-D text-2xl lg:text-3xl tracking-wide  text-blk">
            Nouve<span className="">autées</span>
            <div className="h-1 w-full  border bg-black  absolute flex -bottom-2 left-0"/>
          </div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={animationOfParent}
          viewport={{ once: true, amount: 0.3 }}
          className="containerGridCase2 grid  gap-10 grid-cols-1 sm:grid-cols-2  lg:grid-cols-4"
        >
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <CardProductLoading key={index} />
              ))
            : data?.map((item, index) => <ProductCard {...item} key={index} />)}
        </motion.div>
        <div className="flexCenter">
          <Link
            href={"/products_categories"}
            className="kinatech-btn w-fit bg-main bg-main-hover font-D text-white shadow-lg shadow-black/10"
          >
            Voir les produits
            <span className="text-xl">
              <Icon name="ArrowRight" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Latest;
