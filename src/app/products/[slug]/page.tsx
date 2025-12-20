
import { notFound } from "next/navigation"
import PageDetail from "./_components/PageDetail"
import { Product } from "@/hooks/useCategories"
type Props={
  params:{
    slug:string
  }
} 
// export async function generateStaticParams() {
//   const res = await fetch("https://kinatech.ma/admin/public/api/products")
//   const products: Product[] = await res.json()

//   return products.map((p) => ({
//     slug: p.slug
//   }))
// }
//SEO 
const getProduct=async(slug:string)=>{
  const response=await fetch(`https://kinatech.ma/admin/public/api/products/${slug}`,{
    next:{
      revalidate:60
    },
     headers: {
      Accept: "application/json"
    },
  }) 
  if(response.status==404){
    return notFound()
  } 
  const data = await response.json()
  console.log("DATA:", data)

  return data
}
export async function generateMetadata({ params }: Props) {
  const product = await getProduct(params.slug)

  return {
    title: product?.Title || "Produit Kinatech",
    description: product?.description || "Découvrez notre produit sur Kinatech",
    openGraph: {
      title: product?.Title || "Produit Kinatech",
      description: product?.description || "Découvrez notre produit sur Kinatech",
      images: [
        {
          url: product?.photo || "/images/kinatech/logo.png",
          width: 800,
          height: 600,
        },
      ],
    },
  }
}


const Detail = async({params}:any) => {  
const paramsResponse= await params

  const data=await getProduct(paramsResponse?.slug) 

  
  
  return (
<PageDetail data={data}/>  )
}
export default Detail