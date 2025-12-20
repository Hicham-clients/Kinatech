import Filter from "./Filter";

async function getCategories() { 
    const res = await fetch(
    `https://kinatech.ma/admin/public/api/categories`,
    {
      next: { revalidate: 60 }, 
    }
  );

  if (!res.ok) {
  console.log('error');
  
  }

  return res.json();
  
} 
async function getBrands() { 
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
const FilterServer = async() => { 
    const categories=await getCategories() 
    const brands=await getBrands()
  return (
<Filter data={categories} brands={brands}/>
)
}
export default FilterServer