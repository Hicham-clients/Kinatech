import Menu from "./Menu";

async function getCategories() { 
    const res = await fetch(
    `https://kinatech.ma/admin/public/api/categories`,
    {
      next: { revalidate: 60 }, // ✅ ISR
    }
  );

  if (!res.ok) {
  console.log('error');
  
  }

  return res.json();
  
} 



const MenuServer =async () => { 
      const categories=await getCategories()

  return (
<Menu data={categories}/>
)
}
export default MenuServer