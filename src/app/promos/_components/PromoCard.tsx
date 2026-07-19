import { calculNewPrice, PriceFormat } from "@/functions/Discount";
import type { PromoItem } from "@/lib/fetchFunction";
import { imageSrc } from "@/lib/getSrc";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const PromoCard = ({ discount, product }: PromoItem) => {
  const outOfStock = product.all_quantity === 0;
  const newPrice = calculNewPrice(Number(discount), Number(product.base_price));
  const economie = Number(product.base_price) - newPrice;

  return (
    <Link
      href={`/products/${product.url}`}
      className={clsx(
        outOfStock && "opacity-[0.8]",
        "w-full translate-up-hover block select-none overflow-hidden bg-white rounded-2xl border border-[#eee]"
      )}
    >
      <div className="flex flex-col">
        <div className="w-full h-[200px] relative">
          <Image
            unoptimized
            loading="lazy"
            fill
            sizes="150px"
            className="h-full p-2 w-full pointer-events-none object-contain"
            src={imageSrc(product.photo)}
            alt={product.slug}
          />

          {product.brand && (
            <span className="absolute top-2 left-2">
              <Image
                loading="lazy"
                alt={product.brand.name}
                src={imageSrc(product.brand.logo)}
                width={48}
                height={14}
                className="object-contain"
              />
            </span>
          )}

          {outOfStock ? (
            <span className="font-D bg-[#ff8c8cb0] w-fit rounded-full text-[red] p-1 absolute top-1 right-1 text-xs">
              En rupture de stock
            </span>
          ) : (
            <span className="bg-[red] font-B rounded-bl-2xl rounded-tr-2xl text-white p-1 absolute top-1 right-1">
              -{Number(discount)}%
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col gap-y-3">
          {product.category && (
            <span className="text-xs text-grey font-A uppercase tracking-wide">
              {product.category.name}
            </span>
          )}
          <h2 className="font-semibold text-blk font-A h-14 md:text-sm lg:text-base tracking-wide">
            {product.slug.slice(0, 35)}
            {product.slug.length > 35 && "..."}
          </h2>

          <div className="text-sm flex justify-between items-center font-A">
            <span className="text-[red] font-semibold">
              {PriceFormat(newPrice)} DH
            </span>
            <del className="text-grey">
              {PriceFormat(+product.base_price)} DH
            </del>
          </div>

          {!outOfStock && (
            <span className="text-xs font-B text-second">
              Vous économisez {PriceFormat(economie)} DH
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
export default PromoCard;
