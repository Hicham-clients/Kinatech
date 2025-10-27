const Loading = () => {
  return (
 <div className="p-paddingPhone py-paddingPC lg:px-paddingPC">
      <div className="flex flex-col gap-10 md:flex-row kinatech-container">
        {/* LEFT SIDE — CART ITEMS */}
        <div className="flex flex-col gap-y-5 w-full">
          <div className="h-8 w-32 bg-gray-200 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex font-A items-start py-6 border-b border-grey w-full"
            >
              {/* IMAGE */}
              <div className="w-28 h-28 bg-gray-200 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              </div>

              {/* TEXTS */}
              <div className="ml-6 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-5 w-48 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                    <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                  </div>

                  <div className="h-5 w-16 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="w-8 h-8 bg-gray-200 rounded relative overflow-hidden"
                      >
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                      </div>
                    ))}
                  </div>

                  <div className="h-5 w-24 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE — SUMMARY */}
        <div className="font-A border p-8 rounded-lg shadow-lg shadow-[#eee] w-full md:w-2/3 h-fit sticky top-20 space-y-6">
          <div className="h-6 w-56 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          <div className="space-y-4">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="flex justify-between items-center">
            <div className="h-5 w-20 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
            <div className="h-6 w-32 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
          </div>

          <div className="h-10 w-full bg-gray-300 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>  )
}
export default Loading