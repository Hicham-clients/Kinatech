import { notFound } from "next/navigation";
const url="https://kinatech.ma/admin/public"
// const url=process.env.NEXT_PUBLIC_API_URL
//CATEGORIES
export async function getCategories() {
  const res = await fetch(`${url}/api/categories`, {
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
    `${url}/api/brands`,
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
  const response=await fetch(`${url}/api/products/${slug}`,{
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

export async function getProducts(params: Record<string, string>) {
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(
    `${url}/api/products_categories?${queryString}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
