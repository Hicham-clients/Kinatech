import { getBrands, getCategories } from "@/lib/fetchFunction";
import Filter from "./Filter";


const FilterServer = async () => {
  const categories=await getCategories()
  const brands=await getBrands()
  return (
    <Filter 
     categories={categories} brands={brands}/>
  );
};
export default FilterServer;
