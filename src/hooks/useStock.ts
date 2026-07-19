import { axiosInstance } from "@/lib/axios";
import type { ProductStock } from "@/lib/fetchFunction";
import { useQuery } from "@tanstack/react-query";

export type { ProductStock, VariantStock } from "@/lib/fetchFunction";

export async function fetchStock(slug: string): Promise<ProductStock> {
  const { data }: { data: ProductStock } = await axiosInstance.get(
    `/api/products/${slug}/stock`
  );
  return data;
}

/**
 * Stock temps réel : la fiche produit arrive en ISR (données statiques),
 * la disponibilité est hydratée ici côté client et jamais mise en cache.
 */
export function useStock(slug: string) {
  return useQuery({
    queryKey: ["product_stock", slug],
    queryFn: () => fetchStock(slug),
    enabled: Boolean(slug),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}
