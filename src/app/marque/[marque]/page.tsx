import PageTitle from "@/components/PageTitle";
import {
  brandSlug,
  getBrandBySlug,
  getBrandsWithProducts,
} from "@/lib/fetchFunction";
import { imageSrc } from "@/lib/getSrc";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandProductCard from "./_components/BrandProductCard";

type Props = {
  params: Promise<{ marque: string }>;
};

// ISR : l'API marques est cachée 24h côté Laravel, on s'aligne.
export const revalidate = 86400;
export const dynamicParams = true;

// SSG : une page par marque au build
export async function generateStaticParams() {
  const brands = await getBrandsWithProducts();
  return brands.map((b) => ({ marque: brandSlug(b.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marque } = await params;
  const brand = await getBrandBySlug(marque);

  if (!brand) {
    return {
      title: "Marque introuvable",
      description: "Cette marque est introuvable sur Kinatech",
    };
  }

  return {
    title: `${brand.name} — Produits ${brand.name} au Maroc | Kinatech`,
    description: `Découvrez tous les produits ${brand.name} disponibles chez Kinatech : ${brand.products_count} références au meilleur prix.`,
    alternates: {
      canonical: `https://store.kinatech.ma/marque/${brandSlug(brand.name)}`,
    },
    openGraph: {
      title: `${brand.name} | Kinatech`,
      description: `Tous les produits ${brand.name} chez Kinatech`,
      images: brand.logo ? [{ url: imageSrc(brand.logo) }] : undefined,
    },
  };
}

const BrandPage = async ({ params }: Props) => {
  const { marque } = await params;
  const brand = await getBrandBySlug(marque);

  if (!brand) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: brand.name,
    url: `https://store.kinatech.ma/marque/${brandSlug(brand.name)}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: brand.products.length,
      itemListElement: brand.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://store.kinatech.ma/products/${p.url}`,
        name: p.slug,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="p-padding lg:px-paddingPC pb-32">
        <div className="kinatech-container flex flex-col gap-y-8">
          <div className="flex items-center gap-x-5">
            {brand.logo && (
              <Image
                priority
                width={90}
                height={90}
                sizes="90px"
                src={imageSrc(brand.logo)}
                alt={brand.name}
                className="w-20 h-auto object-contain"
              />
            )}
            <PageTitle
              title={brand.name}
              text={`${brand.products_count} produit${
                brand.products_count > 1 ? "s" : ""
              } disponible${brand.products_count > 1 ? "s" : ""}`}
            />
          </div>

          {brand.products.length === 0 ? (
            <p className="font-A text-grey">
              Aucun produit disponible pour cette marque pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {brand.products.map((product) => (
                <BrandProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          <Link
            href={`/products_categories?brand=${encodeURIComponent(brand.name)}`}
            className="kinatech-btn bg-blk bg-black-hover text-white w-fit"
          >
            Filtrer les produits {brand.name}
          </Link>
        </div>
      </div>
    </>
  );
};
export default BrandPage;
