const SearchMenuLoading = () => {
  return (
<div className="flex border-b p-2 text-blk items-center gap-x-5 font-A animate-pulse">
  <div className="w-[30%] h-[50px] bg-gray-200  rounded-md overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
  </div>

  <div className="w-full flex flex-col gap-y-2">
    <div className="w-3/4 h-4 bg-gray-200  rounded"></div>

    <div className="w-1/2 h-2 bg-gray-200  rounded"></div>

    <div className="flex justify-between items-center">
      <div className="w-1/3 h-4 bg-gray-200  rounded"></div>
      <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
</div>  )
}
export default SearchMenuLoading