
import { notFound } from "next/navigation"
import PageDetail from "./_components/PageDetail"
type Props={
  params:{
    slug:string
  }
} 
export async function generateStaticParams() {
  const res = await fetch("https://kinatech.ma/admin/public/api/products")
  const products = await res.json()

  return products.map((p: any) => ({
    slug: p.slug
  }))
}
const getProduct=async(slug:string)=>{
  const response=await fetch(`https://kinatech.ma/admin/public/api/products/${slug}`,{
    next:{
      revalidate:60
    },
     headers: {
      Accept: "application/json"
    },
  }) 
  if(!response.ok){
    return notFound()
  } 
  const data = await response.json()
  console.log("DATA:", data)

  return data
}
const Detail = async({params}:Props) => {  
const slug= params.slug
  const data=await getProduct(slug)
  return (
<PageDetail data={data}/>  )
}
export default Detail