import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./useCategories";



export async function fetchSuggestions():Promise<Product[]> {
  const { data }: { data: Product[] } = await axiosInstance.get(
    "/api/suggestions"
  );
  return data;
}

export function useSuggestions() {
  return useQuery({
    queryKey: ["suggestions"],
    queryFn: fetchSuggestions,
  });
}
