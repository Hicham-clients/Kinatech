"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import CartProduct from "./CardProductCart";

const CartComponent = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  //sessionStorage

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <h1 className=" font-D text-3xl tracking-wider">Panier</h1>
      {cart.toReversed().map((item) => (
        <CartProduct {...item} key={item.id} />
      ))}
    </div>
  );
};
export default CartComponent;
