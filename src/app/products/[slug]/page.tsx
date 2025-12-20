
import { Product } from "@/hooks/useDetail";
import PageDetail from "./_components/PageDetail"
// export const generateMetadata=async({params}:{params:{slug:string}})=>{
  
// return {
//   title:params.slug.split('-').join(' ')
// }
// } 
export async function getProduct(slug:string): Promise<Product|null> {
  try {
    const res = await fetch(
      `https://kinatech.ma/admin/public/api/products/${slug}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return null; 
    }

    return res.json();
  } catch (error) {
    console.error('getHeros error:', error);
    return null; 
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