// import { Suspense } from "react"
// import ProductsCategories from "./_components/ProductsCategories"
// import { Metadata } from "next"
// export const metadata:Metadata={
//   title:{
//     template:'%s | Produits',
//     default:"Produits"
//   },
//   description:"Nous serions heureux de vous accompagner dans vos besoins. Découvrez nos produits et profitez d’un service rapide et de qualité."
// }

// async function getProductsByCategories(queries:string) {
//     const res = await fetch(
//     `https://kinatech.ma/admin/public/api/products_categories?${queries}`,
//     {
//       next: { revalidate: 60 },
//     }
//   );

//   if (!res.ok) {
//   console.log('error');

//   }

//   return res.json();

// }
// const Products = async({params,searchParams}:any) => {
//   const ss=await searchParams
//   const decodedParams: Record<string, string> = {};
//   for (const key in ss) {
//     decodedParams[key] = decodeURIComponent(searchParams[key]);
//   }
//   const queryString = Object.entries(searchParams)
//     .map(([key, value]) => `${key}=${decodeURIComponent(value as string)}`)
//     .join('&');

//   const data=await getProductsByCategories(queryString)
//   return (
//     <Suspense fallback=''>
// <ProductsCategories data={data}  />

//     </Suspense>
//   )
// }
// export default Products

export const dynamic = "force-dynamic";

import ProductsCategories from "./_components/ProductsCategories";
import { Metadata } from "next";
import FilterServer from "./_components/filter/FilterServer";
export const metadata: Metadata = {
  title: {
    template: "%s | Produits",
    default: "Produits",
  },
  description:
    "Nous serions heureux de vous accompagner dans vos besoins. Découvrez nos produits et profitez d’un service rapide et de qualité.",
};

const Products = () => {
  return (
    <><ProductsCategories>
      <FilterServer />
    </ProductsCategories></>
    
  );
};
export default Products;
