"use client";
import { PriceFormat } from "@/functions/Discount";
import type { PriceRange as PriceRangeType } from "@/lib/fetchFunction";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Double slider de fourchette de prix.
 * Les bornes viennent de l'API (/api/price-range) et suivent la catégorie
 * ou la marque sélectionnée. La navigation est debouncée pour ne pas
 * relancer une requête serveur à chaque pixel déplacé.
 */
const PriceRange = ({ bounds }: { bounds: PriceRangeType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const floor = Math.floor(bounds.min);
  const ceil = Math.ceil(bounds.max);

  const paramMin = Number(searchParams.get("min_price"));
  const paramMax = Number(searchParams.get("max_price"));

  const [min, setMin] = useState(
    Number.isFinite(paramMin) && paramMin > 0 ? paramMin : floor
  );
  const [max, setMax] = useState(
    Number.isFinite(paramMax) && paramMax > 0 ? paramMax : ceil
  );

  // Les bornes changent quand on change de catégorie / marque
  useEffect(() => {
    setMin(floor);
    setMax(ceil);
  }, [floor, ceil]);

  const isDefault = min === floor && max === ceil;

  const apply = () => {
    const params = new URLSearchParams(searchParams);

    if (isDefault) {
      params.delete("min_price");
      params.delete("max_price");
    } else {
      params.set("min_price", String(min));
      params.set("max_price", String(max));
    }
    // Un changement de filtre renvoie toujours à la première page
    params.delete("page");

    router.push(`/products_categories?${params.toString()}`);
  };

  if (ceil <= floor) return null;

  return (
    <div className="flex flex-col gap-y-4 px-padding">
      <h2 className="font-D">Prix</h2>

      <div className="flex items-center justify-between text-sm font-A text-grey">
        <span>{PriceFormat(min)} DH</span>
        <span>{PriceFormat(max)} DH</span>
      </div>

      <div className="flex flex-col gap-y-2">
        <label className="sr-only" htmlFor="min-price">
          Prix minimum
        </label>
        <input
          id="min-price"
          type="range"
          min={floor}
          max={ceil}
          value={min}
          onChange={(e) => {
            // On ne laisse jamais le min dépasser le max
            setMin(Math.min(Number(e.target.value), max));
          }}
          onMouseUp={apply}
          onTouchEnd={apply}
          onKeyUp={apply}
          className="w-full accent-[color:var(--main,#e94e1b)] cursor-pointer"
        />

        <label className="sr-only" htmlFor="max-price">
          Prix maximum
        </label>
        <input
          id="max-price"
          type="range"
          min={floor}
          max={ceil}
          value={max}
          onChange={(e) => {
            setMax(Math.max(Number(e.target.value), min));
          }}
          onMouseUp={apply}
          onTouchEnd={apply}
          onKeyUp={apply}
          className="w-full accent-[color:var(--main,#e94e1b)] cursor-pointer"
        />
      </div>

      {!isDefault && (
        <button
          onClick={() => {
            setMin(floor);
            setMax(ceil);
            const params = new URLSearchParams(searchParams);
            params.delete("min_price");
            params.delete("max_price");
            params.delete("page");
            router.push(`/products_categories?${params.toString()}`);
          }}
          className="text-sm underline-hover text-main-hover self-start"
        >
          Réinitialiser le prix
        </button>
      )}
    </div>
  );
};
export default PriceRange;
