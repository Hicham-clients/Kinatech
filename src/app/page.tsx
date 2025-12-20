import { Metadata } from "next"

import WhyKinatech  from "./_components/WhyKinatech" 
import dynamic from "next/dynamic" 
import Latest from "./_components/Latest"
import { HeroSectionType } from "@/hooks/useHero"
import { axiosInstance } from "@/lib/axios"
import LatestServer from "./_components/LatestServer"
import PromoServer from "./_components/PromoServer"
import SuggestionServer from "./_components/SuggestionServer"
const Hero=dynamic(()=>import('./_components/Hero'))
const Suggestion=dynamic(()=>import('./_components/Suggestion'))
const WeekPromos=dynamic(()=>import('./_components/WeekPromos'))
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