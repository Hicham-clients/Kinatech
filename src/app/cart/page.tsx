'use client'
import { useSelector } from "react-redux";
import CardProductCart from "./_components/CardProductCart";
import CartSummary from "./_components/CartSummary";
import { RootState } from "@/store/store";
import Vide from "./_components/Vide";
import { useEffect, useState } from "react";
import Loading from "./loading";

const Cart = () => {
  const {cart}=useSelector((state:RootState)=>state.cart)
  //localstorage 

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate waiting localStorage load (CartLoader)
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []); 

  if(loading){

  return (
   <Loading/>
  );

  }
  return (
    
    cart.length>0?<div className="p-paddingPhone py-paddingPC lg:px-paddingPC">
    <div className="flex flex-col gap-10 md:flex-row kinatech-container ">
      {/* <Vide/> */}
      <div className="flex flex-col gap-y-5 w-full">
       <h1 className=" font-D text-3xl tracking-wider">Panier</h1>
{cart.toReversed().map(item=><CardProductCart {...item} key={item.id}/>)}

      </div>
      <CartSummary />
    </div>
    </div>:<Vide/>
  );
};
export default Cart