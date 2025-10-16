'use client'

import Link from "next/link"

const Hero = () => {
  return (
    <div className="w-full  bg-red-500 flex ">
        <Link className="relative w-full flex h-full" href="/products">
        <img className="lg:hidden top-0 left-0  object-cover" height={768} width={1920} src={'https://www.mediazone.ma/uploads/images/banners/apple-iphone-17-pro-0ZNG7-768.webp'} alt="iphone"/>
        <img className="hidden lg:inline-block  top-0 left-0  object-cover" height={768} width={1920} src={'https://www.mediazone.ma/uploads/images/banners/apple-iphone-17-pro-0ZNG7.webp'} alt="iphone"/>
        </Link>
    </div>
  )
}
export default Hero