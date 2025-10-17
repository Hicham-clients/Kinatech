'use client'
import Image from "next/image"
import Link from "next/link"
import { ArrowArcLeft, ArrowLeft } from "phosphor-react"

const NotFound = () => {
  return (
    <div className="flex font-A   items-center justify-center flex-col md:flex-row h-[70vh] gap-5">
<div className="">
    <Image width={1000} height={1000} className="w-56 h-56 object-contain pointer-events-none"   src="/404.svg" alt="" />
</div> 
<div className="flex flex-col gap-y-5 ">
    <h1 className="font-semibold text-7xl tracking-wide">
Oops!</h1> 
<p className="text-grey font-A">La page n'existe pas
</p> 

<Link href="/products" className="kinatech-btn bg-blk bg-black-hover ">
<ArrowLeft size={'1rem'} weight="regular"/>Retour 
</Link>
</div>

    </div>
  )
}
export default NotFound