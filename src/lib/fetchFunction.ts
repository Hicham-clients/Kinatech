import { notFound } from "next/navigation";

//CATEGORIES
export async function getCategories() {
  const res = await fetch(`https://kinatech.ma/admin/public/api/categories`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.log("error");
  }

  return res.json();
}
//BRANDS 
export async function getBrands() {
    const res = await fetch(
    `https://kinatech.ma/admin/public/api/brands`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
  console.log('error');

  }

  return res.json();

}
//Detail
export const getProduct=async(slug:string)=>{
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