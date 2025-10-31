import { Metadata } from "next"

import WhyKinatech  from "./_components/WhyKinatech" 
import dynamic from "next/dynamic" 
import Latest from "./_components/Latest"
const Hero=dynamic(()=>import('./_components/Hero'))
const Suggestion=dynamic(()=>import('./_components/Suggestion'))
const WeekPromos=dynamic(()=>import('./_components/WeekPromos'))
export const metadata:Metadata={
  title:"Kinatech | Acceuil"
}
const Home = () => {
  return (
    <>

<Hero/> 
<Suggestion/> 
<Latest/> 
<WeekPromos/> 
<WhyKinatech/>
</>)
}
export default Home