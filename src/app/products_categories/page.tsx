import { Suspense } from "react"
import ProductsCategories from "./_components/ProductsCategories"
import { Metadata } from "next"
export const metadata:Metadata={
  title:{
    template:'%s | Produits', 
    default:"Produits"
  },
  description:"Nous serions heureux de vous accompagner dans vos besoins. Découvrez nos produits et profitez d’un service rapide et de qualité."
}
const Products = () => {
  return (
    <Suspense fallback=''>
<ProductsCategories/>

    </Suspense>
  )
}
export default Products