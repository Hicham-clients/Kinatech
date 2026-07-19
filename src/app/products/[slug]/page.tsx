import { notFound } from "next/navigation";
import PageDetail from "./_components/PageDetail";
import Recommended from "./_components/Recommended";
import { Suspense } from "react";
import DetailSkeleton from "@/skeletons/DetailLoading";
import { getProduct } from "@/lib/fetchFunction";
import { Product } from "@/hooks/useDetail";
import { imageSrc } from "@/lib/getSrc";
import { urlApi } from "@/lib/axios";
import { SITE_URL, productUrl } from "@/lib/seo";
type Props = {
  params: {
    slug: string;
  };
};
// ISR : la coquille produit est régénérée toutes les heures,
// le stock reste temps réel côté client.
export const revalidate = 3600;
export const dynamicParams = true;

// SSG : pré-génère les fiches produit au build
export async function generateStaticParams() {
  try {
    const res = await fetch(`${urlApi}/api/all_products`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const products: { url: string }[] = await res.json();
    return products.filter((p) => p?.url).map((p) => ({ slug: p.url }));
  } catch {
    return [];
  }
}

function cleanDescription(description?: string) {
  if (!description) return "Découvrez notre produit sur Kinatech";
  return description.replace(/<[^>]*>/g, "").slice(0, 160);
}
export async function generateMetadata({ params }: Props) {
  const p = await params;
  const product = await getProduct(p.slug);
  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Ce produit est introuvable sur Kinatech",
      robots: { index: false, follow: true },
    };
  }
  // Le canonical omettait le segment /products/ : il pointait vers une 404,
  // ce qui désindexe la fiche.
  const canonical = productUrl(product.url);
  const title = product?.brand_name
    ? `${product.slug} — ${product.brand_name}`
    : product?.slug || "Produit Kinatech";

  return {
    title,
    description: cleanDescription(product?.description),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description: cleanDescription(product?.description),
      images: [
        {
          url: imageSrc(product?.photo || "/images/kinatech/logo.png"),
          // Les crawlers déprécient les OG images sous 200px de large ;
          // 1200x630 est le format attendu pour un large card.
          width: 1200,
          height: 630,
          alt: product?.slug,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cleanDescription(product?.description),
      images: [imageSrc(product?.photo || "/images/kinatech/logo.png")],
    },
  };
}


const Detail = async ({ params }: any) => {
  const paramsResponse = await params;

  const data: Product = await getProduct(paramsResponse?.slug);

  if (!data) return notFound();

  // `urlApi` est l'hôte Laravel : une offre qui pointe dessus envoie Google
  // sur le backend au lieu de la fiche publique.
  const canonical = productUrl(data.url);

  // Prix affiché : la remise éventuelle est déjà appliquée côté vitrine,
  // le balisage doit annoncer le même montant que la page.
  const price =
    data.discount != null
      ? (Number(data.base_price) * (1 - Number(data.discount) / 100)).toFixed(2)
      : data.base_price;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}#product`,
    name: data?.slug,
    image: imageSrc(data.photo),
    description: cleanDescription(data?.description),
    sku: String(data.id),
    ...(data.brand_name && {
      brand: { "@type": "Brand", name: data.brand_name },
    }),
    ...(data.category && { category: data.category }),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "MAD",
      itemCondition: "https://schema.org/NewCondition",
      // Le stock n'est plus dans l'API statique (il vit dans /stock, non caché).
      // La page étant rendue en ISR, on annonce la disponibilité générale ;
      // le stock réel est hydraté côté client par useStock.
      availability: "https://schema.org/InStock",
      url: canonical,
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };

  // Fil d'Ariane : Google l'affiche à la place de l'URL brute dans les SERP.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produits",
        item: `${SITE_URL}/products_categories`,
      },
      { "@type": "ListItem", position: 3, name: data.slug, item: canonical },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]),
        }}
      />
      <Suspense fallback={<DetailSkeleton />}>
        <PageDetail data={data} slug={paramsResponse?.slug} />
      </Suspense>
      <Recommended slug={paramsResponse?.slug} />
    </>
  );
};
export default Detail;
