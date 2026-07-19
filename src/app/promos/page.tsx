import PageTitle from "@/components/PageTitle";
import { getAllPromos } from "@/lib/fetchFunction";
import type { Metadata } from "next";
import Link from "next/link";
import PromoCard from "./_components/PromoCard";

// ISR : les promos bougent peu, le back cache 30 min.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Promotions — Toutes nos offres | Kinatech",
  description:
    "Découvrez toutes les promotions Kinatech en cours : PC portables, accessoires et matériel informatique à prix réduit au Maroc.",
  alternates: {
    canonical: "https://store.kinatech.ma/promos",
  },
  openGraph: {
    title: "Promotions Kinatech",
    description: "Toutes nos offres en cours",
  },
};

type Props = {
  searchParams: Promise<{ sort?: string }>;
};

const SORTS = [
  { key: "discount", label: "Meilleure remise" },
  { key: "recent", label: "Plus récentes" },
] as const;

const PromosPage = async ({ searchParams }: Props) => {
  const { sort } = await searchParams;
  const activeSort = sort === "recent" ? "recent" : "discount";

  const promos = await getAllPromos(activeSort);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Promotions Kinatech",
    url: "https://store.kinatech.ma/promos",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: promos.length,
      itemListElement: promos.map((promo, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://store.kinatech.ma/products/${promo.product.url}`,
        name: promo.product.slug,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[#f4f4f4] p-paddingPhone lg:px-paddingPC pb-32">
        <div className="kinatech-container flex flex-col gap-y-10">
          <PageTitle
            title="Promotions"
            text="Toutes nos offres en cours. Les prix affichés tiennent déjà compte de la remise."
          />

          {promos.length === 0 ? (
            <div className="flex flex-col items-center gap-y-5 py-28 font-A">
              <p className="text-xl tracking-wider text-center">
                Aucune promotion en cours pour le moment.
              </p>
              <Link
                href="/products_categories"
                className="kinatech-btn bg-main bg-main-hover text-white w-fit"
              >
                Voir tous les produits
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 font-A text-sm">
                <span className="text-grey">Trier par :</span>
                {SORTS.map((s) => (
                  <Link
                    key={s.key}
                    href={`/promos?sort=${s.key}`}
                    className={
                      s.key === activeSort
                        ? "text-main font-D underline"
                        : "text-grey underline-hover"
                    }
                  >
                    {s.label}
                  </Link>
                ))}
                <span className="ml-auto text-grey">
                  {promos.length} offre{promos.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10">
                {promos.map((promo) => (
                  <PromoCard key={promo.id} {...promo} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default PromosPage;
