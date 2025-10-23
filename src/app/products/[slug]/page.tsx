"use client";
import { useDetails } from "@/hooks/useDetail";
import DetailComponent from "../../product/[productName]/_components/DetailComponent";
import { useParams } from "next/navigation";
import DetailSkeleton from "@/skeletons/DetailLoading";

const Detail = () => {
  const { slug }: { slug: string } = useParams();
  const { data, isLoading } = useDetails(slug);
  if (isLoading) {
    return <DetailSkeleton />;
  }

  return data && <DetailComponent {...data} />;
};
export default Detail;
