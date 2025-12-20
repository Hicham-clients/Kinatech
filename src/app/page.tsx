import { Metadata } from "next"

import WhyKinatech  from "./_components/WhyKinatech" 
import dynamic from "next/dynamic" 
import Latest from "./_components/Latest"
import { HeroSectionType } from "@/hooks/useHero"
import { axiosInstance } from "@/lib/axios"
const Hero=dynamic(()=>import('./_components/Hero'))
const Suggestion=dynamic(()=>import('./_components/Suggestion'))
const WeekPromos=dynamic(()=>import('./_components/WeekPromos'))
export const metadata:Metadata={
  title:"Kinatech | Acceuil"
} 



   export async function getHeros(
  sectiontype: string
): Promise<HeroSectionType[]> {
  const res = await fetch(
    `https://kinatech.ma/admin/public/api/herosections/${sectiontype}`,
    {
      next: { revalidate: 60 }, // ✅ ISR
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch hero sections');
  }

  return res.json();
}


const Home = async() => { 
  const data=await getHeros('hero section')
  return (
    <>

<Hero data={data}/> 
<Suggestion/> 
<Latest/> 
<WeekPromos/> 
<WhyKinatech/>
</>)
}
export default Home