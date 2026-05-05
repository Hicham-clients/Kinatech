import { PaginatedResponse } from "@/hooks/useCategories";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://store.kinatech.ma";

  const res = await fetch(
    "https://kinatech.ma/admin/public/api/all_products",
    { next: { revalidate: 86400 } }
  );

  // 🔴 Handle bad responses
  if (!res.ok) {
    console.error("Sitemap fetch failed:", res.status);
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
      },
    ];
  }

  // 🔴 Read as text first (debug safe)
  const text = await res.text();

  let data: PaginatedResponse;
  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error("Invalid JSON response:", text.slice(0, 200));
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
      },
    ];
  }

  const products = data.data || [];

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