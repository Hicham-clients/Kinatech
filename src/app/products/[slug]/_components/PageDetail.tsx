"use client";
import { useDetails } from "@/hooks/useDetail";
import DetailComponent from "./DetailComponent";
import { useParams } from "next/navigation";
import DetailSkeleton from "@/skeletons/DetailLoading";
import Refetch from "@/components/Refetch";

const PageDetail = () => {
  const { slug }: { slug: string } = useParams();
  const { data, isLoading, error, refetch } = useDetails(slug);
  if (isLoading) {
    return <DetailSkeleton />;
  }
  if (error) {
    return (
      <div className="flex h-[50vh] flexCenter">
        <Refetch onclick={refetch} />
      </div>
    );
  }

  return data && <DetailComponent {...data} />;
};
export default PageDetail;
