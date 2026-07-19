import type { Product } from "@/hooks/useCategories";
import { getProducts } from "@/lib/fetchFunction";
import { BANNER_GAMER, bannerIfExists } from "./banners";
import FeaturedSection from "./FeaturedSection";

/**
 * Il n'existe pas de catégorie "gaming" parente : le gaming est réparti
 * entre PC portable et PC bureau. On agrège les deux et on dédoublonne.
 */
const GamerServer = async () => {
  const [portables, bureaux, recherche] = await Promise.all([
    getProducts({ category: "pc-portable-gamer" }),
    getProducts({ category: "pc-bureau-gamer" }),
    getProducts({ search: "gaming" }),
  ]);

  const merged: Product[] = [
    ...(portables?.data ?? []),
    ...(bureaux?.data ?? []),
    ...(recherche?.data ?? []),
  ];

  const seen = new Set<number>();
  const products = merged
    .filter((product) => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    })
    .sort((a, b) =>
      (b.updated_at ?? "").localeCompare(a.updated_at ?? "")
    )
    .slice(0, 8);

  return (
    <FeaturedSection
      theme="gamer"
      eyebrow="Battle Station"
      title="Passez au niveau supérieur."
      description="PC portables et tours gaming, cartes graphiques dernière génération et périphériques haute performance — montés et testés par Kinatech."
      // highlights={[
      //   "RTX dernière génération",
      //   "Montage & test inclus",
      //   "Support technique local",
      // ]}
      bannerImage={bannerIfExists(BANNER_GAMER)}
      bannerAlt=""
      href="/products_categories?category=pc-portable-gamer"
      ctaLabel="Configurer mon setup"
      products={products}
    />
  );
};
export default GamerServer;
