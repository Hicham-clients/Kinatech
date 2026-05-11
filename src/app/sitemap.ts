import { urlApi } from "@/lib/axios";
import type { MetadataRoute } from "next";
type ProductSiteMap={
  id: number;
  slug: string;
  url: string;
  base_price: string;
  photo: string;
  all_quantity: number;  
  updated_at?:string
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://store.kinatech.ma";

  const res = await fetch(
    `${urlApi}/api/all_products`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    console.error("Sitemap fetch failed:", res.status);
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
      },
    ];
  }

  let products: ProductSiteMap[] = [];
  try {
    products = await res.json();
  } catch (err) {
    console.error("Sitemap: invalid JSON from /api/all_products");
    return [{ url: `${baseUrl}/`, lastModified: new Date() }];
  }

  const productsUrls: MetadataRoute.Sitemap = products.map((cat) => ({
    url: `${baseUrl}/products/${cat.url}`,
    lastModified: cat.updated_at,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products_categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...productsUrls,
  ];
}