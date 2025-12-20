
import { notFound } from "next/navigation"
import PageDetail from "./_components/PageDetail"
type Props={
  params:{
    slug:string
  }
} 
const getProduct=async(slug:string)=>{
  const response=await fetch('https://kinatech.ma/admin/public/api/products/'+slug,{
    next:{
      revalidate:60
    }
  }) 
  if(!response.ok){
    return notFound()
  } 
  return await response.json()
}
const Detail = async({params}:Props) => {  
const slug= params.slug
  const data=await getProduct(slug)
  return (
<PageDetail data={data}/>  )
}
export default Detail