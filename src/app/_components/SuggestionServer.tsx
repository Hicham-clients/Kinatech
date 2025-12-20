import { HeroSectionType } from "@/hooks/useHero";
import Suggestion from "./Suggestion";

export async function getSuggestions(
  sectiontype: string
): Promise<HeroSectionType[]> {
  try {
    const res = await fetch(
      `https://kinatech.ma/admin/public/api/herosections/${sectiontype}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return []; 
    }

    return res.json();
  } catch (error) {
    console.error('getHeros error:', error);
    return []; 
  }
}

const SuggestionServer = async() => { 
  const data=await getSuggestions('la une')
  return (
<Suggestion data={data}/>
  )
}
export default SuggestionServer