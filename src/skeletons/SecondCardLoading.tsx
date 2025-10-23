const SecondCardLoading = () => {
  return (
    <div className="w-[12rem] mx-auto block select-none p-5 border  border-[#eeee] shadow-xl shadow-[#eeeeee] rounded-2xl m-4 animate-pulse">
      <div className="flex flex-col gap-y-3 justify-between overflow-hidden">
        <div className="h-[2rem] w-3/4 bg-gray-200  rounded-md overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
        </div>

        <div className="w-full h-[7rem] bg-gray-200    relative">
          <div className="absolute inset-0 bg-gradient-to-r rounded-md from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
          <div className="absolute -bottom-2 right-2 bg-gray-300  h-8 w-8 rounded-full"></div>
        </div>

        <div className="h-5 w-1/3 bg-gray-200  rounded-md overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};
export default SecondCardLoading;
