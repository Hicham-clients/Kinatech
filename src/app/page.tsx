import { Metadata } from "next"

import WhyKinatech  from "./_components/WhyKinatech" 
import { HeroSectionType } from "@/hooks/useHero"
import LatestServer from "./_components/latest/LatestServer"
import Hero from "./_components/Hero"
import SuggestionServer from "./_components/suggestions/SuggestionServer"
import PromoServer from "./_components/promo/PromoServer"


export const metadata:Metadata={
  title:"Kinatech | Acceuil"
} 



  export async function getHeros(
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


const Home = async() => { 
  const data=await getHeros('hero section')
  return (
    <>

<Hero data={data}/> 
<SuggestionServer/> 
<LatestServer/> 
<PromoServer/> 
<WhyKinatech/>
</>)
}
export default Home