import { urlApi } from "@/lib/axios";
import { getBrandsWithProducts } from "@/lib/fetchFunction";
import { brandSlug } from "@/lib/slug";
import { SITE_URL } from "@/lib/seo";
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
  const baseUrl = SITE_URL;

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

  const brands = await getBrandsWithProducts();
  const brandsUrls: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${baseUrl}/marque/${brandSlug(brand.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productsUrls: MetadataRoute.Sitemap = products
    .filter((p) => p?.url)
    .map((cat) => ({
      url: `${baseUrl}/products/${cat.url}`,
      // `updated_at` peut manquer selon le produit : un <lastmod> vide
      // rend l'entrée invalide pour Google.
      lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
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
    {
      url: `${baseUrl}/promos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marque`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...brandsUrls,
    ...productsUrls,
  ];
}