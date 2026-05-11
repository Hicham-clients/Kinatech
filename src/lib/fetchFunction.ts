import { notFound } from "next/navigation";
import { urlApi } from "./axios";
//CATEGORIES
export async function getCategories() {
  const res = await fetch(`${urlApi}/api/categories`, {
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
    `${urlApi}/api/brands`,
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
  const response=await fetch(`${urlApi}/api/products/${slug}`,{
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

  return data
}

export async function getProducts(params: Record<string, string>) {
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(
    `${urlApi}/api/products_categories?${queryString}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
