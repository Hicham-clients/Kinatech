import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: number;
  name: string;
  url: string;
}
export interface Promo {
  id: number;
  start_date: string;
  end_date: string;
  discount: string;
  product_id: number;
}

export interface Product {
  id: number;
  photo: string;
  slug: string;
  base_price:string;
  category_id: number;
  all_quantity: string;
  url: string;
  promo: Promo | null;
  category: Category;
}

async function fetchProductSearch(
  query: string
): Promise<Product[] | undefined> {
if (query.trim() === "") return []
    const { data } = await axiosInstance.get(`/api/productssearch?q=${query}`);
  return data;  


}

export function useProductsSearch(query: string) {
  return useQuery({
    queryKey: ["productsSearchMenu", query],
    queryFn: () => fetchProductSearch(query),
  });
}
