//CATEGORIES
export async function getCategories() {
  const res = await fetch(`https://kinatech.ma/admin/public/api/categories`, {
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