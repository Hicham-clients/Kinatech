"use client";

import { PriceFormat } from "@/functions/Discount";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function CartSummary() {
  const { cart } = useSelector((state: RootState) => state.cart);
const QxP=cart.map(item=>+item.price.toString().replace(',','.')*item.quantity) 

const total:number=QxP.reduce((curr:number,acc:number)=>{
return curr+=+acc
},0) 

  return (
    <div className="font-A border  p-8 rounded-lg shadow-lg shadow-[#eee] w-full md:w-2/3 h-fit sticky top-20 ">
      <h2 className="text-xl font-D text-gray-900 mb-6">
        Récapitulatif de la commande
      </h2>
      <div className="space-y-4">
        {/* <div className="flex justify-between text-grey">
          <span>Total hors taxe</span>
          <span className="font-B text-blk">{totalHT} DH</span>
        </div> */}
        {/* <div className="flex justify-between text-grey">
          <span>TVA</span>
          <span className="font-B text-blk">{tva} DH</span>
        </div> */}
      </div>
      <div className="border-t border-gray-200 my-6"></div>
      <div className="flex  justify-between items-center text-lg font-bold text-gray-900">
        <span className="uppercase">Total</span>
        <div>
          <p className="font-B">{PriceFormat(total)} DH</p>
          {/* <p className="text-xs font-normal text-gray-500 text-right">
            Incluant TVA
          </p> */}
        </div>
      </div>
      <Link href={'/cart/checkout'} className="flex justify-center items-center mt-8 w-full bg-second text-white py-3 rounded-lg font-semibold bg-second-hover  ">
        Valider la commande
      </Link>
    </div>
  );
}
