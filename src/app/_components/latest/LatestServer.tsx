import { Product } from "@/hooks/useCategories";
import Latest from "./Latest";

export async function getSuggestions(): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://kinatech.ma/admin/public/api/suggestions`,
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