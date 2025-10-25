'se client'
import Icon from "@/components/IconComponent";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import ReactPaginate from "react-paginate";

const Paginate = ({
  currentPage,
  lastPage,
  handleClick,
}: {
  currentPage: number;
  lastPage: number;
  handleClick: (e: { selected: number }) => void;
}) => {
  return (
    <ReactPaginate
      previousLabel={
        <span className=" flex items-center justify-center h-full w-full ">
                    <ArrowLeft/>

        </span>
      } 
      
      nextLabel={
        <span className="rounded-full  flex items-center justify-center h-full w-full ">
                 <ArrowRight/>

        </span>
      }
      breakLabel={"..."}
      pageCount={lastPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handleClick}
      forcePage={currentPage - 1}
      pageLinkClassName=" px-4 py-2 flex justify-center items-center"
      containerClassName={"flex justify-center gap-2 mt-10 w-full"}
      pageClassName={
        "overflow-hidden hover:bg-[#d1d1d144] transitionclass  border rounded font-J"
      }
      activeClassName={"bg-second text-white hover:bg-second"}
      previousClassName={clsx(
        currentPage == 1 && "hidden",
        "text-blackColor  w-10 h-10   border rounded active:bg-main active:text-white  sm:hover:bg-main sm:hover:text-white transitionclass"
      )}
      nextClassName={clsx(
        currentPage == lastPage && "hidden",
        "text-blackColor  w-10 h-10   border rounded active:bg-main active:text-white  sm:hover:bg-main sm:hover:text-white transitionclass"
      )}
      breakClassName={"px-3 py-1 bg-main text-white rounded"}
    />
  );
};

export default Paginate