import { PaginatedResponse } from "@/hooks/useCategories";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://store.kinatech.ma";
  const res = await fetch(
    "https://kinatech.ma/admin/public/api/products_categories?page=1",
    { cache: "no-store" },
  );
  const data: PaginatedResponse = await res.json();
  const categories = data.data || [];
  const categoriesUrls:MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.url}`,
    lastModified: new Date(),
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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...categoriesUrls
  ];
}
