import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface ProductPromo {
  id: number;
  photo: string;
  slug: string;
  category_id: number;
  brand_id: number;
  base_price: string;
  all_quantity: number;
  url: string;
}

export interface Promos {
  id: number;
  discount: string;
  product_id: number;
  product: ProductPromo;
}
export async function fetchPromos():Promise<Promos[]> {
  const { data }: { data: Promos[] } = await axiosInstance.get(
    "/api/getpromos"
  );
  return data;
}

export function usePromos() {
  return useQuery({
    queryKey: ["promos"],
    queryFn: fetchPromos,
  });
}
