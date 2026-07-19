import PageTitle from "@/components/PageTitle";
import { getBrandsWithProducts } from "@/lib/fetchFunction";
import { imageSrc } from "@/lib/getSrc";
import { brandSlug } from "@/lib/slug";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// L'API marques est cachée 24h côté Laravel, on s'aligne.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Nos marques — Tous nos partenaires | Kinatech",
  description:
    "Retrouvez toutes les marques distribuées par Kinatech : Apple, Asus, HP, Lenovo, MSI, Razer et bien d'autres.",
  alternates: {
    canonical: "https://store.kinatech.ma/marque",
  },
  openGraph: {
    title: "Nos marques | Kinatech",
    description: "Toutes les marques disponibles chez Kinatech",
  },
};

const BrandsPage = async () => {
  const brands = await getBrandsWithProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nos marques",
    url: "https://store.kinatech.ma/marque",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: brands.length,
      itemListElement: brands.map((brand, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://store.kinatech.ma/marque/${brandSlug(brand.name)}`,
        name: brand.name,
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
            title="Nos marques"
            text="Choisissez une marque pour découvrir tous ses produits disponibles chez Kinatech."
          />

          {brands.length === 0 ? (
            <p className="font-A text-grey py-20 text-center">
              Aucune marque disponible pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/marque/${brandSlug(brand.name)}`}
                  title={brand.name}
                  className="group bg-white rounded-2xl border border-[#eee] p-5 flex flex-col items-center justify-center gap-y-3 translate-up-hover"
                >
                  <div className="h-16 w-full flexCenter">
                    {brand.logo ? (
                      <Image
                        loading="lazy"
                        width={90}
                        height={60}
                        sizes="90px"
                        src={imageSrc(brand.logo)}
                        alt={brand.name}
                        className="max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition duration-300"
                      />
                    ) : (
                      <span className="font-D text-2xl">{brand.name}</span>
                    )}
                  </div>
                  <h2 className="font-D text-blk text-center">{brand.name}</h2>
                  <span className="text-xs text-grey font-A">
                    {brand.products_count} produit
                    {brand.products_count > 1 ? "s" : ""}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default BrandsPage;
