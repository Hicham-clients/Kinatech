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

export async function generateMetadata({ params }: Props) {
  const p=await params
  const product = await getProduct(p.slug);

  return {
    title: product?.slug || "Produit Kinatech",
    description: product?.description || "Découvrez notre produit sur Kinatech",
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
  
  const data:Product = await getProduct(paramsResponse?.slug);
  if (!data) return notFound();
const jsonLd={
  "@context":'https://schema.org', 
  "@type":'Product',
  name:data?.slug, 
  image:data.photo, 
  description:data?.description,
offers:{
  '@type':'Offer', 
  price:data.base_price, 
  priceCurrency:'MAD', 
  availability:data?.allQ?'https://schema.org/InStock':'https://schema.org/InStock'
}
}
  return (
    <>
    <script type="application/ld+json"
    
    dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}
    />
    <Suspense fallback={<DetailSkeleton />}>
      <PageDetail data={data} />{" "}
    </Suspense></>
  );
};
export default Detail;
