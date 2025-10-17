import PageTitle from "@/components/PageTitle";
import Filter from "./_components/Filter";
import ProductCard from "./_components/ProductCard";

const Products = () => {
  return (
    <div className="p-paddingPhone lg:px-paddingPC flex flex-col gap-y-20">
      <PageTitle
        text="Nous serions heureux de vous accompagner dans vos besoins. Découvrez nos produits et profitez d’un service rapide et de qualité."
        title="Catgégorie name"
      />
      <div className="flex flex-col md:flex-row ">
        <Filter />
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/><ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>
    </div>
  );
};
export default Products;
