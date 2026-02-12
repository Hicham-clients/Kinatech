
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
    <>
    <ProductsCategories>
      <FilterServer />
    </ProductsCategories>
    </>
    
  );
};
export default Products;
