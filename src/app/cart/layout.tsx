"use client";

import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Vide from "./_components/Vide";
import CartSummary from "./_components/CartSummary";
import Loading from "./_components/loading";
import Icon from "@/components/IconComponent";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const LayoutCart = ({ children }: { children: React.ReactNode }) => {
  const { cart, showSummary, orderConfirmed } = useSelector(
    (state: RootState) => state.cart
  );
  // Après une commande le panier est vide, mais la confirmation doit rester
  // affichée jusqu'à ce que l'utilisateur quitte la page lui-même.
  const showContent = cart.length > 0 || orderConfirmed;
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate waiting sessionStorage load (CartLoader)
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {showContent && (
        <div className="flex items-center   font-A   kinatech-container p-paddingPhone  lg:px-paddingPC">
          {[
            { name: "Panier", url: "/cart" },
            { name: "Validation de commande", url: "/cart/checkout" },
            { name: "Confirmation", url: "/cart/confirmation" },
          ].map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  ((pathname == item.url && showSummary) ||
                    (!showSummary && index == 2)) &&
                    " text-second",
                  "flex items-center cursor-context-menu"
                )}
              >
                <div>{item.name}</div>
                {index < 2 && (
                  <span className="">
                    <Icon name="CaretRight" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showContent ? (
        <div className="p-paddingPhone py-paddingPC lg:px-paddingPC">
          <div className="flex flex-col gap-10 md:flex-row kinatech-container ">
            {children}
            {showSummary && <CartSummary />}{" "}
          </div>
        </div>
      ) : (
        <Vide />
      )}
    </>
  );
};
export default LayoutCart;
