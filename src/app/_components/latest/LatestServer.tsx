import { Product } from "@/hooks/useCategories";
import Latest from "./Latest";
import { urlApi } from "@/lib/axios";

export async function getSuggestions(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${urlApi}/api/suggestions`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return []; 
    }

    return res.json();
  } catch (error) {
    console.error('Nouveautées Error:', error);
    return []; 
  }
}


const LatestServer = async() => { 
    const suggestions=await getSuggestions()
  return (
<Latest data={suggestions}/>
)
}
export default LatestServer