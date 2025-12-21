"use client";
import PageTitle from "@/components/PageTitle";
import ProductCard from "./ProductCard";
import { useCategories } from "@/hooks/useCategories";
import { useSearchParams } from "next/navigation";
import Paginate from "./Paginate";
import { ReactNode, useState } from "react";
import CardProductLoading from "@/skeletons/CardProductLoading";
import clsx from "clsx";
import Refetch from "@/components/Refetch";
import FilterServer from "./filter/FilterServer";
type Props = {
  children?: ReactNode;
};
const ProductsCategories = ({children}:Props) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useCategories(
    `page=${currentPage}&` + searchParams.toString()
  );
  const handlePaginateClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
    window.scrollTo({ left: 0, top: 0 });
  };
  return (
    <div className="bg-[#f4f4f4] p-paddingPhone lg:px-paddingPC pb-32">
      <div className=" flex flex-col gap-y-20 kinatech-container">
        <PageTitle
          title={
            searchParams.has("brand")
              ? searchParams.get("brand")
              : searchParams.has("category")
              ? searchParams.get("category")
              : "Nos Produits"
          }
          text="Nous serions heureux de vous accompagner dans vos besoins. Découvrez nos produits et profitez d’un service rapide et de qualité."
          // title={searchParams?.toString().length==0?"Toutes les produits":searchParams.has('category')?searchParams.get('category')?.toUpperCase():''}
        />
        <div className="flex flex-col md:flex-row  gap-10">
          {children}
          <div className="w-full">
            {isLoading ? (
              <div
                className={clsx(
                  "w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-14 gap-5"
                )}
              >
                {[...Array(4)].map((_, i) => (
                  <CardProductLoading key={i} />
                ))}{" "}
              </div>
            ) : (data?.data ?? [])?.length > 0 ? (
              <div
                className={clsx(
                  "w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-y-14 gap-5"
                )}
              >
                {data?.data.map((item) => (
                  <ProductCard {...item} key={item.id} />
                ))}
              </div>
            ) : error ? (
              <Refetch onclick={refetch} />
            ) : (
              <div className=" text-center h-full flex justify-center items-center w-full font-A tracking-wider text-xl">
                Pas des produits
              </div>
            )}

            <div>
              {(data?.total ?? 0) > 12 && (
                <Paginate
                  lastPage={data?.last_page ?? 2}
                  currentPage={currentPage}
                  handleClick={handlePaginateClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsCategories;
