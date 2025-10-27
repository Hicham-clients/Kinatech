export default function DetailSkeleton() {
  return (
    <div className="p-padding lg:px-paddingPC animate-pulse">
      <div className="kinatech-container">
        <div className="flex gap-10 flex-col lg:flex-row">
          {/* LEFT IMAGE SECTION */}
          <div className="lg:sticky top-20 w-full">
            <div className="w-full flex flex-col lg:flex-row-reverse items-center relative lg:h-[400px] border rounded-xl overflow-hidden">
              {/* Main Image */}
              <div className="w-full lg:h-full h-[500px] bg-gray-200  relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
              </div>

              {/* Small Thumbnails */}
              <div className="flex lg:flex-col gap-3 flexCenter p-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gray-200  rounded-md overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT INFO SECTION */}
          <div className="w-full font-A flex flex-col gap-y-5">
            {/* Title + Brand */}
            <div className="flex flex-col gap-y-2">
              <div className="w-12 h-10 bg-gray-200  rounded-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
              </div>
              <div className="h-8 w-3/4 bg-gray-200  rounded-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-y-2">
              {[...Array(13)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-full bg-gray-200  rounded-md overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
                </div>
              ))}
            </div>

            <hr />

            {/* Colors */}
            <div className="flex flex-col gap-y-5">
              <div className="h-4 w-1/2 bg-gray-200  rounded-md"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-between border-2 border-gray-200  gap-1 rounded-xl p-2"
                  >
                    <div className="w-16 h-16 bg-gray-200  rounded-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200  animate-shimmer"></div>
                    </div>
                    <div className="w-1/2 h-3 bg-gray-200  rounded"></div>
                    <div className="w-2/3 h-3 bg-gray-200  rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            {/* ICON TITLES */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-x-3 py-5">
                <div className="w-12 h-12 bg-gray-200  rounded-full"></div>
                <div className="flex flex-col gap-y-2">
                  <div className="h-4 w-40 bg-gray-200  rounded"></div>
                  <div className="h-3 w-56 bg-gray-200  rounded"></div>
                </div>
              </div>
            ))}

            <hr />

            {/* SUMMARY */}
            <div className="flex flex-col gap-y-3 bg-[#f4f4f4]  p-3 rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="w-2/3 h-4 bg-gray-200  rounded"></div>
                <div className="w-1/4 h-4 bg-gray-200  rounded"></div>
              </div>
              <div className="border-t border-gray-300  my-6"></div>
              <div className="flex justify-between items-center">
                <div className="w-1/3 h-6 bg-gray-200  rounded"></div>
                <div className="w-1/4 h-6 bg-gray-200  rounded"></div>
              </div>

              {/* Button */}
              <div className="w-full h-12 bg-gray-300  rounded-lg mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
