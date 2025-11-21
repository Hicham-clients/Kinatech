import { calculNewPrice, PriceFormat } from "@/functions/Discount";
import { Product } from "@/hooks/useCategories";
import { imageSrc } from "@/lib/getSrc";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  slug,
  url,
  photo,
  promo,
  brand,
  base_price,
  all_quantity,
}: Product) => {
  return (
    <Link
      href={`/products/${url}`}
      className={clsx(
        all_quantity == 0 && "opacity-[0.5]",
        "w-full block select-none overflow-auto bg-white rounded-2xl "
      )}
    >
      <div className="flex flex-col ">
        <div className="w-full  h-[200px] relative">
          <Image
            loading="lazy"
            fill
            className="h-full p-2 w-full pointer-events-none  left-0 top-0 object-contain"
            src={imageSrc(photo)}
            alt={slug}
          />

          <span className="absolute  top-2 left-2">
            <Image
              loading="lazy"
              alt={brand.name}
              src={imageSrc(brand.logo)}
              width={1000000}
              height={10000}
              className="w-12  object-contain"
            />
          </span>
          {promo !== null && all_quantity > 0 && (
            <span className="bg-[red] font-B rounded-bl-2xl  rounded-tr-2xl  text-white  p-1 absolute top-1 right-1 ">
              Promo -{promo.discount}%
            </span>
          )}
          {all_quantity == 0 && (
            <span className=" font-D  rounded-bl-2xl  rounded-tr-2xl  text-[red]  p-1 absolute top-1 right-1 text-xs">
              En rupture de stock
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col gap-y-4">
          <h1 className="font-semibold text-blk font-A h-14 md:text-sm lg:text-base tracking-wide">
            {" "}
            {slug.slice(0, 35)}
            {slug.slice(34).length > 0 && "..."}{" "}
          </h1>
          <div className="text-sm flex justify-between items-center font-A">
            <span className=" font-A text-[red]">
              {promo !== null && all_quantity > 0
                ? calculNewPrice(+promo.discount, +base_price)
                : PriceFormat(+base_price)}
              DH
            </span>
            {promo !== null && all_quantity > 0 && <del>{base_price}</del>}{" "}
          </div>

          <button
            disabled={all_quantity == 0 ? true : false}
            className="kinatech-btn  bg-blk bg-black-hover md:text-xs 2xl:text-sm w-full"
          >
            <span className="">Ajouter au panier</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
