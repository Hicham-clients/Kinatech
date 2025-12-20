"use client";
import { Product, useDetails } from "@/hooks/useDetail";
import DetailComponent from "./DetailComponent";
import { notFound, useParams } from "next/navigation";
import DetailSkeleton from "@/skeletons/DetailLoading";
// import Refetch from "@/components/Refetch";
type props={
  data:Product|null
}
const PageDetail = ({data}:props) => {
  // const { slug }: { slug: string } = useParams(); 
  const isLoading=false
  const error=false
  // const { data, isLoading, error, refetch } = useDetails(slug);
  if (isLoading) {
    return <DetailSkeleton />;
  }
  if (error) {
    return (
      // <div className="flex h-[50vh] flexCenter">
      //   <Refetch onclick={refetch} />
      // </div> 
      notFound()
    );
  }

  return data && <DetailComponent {...data} />;
};
export default PageDetail;
