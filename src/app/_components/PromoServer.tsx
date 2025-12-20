import { Promos } from "@/hooks/usePromos";
import WeekPromos from "./WeekPromos"


export async function getPromos(): Promise<Promos[]> {
  try {
    const res = await fetch(
      `https://kinatech.ma/admin/public/api/getpromos`,
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
const PromoServer = async() => { 
    const data=await getPromos()
  return (
<WeekPromos data={data}/>
)
}
export default PromoServer