"use client";
import { Product, useDetails } from "@/hooks/useDetail";
import DetailComponent from "./DetailComponent";
import { useParams } from "next/navigation";
import DetailSkeleton from "@/skeletons/DetailLoading";
import Refetch from "@/components/Refetch";
type Props={
  data:Product
}
const PageDetail = ({data}:Props) => {
  // const { slug }: { slug: string } = useParams();
  // const { data, isLoading, error, refetch } = useDetails(slug);
  // if (isLoading) {
  //   return <DetailSkeleton />;
  // }
  // if (error) {
  //   return (
  //     <div className="flex h-[50vh] flexCenter">
  //       <Refetch onclick={refetch} />
  //     </div>
  //   );
  // }

  return data && <DetailComponent {...data} />;
};
export default PageDetail;
