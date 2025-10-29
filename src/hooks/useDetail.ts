import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

//Variant
export interface Variant {
  id: number;
  name: string;
  price: string;
  quantity: number;
  ram: string;
  capacity: string;
  custom_variant: string;
}

// Color
export interface Color {
  id: number;
  name: string;
  images: string[]; 
  variants: Variant[];
}

// Product
export interface Product {
  id: number;
  slug: string;
  url: string;
  allQ: string; 
  photo: string;
  description: string;
  base_price: string;
  category: string; 
  brand_name: string;
  brand_logo: string;
  discount?: string | null;
  colors: Color[];
}

export async function fetchDetails(slug:string):Promise<Product> {
  const { data }: { data: Product} = await axiosInstance.get(
    `/api/products/${slug}`
  );
  return data;
}

export function useDetails(slug:string) {
  return useQuery({
    queryKey: ["detail_products",slug],
    queryFn: ()=>fetchDetails(slug),
  });
}
