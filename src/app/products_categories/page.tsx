
export const dynamic = "force-dynamic";

import ProductsCategories from "./_components/ProductsCategories";
import { Metadata } from "next";
import FilterServer from "./_components/filter/FilterServer";
import { getProducts } from "@/lib/fetchFunction";
import { SITE_URL } from "@/lib/seo";

 export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<Metadata> {
    const search=await searchParams
    const brand=typeof search.brand=='string'?search.brand:undefined
    const category=typeof search.category=='string'?search.category:undefined

// brand et category donnent des pages de listing à valeur propre ;
// prix, tri et pagination ne font que dupliquer le même contenu.
const FACETS_INDEXABLES = ["brand", "category"];
const facetsParasites = Object.keys(search).filter(
  (k) => !FACETS_INDEXABLES.includes(k)
);

const title = brand
  ? `${brand} — Tous les produits ${brand}`
  : category
    ? `${category} — Notre sélection`
    : "Nos produits";

// Canonical construit à la main : sans ça la page hérite d'un canonical
// et chaque combinaison de filtres devient une URL indexable distincte.
const canonicalParams = new URLSearchParams();
if (category) canonicalParams.set("category", category);
if (brand) canonicalParams.set("brand", brand);
const query = canonicalParams.toString();

return {
  title,
  description: brand
    ? `Tous les produits ${brand} disponibles chez Kinatech, au meilleur prix et livrés partout au Maroc.`
    : category
      ? `Notre sélection ${category} chez Kinatech : livraison rapide partout au Maroc.`
      : "Découvrez tout le catalogue high-tech Kinatech : ordinateurs, smartphones et accessoires livrés partout au Maroc.",
  alternates: {
    canonical: `${SITE_URL}/products_categories${query ? `?${query}` : ""}`,
  },
  robots: facetsParasites.length > 0 ? { index: false, follow: true } : undefined,
};
}
const Products =async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const search=await searchParams
    const products = await getProducts(search);

  return (
    <>
    <ProductsCategories data={products}>
      <FilterServer searchParams={search} />
    </ProductsCategories>
    </>

  );
};
export default Products;
