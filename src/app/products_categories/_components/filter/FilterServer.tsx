import { getBrands, getCategories, getPriceRange } from "@/lib/fetchFunction";
import Filter from "./Filter";

const FilterServer = async ({
  searchParams = {},
}: {
  searchParams?: Record<string, string>;
}) => {
  // Les trois appels sont indépendants : en parallèle plutôt qu'en cascade.
  const [categories, brands, priceBounds] = await Promise.all([
    getCategories(),
    getBrands(),
    getPriceRange(searchParams),
  ]);

  return (
    <Filter
      categories={categories}
      brands={brands}
      priceBounds={priceBounds}
    />
  );
};
export default FilterServer;
