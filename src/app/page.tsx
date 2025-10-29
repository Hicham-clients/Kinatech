import { Metadata } from "next"
import Hero from "./_components/Hero"
import Suggestion from "./_components/Suggestion"
import WeekPromos from "./_components/WeekPromos"
import WhyKinatech from "./_components/WhyKinatech"
export const metadata:Metadata={
  title:"Kinatech | Acceuil"
}
const Home = () => {
  return (
    <>

<Hero/> 
<Suggestion/> 
<WeekPromos/> 
<WhyKinatech/>
</>)
}
export default Home