import { notFound } from "next/navigation";
import { urlApi } from "./axios";
import { brandSlug } from "./slug";
// Les recommandations ont la même forme que les produits de liste,
// elles sont donc rendues par le ProductCard existant.
import type { Product as CategoryProduct } from "@/hooks/useCategories";

export { brandSlug };

/* ---------------------------------------------------------------- types */
export type VariantStock = {
  id: number;
  quantity: number;
  in_stock: boolean;
};

export type ProductStock = {
  product_id: number;
  total_quantity: number;
  in_stock: boolean;
  variants: VariantStock[];
};

export type PromoProduct = {
  id: number;
  photo: string;
  slug: string;
  url: string;
  base_price: string;
  brand_id: number;
  category_id: number;
  all_quantity: number;
  brand: { id: number; name: string; logo: string } | null;
  category: { id: number; name: string } | null;
};

export type PromoItem = {
  id: number;
  discount: string;
  product_id: number;
  start_date: string;
  end_date: string;
  product: PromoProduct;
};

export type PriceRange = {
  min: number;
  max: number;
};

export type BrandProduct = {
  id: number;
  slug: string;
  url: string;
  photo: string;
  base_price: string;
  category: string | null;
  discount: string | null;
};

export type BrandWithProducts = {
  id: number;
  name: string;
  logo: string;
  products_count: number;
  products: BrandProduct[];
};
//CATEGORIES
export async function getCategories() {
  const res = await fetch(`${urlApi}/api/categories`, {
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
    `${urlApi}/api/brands`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
  console.log('error');

  }

  return res.json();

}
//Detail — données STATIQUES (ISR : le back cache 24h, on revalide chaque heure)
export const getProduct=async(slug:string)=>{
  const response=await fetch(`${urlApi}/api/products/${slug}`,{
    next:{
      revalidate:3600,
      tags:[`product-${slug}`]
    },
     headers: {
      Accept: "application/json"
    },
  })
  if(response.status==404){
    return notFound()
  }
  const data = await response.json()

  return data
}

//Detail — données DYNAMIQUES (stock temps réel, jamais cachées)
export async function getProductStock(slug: string): Promise<ProductStock | null> {
  const res = await fetch(`${urlApi}/api/products/${slug}/stock`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) return null;

  return res.json();
}

/* ------------------------------------------- PRODUITS RECOMMANDÉS */
// Données statiques (le back cache 6h) — sûres en ISR sur la fiche produit.
export async function getRecommended(
  slug: string,
  limit = 8
): Promise<CategoryProduct[]> {
  try {
    const res = await fetch(
      `${urlApi}/api/products/${slug}/recommended?limit=${limit}`,
      {
        next: { revalidate: 3600, tags: [`recommended-${slug}`] },
        headers: { Accept: "application/json" },
      }
    );

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    console.error("getRecommended error:", error);
    return [];
  }
}

/* ------------------------------------------------------------- PROMOS */
export async function getAllPromos(
  sort: "discount" | "recent" | "price" = "discount"
): Promise<PromoItem[]> {
  try {
    const res = await fetch(`${urlApi}/api/promos?sort=${sort}`, {
      next: { revalidate: 600, tags: ["promos"] },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    console.error("getAllPromos error:", error);
    return [];
  }
}

/* --------------------------------------------------- FOURCHETTE DE PRIX */
export async function getPriceRange(
  params: Record<string, string> = {}
): Promise<PriceRange> {
  // Seuls category/brand influencent les bornes — pas les prix eux-mêmes,
  // sinon le slider se refermerait sur lui-même à chaque filtrage.
  const scoped = new URLSearchParams();
  if (params.category) scoped.set("category", params.category);
  if (params.brand) scoped.set("brand", params.brand);

  try {
    const res = await fetch(
      `${urlApi}/api/price-range?${scoped.toString()}`,
      { next: { revalidate: 600 }, headers: { Accept: "application/json" } }
    );

    if (!res.ok) return { min: 0, max: 0 };

    return res.json();
  } catch (error) {
    console.error("getPriceRange error:", error);
    return { min: 0, max: 0 };
  }
}

/* --------------------------------------------------- MARQUES + PRODUITS */
// Le back cache 24h — on garde le même rythme côté ISR.
export async function getBrandsWithProducts(
  { limit = 0, empty = false }: { limit?: number; empty?: boolean } = {}
): Promise<BrandWithProducts[]> {
  const params = new URLSearchParams();
  if (limit > 0) params.set("limit", String(limit));
  if (empty) params.set("empty", "1");

  const query = params.toString();

  const res = await fetch(
    `${urlApi}/api/brands-products${query ? `?${query}` : ""}`,
    {
      next: { revalidate: 86400, tags: ["brands-products"] },
      headers: { Accept: "application/json" },
    }
  );

  if (!res.ok) {
    console.error("brands-products fetch failed:", res.status);
    return [];
  }

  return res.json();
}

// L'API ne renvoie que la liste complète : on retrouve la marque par son slug.
export async function getBrandBySlug(
  slug: string
): Promise<BrandWithProducts | null> {
  const brands = await getBrandsWithProducts();
  const wanted = decodeURIComponent(slug).toLowerCase();

  return (
    brands.find(
      (b) => brandSlug(b.name) === wanted || b.name.toLowerCase() === wanted
    ) ?? null
  );
}



export async function getProducts(params: Record<string, string>) {
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(
    `${urlApi}/api/products_categories?${queryString}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
