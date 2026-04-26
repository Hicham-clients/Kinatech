import { notFound } from "next/navigation";
import PageDetail from "./_components/PageDetail";
import { Suspense } from "react";
import DetailSkeleton from "@/skeletons/DetailLoading";
import { getProduct } from "@/lib/fetchFunction";
import { Product } from "@/hooks/useDetail";
import { imageSrc } from "@/lib/getSrc";
type Props = {
  params: {
    slug: string;
  };
};
function cleanDescription(description?: string) {
  if (!description) return "Découvrez notre produit sur Kinatech";
  return description.replace(/<[^>]*>/g, "").slice(0, 160);
}
export async function generateMetadata({ params }: Props) {
  const p = await params;
  const product = await getProduct(p.slug);
  const productUrl = `https://store.kinatech.ma/${product?.url}`;
  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Ce produit est introuvable sur Kinatech",
    };
  }
  return {
    title: product?.slug || "Produit Kinatech",
    description: cleanDescription(product?.description),
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: product?.slug || "Produit Kinatech",
      description:
        product?.description || "Découvrez notre produit sur Kinatech",
      images: [
        {
          url: imageSrc(product?.photo || "/images/kinatech/logo.png"),
          width: 200,
          height: 200,
        },
      ],
    },
  };
}


const Detail = async ({ params }: any) => {
  const paramsResponse = await params;

  const data: Product = await getProduct(paramsResponse?.slug);
  const productUrl = `https://store.kinatech.ma/products/${data?.url}`;

  if (!data) return notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data?.slug,
    image: [data.photo],
    description: cleanDescription(data?.description),
    offers: {
      "@type": "Offer",
      price: data?.base_price,
      priceCurrency: "MAD",
      availability: data?.allQ
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: productUrl,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<DetailSkeleton />}>
        <PageDetail data={data} />{" "}
      </Suspense>
    </>
  );
};
export default Detail;
