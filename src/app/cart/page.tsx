'use client'
import { useSelector } from "react-redux";
import CardProductCart from "./_components/CardProductCart";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

const Cart = () => {
  const {cart}=useSelector((state:RootState)=>state.cart)
  //localstorage 

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  

  
  return (
    
   
      <div className="flex flex-col gap-y-5 w-full">
       <h1 className=" font-D text-3xl tracking-wider">Panier</h1>
{cart.toReversed().map(item=><CardProductCart {...item} key={item.id}/>)}

      </div>
   
  );
};
export default Cart