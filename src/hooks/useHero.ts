import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type HeroSectionType = {
  id: number;
  product_id: number;
  cover_mobile: string;
  cover_pc: string;
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
      url: string;
    };
    brand: {
      id: number;
      name: string;
    };
  };
};
export async function fetchHeros(sectiontype:string):Promise<HeroSectionType[]> {
  const { data }: { data: HeroSectionType[] } = await axiosInstance.get(
    `/api/herosections/${sectiontype}`
  );
  return data;
}

export function useHero(sectiontype:string) {
  return useQuery({
    queryKey: ["herosections",sectiontype],
    queryFn:()=> fetchHeros(sectiontype),
  });
}
