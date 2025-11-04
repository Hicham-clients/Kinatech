const HeroLoading = () => {
  return (
<div className="relative w-full h-[60vh] overflow-hidden rounded-lg">
  {/* Mobile Skeleton */}
  <div className="lg:hidden w-full h-full bg-gray-200  animate-pulse relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
  </div>

  {/* Desktop Skeleton */}
  <div className="hidden lg:block w-full h-full bg-gray-200  animate-pulse relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
  </div>
</div>
  )
}
export default HeroLoading