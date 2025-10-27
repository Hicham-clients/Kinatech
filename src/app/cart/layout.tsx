"use client";

import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Vide from "./_components/Vide";
import CartSummary from "./_components/CartSummary";
import Loading from "./_components/loading";
import Link from "next/link";
import Icon from "@/components/IconComponent";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const LayoutCart = ({ children }: { children: React.ReactNode }) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate waiting localStorage load (CartLoader)
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {cart.length > 0 &&<div className="flex items-center   font-A   kinatech-container p-paddingPhone  lg:px-paddingPC">
        {[
          { name: "Panier", url: "/cart" },
          { name: "Validation de commande", url: "/cart/checkout" },
          { name: "Confirmation", url: "/cart/confirmation" },
        ].map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                pathname == item.url && " text-second",
                "flex items-center cursor-context-menu"
              )}
            >
              <div>{item.name}</div>
              {index < 2 && (
                <span className="text-xl">
                  <Icon name="CaretRight" />
                </span>
              )}
            </div>
          );
        })}
      </div>}

      {cart.length > 0 ? (
        <div className="p-paddingPhone py-paddingPC lg:px-paddingPC">
          <div className="flex flex-col gap-10 md:flex-row kinatech-container ">
            {children}
            <CartSummary />
          </div>
        </div>
      ) : (
        <Vide />
      )}
    </>
  );
};
export default LayoutCart;
