import Footer from "./Footer"

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
const FooterServer = async() => { 
    const data=await getCategories()
  return (
<Footer data={data}/>
)
}
export default FooterServer