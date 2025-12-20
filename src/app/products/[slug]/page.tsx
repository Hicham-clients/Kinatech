
import { Product } from "@/hooks/useDetail";
import PageDetail from "./_components/PageDetail"
import { notFound } from "next/navigation";
// export const generateMetadata=async({params}:{params:{slug:string}})=>{
  
// return {
//   title:params.slug.split('-').join(' ')
// }
// } 
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://kinatech.ma/admin/public/api/products/${slug}`,
      {
        next: { revalidate: 60 }, // ISR
      }
    );

    if (!res.ok) {
      console.warn('Product not found:', slug);
      return null; // ما تطيّحش build
    }

    return await res.json();
  } catch (error) {
    console.error('getProduct error:', error);
    return null; // fallback
  }
}

type params={
  slug:string
}
const Detail =async({slug}:params) => { 
  const data=await getProduct(slug)
  return (
<PageDetail data={data}/>  )
}
export default Detail