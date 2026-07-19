import { calculNewPrice, PriceFormat } from "@/functions/Discount";
import type { BrandProduct } from "@/lib/fetchFunction";
import { imageSrc } from "@/lib/getSrc";
import Image from "next/image";
import Link from "next/link";

/**
 * Carte produit de la page marque.
 * Alimentée par /api/brands-products : données STATIQUES uniquement
 * (pas de stock — celui-ci est chargé sur la fiche produit).
 */
const BrandProductCard = ({
  slug,
  url,
  photo,
  base_price,
  category,
  discount,
}: BrandProduct) => {
  const hasPromo = discount !== null && discount !== undefined;

  return (
    <Link
      href={`/products/${url}`}
      className="w-full translate-up-hover block select-none overflow-hidden bg-white rounded-2xl border border-[#eee]"
    >
      <div className="flex flex-col">
        <div className="w-full h-[200px] relative">
          <Image
            unoptimized
            loading="lazy"
            fill
            sizes="150px"
            className="h-full p-2 w-full pointer-events-none object-contain"
            src={imageSrc(photo)}
            alt={slug}
          />
          {hasPromo && (
            <span className="bg-[red] font-B rounded-bl-2xl rounded-tr-2xl text-white p-1 absolute top-1 right-1">
              Promo -{discount}%
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col gap-y-3">
          {category && (
            <span className="text-xs text-grey font-A uppercase tracking-wide">
              {category}
            </span>
          )}
          <h2 className="font-semibold text-blk font-A h-14 md:text-sm lg:text-base tracking-wide">
            {slug.slice(0, 35)}
            {slug.length > 35 && "..."}
          </h2>
          <div className="text-sm flex justify-between items-center font-A">
            <span className="text-[red]">
              {hasPromo
                ? PriceFormat(
                    calculNewPrice(Number(discount), Number(base_price))
                  )
                : PriceFormat(+base_price)}
              DH
            </span>
            {hasPromo && <del>{PriceFormat(+base_price)} DH</del>}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BrandProductCard;
