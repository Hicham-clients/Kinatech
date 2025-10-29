import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type Brand = {
  id: number;
  name: string;
  logo: string;
};

export type Product = {
  id: number;
  slug: string;
  url: string;
  base_price: string;
  photo: string;
  category_id: number;
  brand_id: number;
  all_quantity: number;
  promo: { product_id: number; discount: string } | null;
  brand: Brand;
};

type PaginationLinks = {
  url: string | null;
  label: string;
  active: boolean;
};

type PaginatedResponse = {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export async function fetchCategories(
  queries: string
): Promise<PaginatedResponse> {
  const { data }: { data: PaginatedResponse } = await axiosInstance.get(
    `/api/products_categories?${queries}`
  );
  return data;
}

export function useCategories(queries: string) {
  return useQuery({
    queryKey: ["products_categories", queries],
    queryFn: () => fetchCategories(queries),
  });
}
