import { calculNewPrice, PriceFormat } from "@/functions/Discount";
import type { Product } from "@/hooks/useCategories";
import { imageSrc } from "@/lib/getSrc";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

/**
 * Carte produit pour les sections sombres de l'accueil (Apple / Gamer).
 * Le ProductCard standard est pensé pour un fond clair.
 */
const FeaturedCard = ({
  slug,
  url,
  photo,
  promo,
  base_price,
  all_quantity,
  accent,
}: Product & { accent: string }) => {
  const outOfStock = all_quantity === 0;
  const hasPromo = promo !== null && !outOfStock;

  return (
    <Link
      href={`/products/${url}`}
      className={clsx(
        outOfStock && "opacity-60",
        "group relative flex w-[15rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.04] backdrop-blur-sm",
        "transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] md:w-auto"
      )}
    >
      <div className="relative h-[190px] w-full bg-white/95">
        <Image
          unoptimized
          loading="lazy"
          fill
          sizes="240px"
          src={imageSrc(photo)}
          alt={slug}
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
        />
        {hasPromo && (
          <span className="absolute right-2 top-2 rounded-full bg-[red] px-2 py-1 font-B text-xs text-white">
            -{promo.discount}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 font-B text-[10px] uppercase tracking-wide text-white">
            Rupture
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-y-2 p-4">
        <h3 className="h-10 font-A text-sm leading-tight tracking-wide text-white/90">
          {slug.slice(0, 42)}
          {slug.length > 42 && "..."}
        </h3>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-D text-lg" style={{ color: accent }}>
            {hasPromo
              ? PriceFormat(
                  calculNewPrice(Number(promo.discount), Number(base_price))
                )
              : PriceFormat(+base_price)}
            <span className="ml-1 text-xs">DH</span>
          </span>
          {hasPromo && (
            <del className="font-A text-xs text-white/40">
              {PriceFormat(+base_price)} DH
            </del>
          )}
        </div>
      </div>
    </Link>
  );
};
export default FeaturedCard;
