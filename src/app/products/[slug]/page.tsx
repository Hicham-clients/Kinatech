import { notFound } from "next/navigation";
import PageDetail from "./_components/PageDetail";
import { Suspense } from "react";
import DetailSkeleton from "@/skeletons/DetailLoading";
import { getProduct } from "@/lib/fetchFunction";
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
          url: product?.photo || "/images/kinatech/logo.png",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

const Detail = async ({ params }: any) => {
  const paramsResponse = await params;

  const data = await getProduct(paramsResponse?.slug);

  return (
    <Suspense fallback={<DetailSkeleton />}>
      <PageDetail data={data} />{" "}
    </Suspense>
  );
};
export default Detail;
