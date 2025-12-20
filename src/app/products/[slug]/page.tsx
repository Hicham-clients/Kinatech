
import { notFound } from "next/navigation"
import PageDetail from "./_components/PageDetail"
type Props={
  params:{
    slug:string
  }
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
const Detail = async({params}:any) => {  
const paramsResponse= await params

  const data=await getProduct(paramsResponse?.slug) 

  
  
  return (
<PageDetail data={data}/>  )
}
export default Detail