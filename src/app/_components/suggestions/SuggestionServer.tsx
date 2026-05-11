import { HeroSectionType } from "@/hooks/useHero";
import Suggestion from "./Suggestion";
import { urlApi } from "@/lib/axios";

export async function getSuggestions(
  sectiontype: string
): Promise<HeroSectionType[]> {
  try {
    const res = await fetch(
     `${urlApi}/api/herosections/${sectiontype}`,
     
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
  const data=await getSuggestions('laUne')
  return (
<Suggestion data={data}/>
  )
}
export default SuggestionServer