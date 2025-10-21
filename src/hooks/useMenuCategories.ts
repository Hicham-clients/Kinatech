import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  slug: string;
  category_id: number;
  all_quantity: number | string;
  Url: string;
}

export interface Category {
  id: number;
  name: string;
  id_parent: number | null;
  created_at: string | null;
  updated_at: string | null;
  products?: Product[];
  childrens?: Category[];
}
async function fetchMenuCategories():Promise<Category[]|undefined> {
  const {data } = await axiosInstance.get(
    "/api/categories"
  );
  return data;
}

export function useMenuCategories() {
  return useQuery({
    queryKey: ["menuCategories"],
    queryFn: fetchMenuCategories,
  });
}
