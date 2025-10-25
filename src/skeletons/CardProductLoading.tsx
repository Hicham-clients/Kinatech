// 'use client'
const CardProductLoading = () => {
  return (
<div className="w-full block select-none overflow-auto bg-white rounded-2xl animate-pulse">
  <div className="flex flex-col">
    {/* IMAGE SKELETON */}
    <div className="w-full h-[200px] relative bg-gray-200  rounded-t-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>

      {/* Promo Badge Skeleton */}
      <div className="absolute top-1 right-1 w-16 h-6 bg-gray-300 rounded-bl-2xl rounded-tr-2xl"></div>

      {/* Icon Skeleton */}
      <div className="absolute top-1 left-1 w-8 h-8 bg-gray-300 rounded-full"></div>
    </div>

    {/* TEXT & BUTTON */}
    <div className="p-4 flex flex-col gap-y-4">
      {/* Title */}
      <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>

      {/* Price */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-1/4 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded-md"></div>
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-gray-300 rounded-lg mt-2"></div>
    </div>
  </div>
</div>
  )
}
export default CardProductLoading