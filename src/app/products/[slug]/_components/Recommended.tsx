import ProductCard from "@/app/products_categories/_components/ProductCard";
import { getRecommended } from "@/lib/fetchFunction";

/**
 * Produits recommandés — rendu côté serveur en ISR.
 * L'API renvoie des données statiques (même forme que les listes),
 * on réutilise donc le ProductCard existant.
 */
const Recommended = async ({ slug }: { slug: string }) => {
  const products = await getRecommended(slug, 8);

  if (products.length === 0) return null;

  return (
    <section className="p-padding lg:px-paddingPC pb-20">
      <div className="kinatech-container flex flex-col gap-y-8">
        <div className="w-fit">
          <h2 className="relative font-D text-2xl lg:text-3xl tracking-wide text-blk">
            Vous aimerez aussi
          </h2>
          <div className="h-1 w-16 bg-main rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Recommended;
