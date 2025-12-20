import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type brand= {
      id: number;
      name: string;
      logo: string;
   
  
};
export async function fetchBrands():Promise<brand[]> {
  const { data }: { data: brand[] } = await axiosInstance.get(
    "/api/brands"
  );
  return data;
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });
}
