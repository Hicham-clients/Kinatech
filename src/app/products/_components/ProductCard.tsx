import Image from "next/image"
import Link from "next/link"

const ProductCard = () => {
  return (

  <Link href={''} className="w-full block select-none overflow-auto border-2 rounded-2xl m-4">
      <div className="flex flex-col ">


        <div className="w-full  h-[200px] relative">
          <Image 
          fill 
          className="h-full p-2 w-full pointer-events-none  left-0 top-0 object-contain"
            src="/imagetest.png"
            alt="product"
          />

          <div className="flex gap-x-3 items-center  absolute top-1 left-1 ">
<span>
    <Image alt="" src={'/i.png'} width={1000000} height={10000} className="w-8 h-8 object-contain"/>
</span> 
<span className="bg-[red] font-B rounded-tl-2xl  rounded-br-2xl  text-white  p-1 ">
    Promo -20%
</span>
          </div>
        </div> 
        <div className="p-4 flex flex-col gap-y-4">
        <h1 className="font-semibold text-blk font-A">iphone 17 pro max </h1>
<div className="text-sm flex justify-between items-center font-A">
    <span className=" font-A text-[red]">
    10 990,00 dh
</span>
<del>
 11 990,00 dh
</del>
</div>
 
<button className="kinatech-btn bg-blk bg-black-hover text-sm w-full">Ajouter au panier</button>
      </div>
      </div>
    </Link>
)
}
export default ProductCard