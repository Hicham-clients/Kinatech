import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type HeroSectionType = {
  id: number;
  product_id: number;
  cover: string;
  target_type: string;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    category_id: number;
    brand_id: number;
    slug: string;
    all_quantity: string;
    url: string;
    category: {
      id: number;
      name: string;
    };
    brand: {
      id: number;
      name: string;
    };
  };
};
async function fetchHeros() {
  const { data }: { data: HeroSectionType[] } = await axiosInstance.get(
    "/api/herosections"
  );
  return data;
}

export function useHero() {
  return useQuery({
    queryKey: ["herosections"],
    queryFn: fetchHeros,
  });
}
